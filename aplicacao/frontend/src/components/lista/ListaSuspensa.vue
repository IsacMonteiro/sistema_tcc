<template>
  <v-container class="d-flex flex-column align-center gap-4">
    <v-row class="button-container" justify="center" align="center">
      <v-col v-for="(item, index) in buttons" :key="index" cols="12" md="4" class="mb-4">
        <v-btn class="filter-button" elevation="2" dark @click="toggleDropdown(index)">
          <v-icon class="me-2">
            {{ dropdowns[index] ? 'mdi-minus' : 'mdi-plus' }}
          </v-icon>
          <span>{{ item.toUpperCase() }}</span> <!-- Título em maiúsculo -->
        </v-btn>

        <v-expand-transition>
          <div v-if="dropdowns[index]" class="dropdown-list">
            <ul>
              <li
                v-for="(option, idx) in getVisibleItems(index)"
                :key="idx"
                @click="goToResults(index, option.text)"
                class="dropdown-item"
              >
                {{ formatName(option.text, index) }} <!-- Formatação dos nomes -->
                <span class="item-count">{{ option.count }}</span>
              </li>
            </ul>

            <div class="pagination-buttons">
              <v-btn v-if="hasPreviousPage(index)" @click="goToPreviousPage(index)" class="pagination-button prev-button">
                Voltar
              </v-btn>

              <v-btn v-if="hasNextPage(index)" @click="goToNextPage(index)" class="pagination-button next-button">
                Próximo
              </v-btn>
            </div>
          </div>
        </v-expand-transition>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { useAutorStore } from "../../store/autorStore";
