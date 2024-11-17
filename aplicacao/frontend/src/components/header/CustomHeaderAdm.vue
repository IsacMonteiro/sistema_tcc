<template>
    <v-app-bar flat>
      <!-- Logo e Título -->
      <v-container class="d-flex justify-space-between align-center">
        <div class="d-flex align-center">
          <router-link to="/" class="d-flex align-center">
            <v-img class="logo-img mr-3" src="/img/logo.png" alt="logo"></v-img>
          </router-link>
          <router-link to="/" class="title-link">
            <v-title depressed class="title">REPOSITÓRIO ACADÊMICO IF SUDESTE DE MINAS GERAIS - MURIAÉ</v-title>
          </router-link>
        </div>
  
        <div class="d-flex align-center">
          <!-- Barra de pesquisa -->
          <v-text-field
            solo
            flat
            hide-details
            label="PESQUISA RÁPIDA"
            class="search-input"
          ></v-text-field>
          <!-- Botão de busca com ícone de lupa -->
          <v-btn
            icon
            class="search-btn"
            @click="handleSearch"
          >
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
          <!-- Divisor -->
          <v-divider vertical class="mx-4 divider-custom"></v-divider>
        </div>
      </v-container>
    </v-app-bar>
  </template>
  
  <script>
  </script>
  
  <style scoped>
  .v-app-bar {
    background: #005f00;
    padding: 10px 0;
    border-bottom: 10px solid #00420c;
  }
  
  .title {
    background-color: #00420c;
    padding: 15px;
    border-radius: 10px;
    font-weight: bold;
    color: #fff;
  }
  
  .title-link {
    text-decoration: none; /* Remove o sublinhado */
  }
  
  .logo-img {
    width: 50px;
    height: 50px;
  }
  
  .search-input {
    max-width: 300px;
    width: 300px;
    border-radius: 10px;
    padding: 5px 10px;
    color: #fff;
  }
  
  .search-btn {
    background-color: #00420c;
    color: #fff;
    border-radius: 10%;
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  }
  
  .search-btn:hover {
    background-color: #001a05;
  }
  
  .v-divider {
    border-right: 3px solid #fff !important; /* Controla a espessura do divisor com border */
  }
  
  .divider-custom {
    background-color: #fff;
    margin-top: 10px;
    margin-bottom: 10px;
  }

  </style>