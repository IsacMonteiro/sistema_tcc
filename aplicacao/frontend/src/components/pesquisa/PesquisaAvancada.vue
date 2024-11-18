<template>
  <v-container>
    <!-- Título da Seção -->
    <v-row class="section-title" justify="center" style="margin-top: 60px;">
      <v-col cols="12" md="7">
        <h4 class="text-center">PESQUISA AVANÇADA</h4>
      </v-col>
    </v-row>

    <!-- Formulário -->
    <v-form>
      <v-row justify="center" align="center" class="form-container">
        <!-- Campo TÍTULO -->
        <v-col cols="12" md="4" class="mb-4">
          <v-text-field
            label="TÍTULO:"
            placeholder="Exemplo: Repositório Institucional"
            outlined
            dense
          ></v-text-field>
        </v-col>

        <!-- Campo AUTOR -->
        <v-col cols="12" md="4" class="mb-4">
          <v-text-field
            label="AUTOR:"
            placeholder="Exemplo: João Silva"
            outlined
            dense
          ></v-text-field>
        </v-col>

        <!-- Campo ORIENTADOR -->
        <v-col cols="12" md="4" class="mb-4">
          <v-text-field
            label="ORIENTADOR:"
            placeholder="Exemplo: José Silva"
            outlined
            dense
          ></v-text-field>
        </v-col>

        <!-- Campo PALAVRA CHAVE -->
        <v-col cols="12" md="4" class="mb-4">
          <v-text-field
            label="PALAVRA CHAVE:"
            placeholder="Exemplo: TCC; Tecnologia"
            outlined
            dense
          ></v-text-field>
        </v-col>

        <!-- Campo TIPO DE OBRA -->
        <v-col cols="12" md="4" class="mb-4">
          <v-select
            label="TIPO DE OBRA :"
            :items="['TCC']"
            outlined
            dense
          ></v-select>
        </v-col>

        <!-- Campo CURSO -->
        <v-col cols="12" md="4" class="mb-4">
          <v-select
            label="CURSO:"
            :items="[
              'Todos',
              'ADMINISTRAÇÃO',
              'CIÊNCIAS AMBIENTAIS',
              'DESIGNER DE MODA',
              'GESTÃO EM TECNOLOGIA DA INFORMAÇÃO'
            ]"
            outlined
            dense
          ></v-select>
        </v-col>

        <!-- Botões de Ação -->
        <v-col cols="3" class="text-center">
          <v-btn class="search-button" block>Fazer uma busca</v-btn>
          <!-- Botão "Voltar" condicional -->
          <v-btn
            v-if="showBackButton"
            class="back-button"
            block
            @click="goBack"
          >
            Voltar
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
export default {
  computed: {
    // Computa se o botão "Voltar" deve aparecer
    showBackButton() {
      return this.$route.path !== '/' && this.$route.path !== '/Adm'; // Esconde o botão nas rotas '/' e '/Adm'
    },
  },
  methods: {
    // Método para voltar à página anterior
    goBack() {
      this.$router.back();
    },
  },
};
</script>

<style scoped>
/* Título da Seção */
.section-title h4 {
  background: linear-gradient(90deg, #00420c, #28a745);
  color: #fff;
  padding: 10px;
  border-radius: 2px;
  text-transform: uppercase;
}

/* Botões */
.search-button {
  background-color: #00420c;
  border-radius: 7px;
  color: #fff;
  font-weight: bold;
}

.search-button:hover {
  background-color: #001a05;
}

.back-button {
  background-color: #00420c;
  color: #fff;
  font-weight: bold;
  border-radius: 7px;
  margin-top: 10px;
}

.back-button:hover {
  background-color: #001a05;
}

/* Formulário */
.form-container {
  max-width: 1020px;
  margin: auto;
  padding: 20px;
  background-color: #f9f9f9;
  color: #002907;
}
</style>