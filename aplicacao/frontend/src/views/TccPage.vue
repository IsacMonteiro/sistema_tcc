<template>
    <v-app>
      <!-- Usando o Componente de Cabeçalho -->
      <CustomHeader />
      
      <!-- Área Principal de Conteúdo -->
      <v-main>
        <!-- Usando o Componente de Exibição de TCC Selecionado -->
        <TccSelecionado />
      </v-main>
  
      <!-- Usando o Componente de Rodapé -->
      <CustomFooter />
    </v-app>
  </template>

  <script>
  import CustomHeader from '../components/header/CustomHeader.vue';
  import TccSelecionado from '../components/lista/TccSelecionado.vue';
  import CustomFooter from '../components/footer/CustomFooter.vue';


  // Registrar os componentes
  export default {
    components: {
      CustomHeader,
      TccSelecionado,
      CustomFooter
    },
  };
  </script>
  
  <style></style>