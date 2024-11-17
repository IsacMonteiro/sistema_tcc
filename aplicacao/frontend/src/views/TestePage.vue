<template>
    <v-container class="d-flex justify-center align-center" style="height: 100vh;">
      <v-card class="pa-5" outlined>
        <v-card-title class="text-center">
          Deu certo!
        </v-card-title>
      </v-card>
    </v-container>
  </template>
  
  <script>
  export default {
    name: "SuccessMessage",
  };
  </script>
  
  <style scoped>
  .v-card {
    max-width: 400px;
    width: 100%;
  }
  
  .v-card-title {
    font-size: 24px;
    font-weight: bold;
    color: green;
  }
  </style>  