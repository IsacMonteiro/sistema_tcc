<template>
  <v-app>
    <!-- Usando o Componente de Cabeçalho -->
    <CustomHeader />
    
    <!-- Área Principal de Conteúdo -->
    <v-main>
      <!-- Imagem -->
      <v-img 
        src="/img/ifsudestemg.png" 
        alt="Logo_dois" 
        class="logo-image" 
        contain
      ></v-img>

      <v-container class="d-flex flex-column justify-center align-center" fluid>
        <!-- Texto -->
        <v-typography class="text-center styled-text" variant="h5">
          Este repositório acadêmico tem como objetivo centralizar, 
          organizar e disponibilizar trabalhos de pesquisa, projetos e artigos 
          científicos do Instituto Federal de Educação, Ciência e Tecnologia Sudeste de 
          Minas Gerais, promovendo o acesso fácil e rápido a conteúdos acadêmicos, 
          além de facilitar a troca de conhecimento entre estudantes, professores e 
          pesquisadores.
        </v-typography>
      </v-container>

      <!-- Usando o Componente de Lista Suspensa -->
      <ListaSuspensa />

      <!-- Usando o Componente de Pesquisa Avançada -->
      <PesquisaAvancada />
    </v-main>

    <!-- Usando o Componente de Rodapé -->
    <CustomFooter />
  </v-app>
</template>

<script>
import CustomHeader from '../components/header/CustomHeader.vue';
import CustomFooter from '../components/footer/CustomFooter.vue';
import ListaSuspensa from '../components/lista/ListaSuspensa.vue';
import PesquisaAvancada from '../components/pesquisa/PesquisaAvancada.vue';

// Registrar os componentes
export default {
  components: {
    CustomHeader,
    ListaSuspensa,
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