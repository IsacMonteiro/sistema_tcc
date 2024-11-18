<template>
    <v-app>
      <!-- Usando o Componente de Cabeçalho -->
      <CustomHeaderAdm />
      
      <!-- Área Principal de Conteúdo -->
      <v-main>
        <!-- Usando o Componente de Edição e Exclusão -->
        <CadastroForm />
      </v-main>
  
      <!-- Usando o Componente de Rodapé -->
      <CustomFooter />
    </v-app>
  </template>
  
  <script>
  import CustomHeaderAdm from '../components/header/CustomHeaderAdm.vue';
  import CadastroForm from '../components/cadastro/CadastroForm.vue';
  import CustomFooter from '../components/footer/CustomFooter.vue';

  
  
  // Registrar os componentes
  export default {
    components: {
        CustomHeaderAdm,
        CadastroForm,
        CustomFooter
    },
  };
  </script>
  
  <style></style>