import { useOrientadorStore } from "../../store/orientadorStore";
import { useObraStore } from "../../store/obraStore";
import { useCursoStore } from "../../store/cursoStore";
import { onMounted, ref, nextTick } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();
    const autorStore = useAutorStore();
    const orientadorStore = useOrientadorStore();
    const obraStore = useObraStore();
    const cursoStore = useCursoStore();

    const autores = ref([]);
    const orientadores = ref([]);
    const cursos = ref([]);
    const obras = ref([]);

    const dropdownOptions = ref([[], [], [], [], [], []]); // Filtros para os dropdowns

    const buttons = [
      "Autor", "Título", "Áreas de Conhecimento - Cursos", "Data de Defesa", "Orientador", "Tipo de Obra"
    ];

    const dropdowns = ref([false, false, false, false, false, false]);
    const pages = ref([0, 0, 0, 0, 0, 0]); // Página atual para cada dropdown
    const itemsPerPage = 7;

    const toggleDropdown = (index) => {
      dropdowns.value[index] = !dropdowns.value[index];
    };

    const groupAndCountByCustomRelation = (mapFn, items) => {
      const grouped = items.reduce((acc, item) => {
        const key = mapFn(item);
        if (!key) return acc;
        acc[key] = (acc[key] || 0) + 1;
        return acc;
      }, {});

      return Object.entries(grouped).map(([text, count]) => ({ text, count }));
    };

    const updateDropdowns = () => {
      dropdownOptions.value[0] = groupAndCountByCustomRelation(
        (obra) => autores.value.find((a) => a.id_autor === obra.fk_id_autor)?.nome_autor || "Autor Desconhecido",
        obras.value
      );
      dropdownOptions.value[1] = groupAndCountByCustomRelation(
        (obra) => obra.titulo || "Título Desconhecido",
        obras.value
      );
      dropdownOptions.value[2] = groupAndCountByCustomRelation(
        (obra) => cursos.value.find((c) => c.id_curso === obra.fk_id_curso)?.nome_curso || "Curso Desconhecido",
        obras.value
      );
      dropdownOptions.value[3] = groupAndCountByCustomRelation(
        (obra) => new Date(obra.data_apresentacao).getFullYear(),
        obras.value
      );
      dropdownOptions.value[4] = groupAndCountByCustomRelation(
        (obra) => orientadores.value.find((o) => o.id_orientador === obra.fk_id_orientador)?.nome_orientador || "Orientador Desconhecido",
        obras.value
      );
      dropdownOptions.value[5] = groupAndCountByCustomRelation(
        (obra) => obra.tipo || "Tipo Desconhecido",
        obras.value
      );
    };

    const goToResults = (index, selectedItem) => {
      const filterKey = buttons[index];

      if (!selectedItem || !filterKey) {
        return;
      }

      // Navegar para a página de resultados com os parâmetros de filtro
      router.push({
        name: "SearchPage",  // Nome da rota da página de resultados
        query: { filterKey, selectedItem }
      }).catch((err) => {
        console.error("Erro ao navegar para a rota:", err);
      });
    };

    const getVisibleItems = (index) => {
      const start = pages.value[index] * itemsPerPage;
      return dropdownOptions.value[index].slice(start, start + itemsPerPage);
    };

    const hasPreviousPage = (index) => pages.value[index] > 0;
    const hasNextPage = (index) => pages.value[index] * itemsPerPage + itemsPerPage < dropdownOptions.value[index].length;

    const goToPreviousPage = (index) => {
      if (pages.value[index] > 0) pages.value[index]--;
    };

    const goToNextPage = (index) => {
      if (pages.value[index] * itemsPerPage + itemsPerPage < dropdownOptions.value[index].length) pages.value[index]++;
    };

    const formatName = (name, index) => {
      if (index === 0 || index === 4) {
        const parts = name.split(" ");
        const firstName = parts.slice(0, -1).join(" ");
        const lastName = parts[parts.length - 1];
        return `${lastName}, ${firstName}`.toUpperCase(); // Formata para 'Sobrenome, Nome' e em maiúsculo
      }
      return name.toUpperCase(); // Para outros campos, apenas coloca em maiúsculo
    };

    onMounted(async () => {
      try {
        await autorStore.listarAutores();
        autores.value = autorStore.autores;

        await orientadorStore.listarOrientadores();
        orientadores.value = orientadorStore.orientadores;

        await obraStore.listarObras();
        obras.value = obraStore.obras;

        await cursoStore.listarCursos();
        cursos.value = cursoStore.cursos;

        // Use nextTick para garantir que as atualizações ocorram após a renderização
        nextTick(() => {
          updateDropdowns();
        });
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    });

    return {
      autores,
      orientadores,
      cursos,
      obras,
      dropdownOptions,
      buttons,
      dropdowns,
      toggleDropdown,
      goToResults,
      getVisibleItems,
      hasPreviousPage,
      hasNextPage,
      goToPreviousPage,
      goToNextPage,
      formatName, // Expondo a função de formatação
    };
  },
};
</script>

<style scoped>
.button-container {
  margin-top: 20px;
}

.filter-button {
  width: 100%;
  background-color: #00420c;
  color: #fff;
  height: 50px;
  text-transform: none;
  font-size: 16px;
  font-weight: bold;
  border-radius: 10px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0 16px;
  width: 1000px;
}

.filter-button:hover {
  background-color: #001a05;
}

.dropdown-list {
  background: #e0f2f1;
  border-radius: 8px;
  padding: 8px 16px;
  margin-top: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.dropdown-list ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.dropdown-item {
  font-size: 14px;
  margin-bottom: 4px;
  color: #004d40;
  display: flex;
  justify-content: space-between;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease, transform 0.2s;
}

.dropdown-item:hover {
  background-color: #00420c;
  color: #fff;
}

.dropdown-item:active {
  background-color: #002a06;
  transform: scale(0.95);
}

.pagination-buttons {
  margin-top: 12px;
  display: flex;
  justify-content: space-between;
}

.pagination-button {
  margin-top: 10px;
}

.prev-button {
  background-color: #00420c;
  color: white;
}

.prev-button:hover {
  background-color: #001a05;
}

.next-button {
  background-color: #00420c;
  color: white;
}

.next-button:hover {
  background-color: #001a05;
}

.item-count {
  font-weight: bold;
  color: #00796b;
}
</style>