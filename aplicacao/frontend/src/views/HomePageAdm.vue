<template>
    <v-app>
      <!-- Usando o Componente de Cabeçalho -->
      <CustomHeaderAdm />
      
      <!-- Área Principal de Conteúdo -->
      <v-main>
        <!-- Usando o Componente de Cadastro, Edição e Exclusão -->
        <ExcuirEditar />
      </v-main>
  
      <!-- Usando o Componente de Rodapé -->
      <CustomFooter />
    </v-app>
  </template>
  
  <script>
  import CustomHeaderAdm from '../components/header/CustomHeaderAdm.vue';
  import ExcuirEditar from '../components/cadastro/ExcuirEditar.vue';
  import CustomFooter from '../components/footer/CustomFooter.vue';

  
  
  // Registrar os componentes
  export default {
    components: {
      CustomHeaderAdm,
      ExcuirEditar,
      CustomFooter
    },
  };
  </script>
  
  <style></style>