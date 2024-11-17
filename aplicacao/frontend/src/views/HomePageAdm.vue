<template>
    <v-app>
      <!-- Usando o Componente de Cabeçalho -->
      <CustomHeaderAdm />
      
      <!-- Área Principal de Conteúdo -->
      <v-main>
  
        <!-- Usando o Componente de Pesquisa Avançada -->
        <PesquisaAvancada />
      </v-main>
  
      <!-- Usando o Componente de Rodapé -->
      <CustomFooter />
    </v-app>
  </template>
  
  <script>
  import CustomHeaderAdm from '../components/header/CustomHeaderAdm.vue';
  import CustomFooter from '../components/footer/CustomFooter.vue';
  import PesquisaAvancada from '../components/pesquisa/PesquisaAvancada.vue';
  
  // Registrar os componentes
  export default {
    components: {
      CustomHeaderAdm,
      PesquisaAvancada,
      CustomFooter
    },
  };
  </script>
  
  <style scoped>
  /* Estilo da imagem */
  .logo-image {
    width: 100%;
    max-width: 150px;
    height: auto;
    margin: 50px auto 0 auto;
  }
  
  /* Estilo do texto */
  .styled-text {
    font-size: large;
    font-family: 'Roboto', sans-serif;
    font-weight: 500;
    color: #333;
    line-height: 1.6;
    max-width: 1000px;
    margin: 0 auto 0 auto;
    padding: 0 20px;
  }
  
  /* Responsividade - Ajusta a largura da imagem em telas pequenas */
  @media (max-width: 600px) {
    .logo-image {
      max-width: 80%; /* Imagem fica menor em telas pequenas */
    }
    .styled-text {
      font-size: 1rem; /* Ajuste no tamanho da fonte para telas pequenas */
    }
  }
  </style>