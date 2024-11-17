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
            block
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
              <!-- Conteúdo da Lista -->
              <ul>
                <li v-for="(option, idx) in dropdownOptions[index]" :key="idx">
                  {{ option }}
                </li>
              </ul>
            </div>
          </v-expand-transition>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        buttons: [
          "Autor",
          "Assunto",
          "Áreas de Conhecimento - Cursos",
          "Data de Defesa",
          "Orientador",
          "Tipo de Documento",
        ],
        dropdowns: [false, false, false, false, false, false], // Estado de cada lista suspensa
        dropdownOptions: [
          ["Autor 1", "Autor 2", "Autor 3"],
          ["Assunto 1", "Assunto 2", "Assunto 3"],
          ["Curso 1", "Curso 2", "Curso 3"],
          ["2020", "2021", "2022"],
          ["Orientador 1", "Orientador 2", "Orientador 3"],
          ["TCC"],
        ],
      };
    },
    methods: {
      toggleDropdown(index) {
        // Alterna o estado diretamente no array reativo
        this.dropdowns[index] = !this.dropdowns[index];
      },
    },
  };
  </script>
  
  <style scoped>
  .button-container {
    margin-top: 20px;
  }
  
  /* Estilo dos botões */
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
  }
  
  /* Hover: botão muda de cor ao passar o mouse */
  .filter-button:hover {
    background-color: #001a05;
  }
  
  /* Lista Suspensa */
  .dropdown-list {
    background: #e0f2f1; /* Fundo da lista */
    border-radius: 8px;
    padding: 8px 16px;
    margin-top: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
  
  /* Estilo dos itens na lista */
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
  </style>  