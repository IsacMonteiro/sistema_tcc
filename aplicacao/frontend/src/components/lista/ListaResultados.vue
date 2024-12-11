<template>
  <v-container>
    <v-row class="section-title" justify="center">
      <v-col cols="12" md="7">
        <h4 class="text-center">RESULTADO DA BUSCA</h4>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="12" md="7">
        <v-card
          v-for="(result, index) in paginatedResults"
          :key="index"
          class="mb-3 result-card"
        >
          <v-card-text>
            <h5 class="result-title">
              <router-link
                :to="{ name: 'TccPage', params: { id_obra: result.id_obra } }"
                class="result-title"
              >
                {{ result.titulo }}
              </router-link>
            </h5>
            <p class="result-author">
              <strong>AUTOR(ES):</strong> {{ result.author }}
            </p>
            <p class="result-date">
              <strong>Data de Defesa:</strong> {{ formatDate(result.data_apresentacao) }}
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="auto">
        <v-btn
          :disabled="currentPage === 1"
          @click="previousPage"
          class="mb-3 mr-2"
        >
          Voltar
        </v-btn>
        <v-btn
          :disabled="currentPage === totalPages"
          @click="nextPage"
          class="mb-3"
        >
          Próximo
        </v-btn>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="auto">
        <v-btn
          @click="goBack"
          id="back-button"
          class="mb-3"
        >
          Voltar para a tela principal
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { ref, computed, onMounted, toRaw } from "vue";
import { useAutorStore } from "../../store/autorStore";
import { useObraStore } from "../../store/obraStore";
import { useCursoStore } from "../../store/cursoStore";
import { useOrientadorStore } from "../../store/orientadorStore";
import { useRouter, useRoute } from "vue-router";

export default {
  setup() {
    const router = useRouter();
    const route = useRoute();

    const autorStore = useAutorStore();
    const obraStore = useObraStore();
    const orientadorStore = useOrientadorStore();
    const cursoStore = useCursoStore();

    const results = ref([]);
    const currentPage = ref(1);
    const itemsPerPage = 10;

    // Dados do filtro vindo da rota
    const filterKey = ref(route.query.filterKey || null);
    const selectedItem = ref(route.query.selectedItem || null);

    const filteredResults = computed(() => {
      const allResults = results.value.map((obra) => {
        const autor = toRaw(autorStore.autores).find(
          (autor) => autor.id_autor === obra.fk_id_autor
        );
        const orientador = toRaw(orientadorStore.orientadores).find(
          (orientador) => orientador.id_orientador === obra.fk_id_orientador
        );
        const curso = toRaw(cursoStore.cursos).find(
          (curso) => curso.id_curso === obra.fk_id_curso
        );

        return {
          ...obra,
          author: autor ? autor.nome_autor : "Autor desconhecido",
          orientador: orientador ? orientador.nome_orientador : "Orientador desconhecido",
          curso: curso ? curso.nome_curso : "Curso desconhecido",
          tipo: obra.tipo || "Tipo de obra desconhecido",
        };
      });

      // Se não houver filtro, retornar todos os resultados
      if (!filterKey.value || !selectedItem.value || selectedItem.value.trim() === '') {
        return allResults;
      }

      const filtered = allResults.filter((obra) => {
        switch (filterKey.value) {
          case "Autor":
            return obra.author && obra.author.toLowerCase().includes(selectedItem.value.toLowerCase());
          case "Orientador":
            return obra.orientador && obra.orientador.toLowerCase().includes(selectedItem.value.toLowerCase());
          case "Áreas de Conhecimento - Cursos":
            return obra.curso && obra.curso.toLowerCase().includes(selectedItem.value.toLowerCase().trim());
          case "Título":
            return obra.titulo && obra.titulo.toLowerCase().includes(selectedItem.value.toLowerCase().trim());
          case "Data de Defesa":
            return obra.data_apresentacao && obra.data_apresentacao.includes(selectedItem.value);
          case "Tipo de Obra":
            return obra.tipo && obra.tipo.toLowerCase().includes(selectedItem.value.toLowerCase().trim());
          default:
            return true;
        }
      });

      return filtered;
    });

    const paginatedResults = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      return filteredResults.value.slice(start, end);
    });

    const totalPages = computed(() => {
      return Math.ceil(filteredResults.value.length / itemsPerPage);
    });

    const nextPage = () => {
      if (currentPage.value < totalPages.value) {
        currentPage.value++;
      }
    };

    const previousPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--;
      }
    };

    // Função de carregamento dos dados
    const loadData = async () => {
      try {
        // Carregar obras, autores e orientadores
        await Promise.all([obraStore.listarObras(), autorStore.listarAutores(), orientadorStore.listarOrientadores(), cursoStore.listarCursos()]);
        results.value = obraStore.obras;
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    };

    const formatDate = (dateString) => {
      if (!dateString) return "";
      const date = new Date(dateString);
      if (isNaN(date)) return "";
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Intl.DateTimeFormat("pt-BR", options).format(date);
    };

    const goBack = () => {
      router.push("/");
    };

    // Carregamento dos dados quando o componente é montado
    onMounted(loadData);

    return {
      results,
      filteredResults,
      paginatedResults,
      currentPage,
      totalPages,
      nextPage,
      previousPage,
      formatDate,
      goBack,
      filterKey,
      selectedItem,
    };
  },
};
</script>

<style scoped>
.section-title h4 {
  margin-top: 50px;
  background: linear-gradient(90deg, #00420c, #28a745);
  color: white;
  padding: 15px;
  border-radius: 5px;
  text-transform: uppercase;
  font-weight: bold;
}

.result-card {
  background-color: #f9f9f9;
  border-radius: 10px;
}

.result-title {
  font-weight: bold;
  font-size: 18px;
  color: #006dba;
  margin: 0;
}

.result-author {
  font-size: 14px;
  margin: 5px 0;
  color: #004b81;
}

.result-date {
  font-size: 12px;
  color: #8c92b1;
  text-align: right;
}

/* Botões de navegação */
.v-btn {
  background-color: #00420c;
  color: #fff;
  border-radius: 7px;
  font-weight: bold;
  width: 150px;
  height: 45px;
  margin: 0 5px;
  transition: background-color 0.3s ease;
}

.v-btn:hover {
  background-color: #001a05;
}

.v-btn:disabled {
  background-color: #8c8c8c;
  color: #ccc;
  cursor: not-allowed;
}

#back-button {
  background-color: #00420c;
  color: #fff;
  border-radius: 7px;
  font-weight: bold;
  width: 300px;
  height: 45px;
  margin-top: 20px;
}

#back-button:hover {
  background-color: #001a05;
}
</style>