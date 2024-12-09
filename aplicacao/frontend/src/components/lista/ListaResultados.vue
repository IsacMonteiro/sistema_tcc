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
            <!-- Título com link para página de detalhes -->
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

    <!-- Botões de navegação -->
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

    <!-- Botão para voltar à tela principal -->
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
import { ref, computed, onMounted } from "vue";
import { useAutorStore } from "../../store/autorStore";
import { useObraStore } from "../../store/obraStore";
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();

    const autorStore = useAutorStore();
    const obraStore = useObraStore();

    const results = ref([]);
    const currentPage = ref(1);
    const itemsPerPage = 10;

    const filteredResults = computed(() => {
      return results.value.map((obra) => {
        const autor = autorStore.autores.find(
          (autor) =>
            autor.id_autor === obra.fk_id_autor
        );
        return {
          ...obra,
          author: autor ? autor.nome_autor : "Autor desconhecido",
        };
      });
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

    const loadData = async () => {
      await Promise.all([obraStore.listarObras(), autorStore.listarAutores()]);
      results.value = obraStore.obras;
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