<template>
    <v-container>
      <!-- Título da Seção -->
      <v-row class="section-title" justify="center">
        <v-col cols="12" md="7">
          <h4 class="text-center">RESULTADO DA BUSCA</h4>
        </v-col>
      </v-row>
  
      <!-- Resultados da Busca -->
      <v-row justify="center">
        <v-col cols="12" md="7">
          <v-card v-for="(result, index) in results" :key="index" class="mb-3 result-card">
            <v-card-text>
              <h5 class="result-title">{{ result.title }}</h5>
              <p class="result-author">
                <strong>AUTOR(ES):</strong> {{ result.author }}
              </p>
              <p class="result-date">{{ result.date }}</p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  export default {
    data() {
      // Calcula a data de 10 dias atrás
      const today = new Date();
      const tenDaysAgo = new Date(today.setDate(today.getDate() - 10)).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
  
      // Retorna os resultados com dados de teste
      return {
        results: Array(8).fill({
          title: "Teste",
          author: "Teste",
          date: `${tenDaysAgo} 00:00:00`,
        }),
      };
    },
  };
  </script>
  
  <style scoped>
  /* Título da Seção */
  .section-title h4 {
    margin-top: 50px;
    background: linear-gradient(90deg, #00420c, #28a745);
    color: white;
    padding: 15px;
    border-radius: 5px;
    text-transform: uppercase;
    font-weight: bold;
  }
  
  /* Cartão de Resultado */
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
  </style>  