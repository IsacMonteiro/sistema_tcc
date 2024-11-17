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
              :items="['Todos', 'Educação', 'Saúde', 'Tecnologia']"
              outlined
              dense
            ></v-select>
          </v-col>
        
        <!-- Botão de Busca -->
          <v-col cols="12" md="3" class="text-center">
            <v-btn class="search-button" block>Fazer uma busca</v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-container>
  </template>
  
  <script>
  export default {
    data() {
      return {};
    },
  };
  </script>
  
  <style scoped>
  /* Título da Seção */
  .section-title h4 {
    background-color: #00420c;
    color: #fff;
    padding: 10px;
    border-radius: 2px;
    text-transform: uppercase;
  }
  
  /* Botão de Busca */
  .search-button {
    background-color: #00420c;
    border-radius: 7px;
    color: #fff;
    font-weight: bold;
  }
  
  .search-button:hover {
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