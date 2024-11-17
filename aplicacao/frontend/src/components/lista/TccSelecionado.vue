<template>
    <v-container>
      <!-- Título do Trabalho -->
      <v-row class="section-title" justify="center">
        <v-col cols="12" md="7">
          <h3 class="tcc-title text-center">{{ tcc.title }}</h3>
        </v-col>
      </v-row>
  
      <!-- Cartão Maior -->
      <v-row justify="center" class="mt-3">
        <v-col cols="12" md="7">
          <v-card class="tcc-card-main">
            <v-card-text>

              <!-- Resumo -->
              <v-row>
                <v-col cols="12" md="7">
                        <p class="tcc-summary">
                            <strong>RESUMO:</strong> {{ tcc.summary }}
                        </p>
                    </v-col>
              </v-row>

              <!-- Botão Download -->
              <v-row>
                    <v-col cols="12" class="text-center">
                       <v-btn class="download-btn">Baixar Obra Completa</v-btn>
                    </v-col>
              </v-row>
              
              <!-- Cards Individuais -->
              <v-row>
                <v-col cols="12" class="mt-3">
                  <v-card class="tcc-card">
                    <v-card-text>
                      <p class="tcc-section">
                        <strong>Tipo de Obra:</strong> <br /> {{ tcc.type }}
                      </p>
                      <p class="tcc-section">
                        <strong>Classificação Temática:</strong> <br /> {{ tcc.classification }}
                      </p>
                      <p class="tcc-section">
                        <strong>Ano:</strong> <br /> {{ tcc.year }}
                      </p>
                      <p class="tcc-section">
                        <strong>Data de Defesa:</strong> <br /> {{ tcc.date }}
                      </p>
                    </v-card-text>
                  </v-card>
                </v-col>
  
                <v-col cols="12" class="mt-3">
                  <v-card class="tcc-card">
                    <v-card-text>
                      <p class="tcc-section">
                        <strong>Autor(es):</strong> <br /> {{ tcc.author }}
                      </p>
                      <p class="tcc-section">
                        <strong>Orientador:</strong> <br /> {{ tcc.advisor }}
                      </p>
                    </v-card-text>
                  </v-card>
                </v-col>
  
                <v-col cols="12" class="mt-3">
                  <v-card class="tcc-card">
                    <v-card-text>
                      <p class="tcc-section">
                        <strong>Palavras-Chave:</strong> <br /> {{ tcc.keywords.join(", ") }}
                      </p>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
  
              <!-- Botão Voltar -->
              <v-row justify="center" class="mt-4">
                <v-col cols="12" class="text-center mt-2">
                  <v-btn class="back-btn" @click="goBack">Voltar</v-btn>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        tcc: {
          title: "Título do TCC",
          summary:
            "Este é um resumo de TCC (Exemplo).",
          type: "TCC",
          classification: "Ciência da Computação",
          year: 2024,
          date: "07-11-2024",
          author: "Autor",
          advisor: "M.Sc. Orientador",
          keywords: ["IA", "Algoritmos", "Pesquisa", "Tecnologia","Exemplo"],
        },
      };
    },
    methods: {
      goBack() {
        this.$router.push("/SearchPage"); // Redireciona para a página anterior
      },
    },
  };
  </script>
  
  <style scoped>
  /* Título */
  .section-title h3 {
    margin-top: 50px;
    background: linear-gradient(90deg, #00420c, #28a745);
    color: white;
    padding: 15px;
    border-radius: 5px;
    text-transform: uppercase;
    font-weight: bold;
  }
  
  /* Resumo */
  .tcc-summary {
    font-size: 16px;
    margin-bottom: 20px;
    line-height: 1.6;
    text-align: justify;
  }
  
  /* Cartão Maior */
  .tcc-card-main {
    background-color: #f4f4f4;
    border-radius: 10px;
    padding: 20px;
  }
  
  /* Cartões Individuais */
  .tcc-card {
    background-color: #ffffff;
    border-radius: 8px;
    padding: 15px;
  }
  
  /* Texto nos cartões */
  .tcc-section {
    margin-bottom: 10px;
    font-size: 16px;
  }
  
  .tcc-section strong {
    color: #004b81;
    font-weight: bold;
  }
  
  /* Botões */
  .download-btn {
    background-color: #00420c;
    border-radius: 7px;
    color: white;
    font-weight: bold;
  }
  
  .download-btn:hover {
    background-color: #001a05;
  }
  
  .back-btn {
    background-color: #00420c;
    border-radius: 7px;
    color: white;
    font-weight: bold;
  }
  
  .back-btn:hover {
    background-color: #001a05;
  }
  </style>  