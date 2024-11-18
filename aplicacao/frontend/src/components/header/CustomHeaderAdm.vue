<template>
    <v-app-bar flat>
      <!-- Logo e Título -->
      <v-container class="d-flex justify-space-between align-center">
        <div class="d-flex align-center">
          <!-- Logotipo -->
          <router-link to="/" class="d-flex align-center">
            <v-img class="logo-img mr-3" src="/img/logo.png" alt="logo"></v-img>
          </router-link>
          <!-- Título Principal -->
          <router-link to="/" class="title-link">
            <v-title depressed class="title">REPOSITÓRIO ACADÊMICO IF SUDESTE DE MINAS GERAIS - MURIAÉ</v-title>
          </router-link>
        </div>
  
        <!-- Título da Área Administrativa (Centralizado) -->
        <div class="title-adm-container">
          <v-title class="title-adm">ÁREA ADMINISTRATIVA</v-title>
        </div>
  
        <!-- Saudação, Logout e Logs -->
        <div class="d-flex align-center">
          <!-- Saudação -->
          <span class="welcome-text">
            <v-icon left>mdi-account-circle</v-icon>
            Bem-vindo(a), Nome do usuário logado
          </span>
          <!-- Botão de Logs -->
          <v-btn
            outlined
            class="logs-btn"
            @click="handleGenerateLogs"
          >
            <v-icon left>mdi-file-document-outline</v-icon>
            Gerar Logs
          </v-btn>
          <!-- Botão de Logout -->
          <v-btn text class="logout-btn" @click="handleLogout">
            <v-icon left color="red">mdi-logout</v-icon>
            Sair
          </v-btn>
        </div>
      </v-container>
    </v-app-bar>
  </template>
  
  <script>
  export default {
    methods: {
      handleLogout() {
        console.log("Usuário deslogado");
      },
      handleGenerateLogs() {
        console.log("Gerar Logs clicado");
      },
    },
  };
  </script>
  
  <style scoped>
  /* Estilo do App Bar */
  .v-app-bar {
    background-color: #005f00;
    padding: 10px 0;
    border-bottom: 10px solid #00420c;
  }
  
  /* Estilo do logotipo */
  .logo-img {
    width: 50px;
    height: 50px;
  }
  
  /* Estilo do título principal */
  .title {
    background-color: #00420c;
    padding: 15px;
    border-radius: 10px;
    font-weight: bold;
    color: #fff;
  }
  
  /* Centraliza o título "ÁREA ADMINISTRATIVA" */
  .title-adm-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1; /* Faz o contêiner crescer e se ajustar ao espaço */
  }
  
  .title-adm {
    font-size: 28px;
    color: #fff;
    text-transform: uppercase;
    font-weight: bold;
    padding: 5px 10px;
    border-radius: 10px;
  }
  
  /* Link do título */
  .title-link {
    text-decoration: none;
    display: flex;
    align-items: center;
  }
  
  /* Saudação */
  .welcome-text {
    color: #fff;
    font-size: 1rem;
    margin-right: 15px;
  }
  
  /* Botão de logs */
  .logs-btn {
    color: #fff;
    background-color: #00420c;
    margin-right: 15px;
  }
  .logs-btn:hover {
    background-color:#001a05;
  }
  
  /* Botão de logout */
  .logout-btn {
    color: #f44336;
    font-size: 1rem;
  }
  </style>  