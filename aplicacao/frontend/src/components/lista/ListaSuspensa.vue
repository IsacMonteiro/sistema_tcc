<template>
  <v-container class="d-flex flex-column align-center gap-4">
    <!-- Botões com Lista Suspensa -->
    <v-row class="button-container" justify="center" align="center">
      <v-col
        v-for="(item, index) in buttons"
        :key="index"
        cols="12"
        md="4"
        class="mb-4"
      >
        <!-- Botão Principal -->
        <v-btn
          class="filter-button"
          elevation="2"
          dark
          
          @click="toggleDropdown(index)"
        >
          <!-- Ícone à Esquerda -->
          <v-icon class="me-2">
            {{ dropdowns[index] ? 'mdi-minus' : 'mdi-plus' }}
          </v-icon>
          <span>{{ item }}</span>
        </v-btn>

        <!-- Lista Suspensa -->
        <v-expand-transition>
          <div v-if="dropdowns[index]" class="dropdown-list">
            <ul v-if="index === 0">
              <li v-for="(autor, idx) in getVisibleItems(index)" :key="idx">
                {{ formatName(autor) }}
              </li>
            </ul>

            <ul v-if="index === 1">
              <li v-for="(obra, idx) in getVisibleItems(index)" :key="idx">
                {{ obra }}
              </li>
            </ul>

            <ul v-if="index === 2">
              <li v-for="(curso, idx) in getVisibleItems(index)" :key="idx">
                {{ curso }}
              </li>
            </ul>

            <ul v-if="index === 3">
              <li v-for="(ano, idx) in getVisibleItems(index)" :key="idx">
                {{ ano }}
              </li>
            </ul>

            <ul v-if="index === 4">
              <li v-for="(orientador, idx) in getVisibleItems(index)" :key="idx">
                {{ formatName(orientador) }}
              </li>
            </ul>

            <ul v-if="index === 5">
              <li v-for="(tipo, idx) in getVisibleItems(index)" :key="idx">
                {{ tipo }}
              </li>
            </ul>

            <!-- Botões para navegar entre as páginas -->
            <div v-if="dropdowns[index]" class="pagination-buttons">
              <v-btn
                v-if="hasPreviousPage(index)"
                @click="goToPreviousPage(index)"
                class="pagination-button"
              >
                Voltar
              </v-btn>

              <v-btn
                v-if="hasNextPage(index)"
                @click="goToNextPage(index)"
                class="pagination-button"
              >
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
import { onMounted, ref } from "vue";

export default {
  setup() {
    const autorStore = useAutorStore();
    const orientadorStore = useOrientadorStore();
    const obraStore = useObraStore();
    const cursoStore = useCursoStore();
    const autores = ref([]);
    const orientadores = ref([]);
    const tiposDeObra = ref([]);
    const cursos = ref([]);
    const obras = ref([]);
    
    const dropdownOptions = ref([
      [], // Autor
      [], // Título
      [], // Curso
      [], // Ano
      [], // Orientador
      [], // Tipo de Obra
    ]);

    const buttons = [
      "Autor",
      "Título",
      "Áreas de Conhecimento - Cursos",
      "Data de Defesa",
      "Orientador",
      "Tipo de Obra",
    ];

    const dropdowns = ref([false, false, false, false, false, false]);
    const pages = ref([0, 0, 0, 0, 0, 0]); // Página atual para cada dropdown

    const itemsPerPage = 7; // Número de itens por página

    const toggleDropdown = (index) => {
      dropdowns.value[index] = !dropdowns.value[index];
    };

    // Função para formatar o nome conforme o desejado
    const formatName = (fullName) => {
      const nameParts = fullName.split(" ");
      const lastName = nameParts.pop();
      const firstName = nameParts.join(" ");
      return `${lastName}, ${firstName}`;
    };

    // Função para ordenar os itens
    const limitAndSort = (array) => {
      return array.sort((a, b) => a.localeCompare(b));
    };

    // Atualiza os dropdowns após carregar os dados
    const updateDropdowns = () => {
      dropdownOptions.value[0] = limitAndSort(autores.value.map((a) => a.nome_autor));
      dropdownOptions.value[1] = limitAndSort(obras.value.map((o) => o.titulo));
      dropdownOptions.value[2] = limitAndSort(cursos.value.map((c) => c.nome_curso));
      dropdownOptions.value[3] = limitAndSort(
        obras.value.map((o) => new Date(o.data_apresentacao).getFullYear())
      );
      dropdownOptions.value[4] = limitAndSort(orientadores.value.map((o) => o.nome_orientador));
      dropdownOptions.value[5] = limitAndSort(tiposDeObra.value);
    };

    // Função para obter os itens visíveis da página atual
    const getVisibleItems = (index) => {
      const start = pages.value[index] * itemsPerPage;
      return dropdownOptions.value[index].slice(start, start + itemsPerPage);
    };

    // Verifica se há uma página anterior
    const hasPreviousPage = (index) => {
      return pages.value[index] > 0;
    };

    // Verifica se há uma página seguinte
    const hasNextPage = (index) => {
      const totalItems = dropdownOptions.value[index].length;
      return pages.value[index] * itemsPerPage + itemsPerPage < totalItems;
    };

    // Vai para a página anterior
    const goToPreviousPage = (index) => {
      if (pages.value[index] > 0) {
        pages.value[index]--;
      }
    };

    // Vai para a próxima página
    const goToNextPage = (index) => {
      const totalItems = dropdownOptions.value[index].length;
      if (pages.value[index] * itemsPerPage + itemsPerPage < totalItems) {
        pages.value[index]++;
      }
    };

    onMounted(async () => {
      try {
        await autorStore.listarAutores();
        autores.value = autorStore.autores;
        
        await orientadorStore.listarOrientadores();
        orientadores.value = orientadorStore.orientadores;
        
        await obraStore.listarObras();
        obras.value = obraStore.obras;
        tiposDeObra.value = obras.value.map((obra) => obra.tipo);
        
        await cursoStore.listarCursos();
        cursos.value = cursoStore.cursos;

        // Atualiza os dropdowns com os dados carregados
        updateDropdowns();

      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    });

    return {
      autores,
      orientadores,
      tiposDeObra,
      cursos,
      obras,
      dropdownOptions,
      buttons,
      dropdowns,
      toggleDropdown,
      formatName,
      getVisibleItems,
      hasPreviousPage,
      hasNextPage,
      goToPreviousPage,
      goToNextPage,
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

.dropdown-list li {
  font-size: 14px;
  margin-bottom: 4px;
  color: #004d40;
}

.dropdown-list li:last-child {
  margin-bottom: 0;
}

.pagination-buttons {
  margin-top: 12px;
}

.pagination-button {
  margin-top: 10px;
  background-color: #004d40;
  color: #fff;
  margin-left: 115px;
}
</style>