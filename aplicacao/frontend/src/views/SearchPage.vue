<template>
    <v-app>
      <!-- Usando o Componente de Cabeçalho -->
      <CustomHeader />
      
      <!-- Área Principal de Conteúdo -->
      <v-main>
        <!-- Usando o Componente de Lista de Resultados -->
        <ListaResultados />
        <!-- Usando o Componente de Pesquisa Avançada -->
        <PesquisaAvancada />
      </v-main>
  
      <!-- Usando o Componente de Rodapé -->
      <CustomFooter />
    </v-app>
  </template>
  
  <script>
  import CustomHeader from '../components/header/CustomHeader.vue';
  import ListaResultados from '../components/lista/ListaResultados.vue';
  import PesquisaAvancada from '../components/pesquisa/PesquisaAvancada.vue';
  import CustomFooter from '../components/footer/CustomFooter.vue';
  
  
  
  // Registrar os componentes
  export default {
    components: {
      CustomHeader,
      ListaResultados,
      PesquisaAvancada,
      CustomFooter
    },
  };
  </script>
  
  <style></style>