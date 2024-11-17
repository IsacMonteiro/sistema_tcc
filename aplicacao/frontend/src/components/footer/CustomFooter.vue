<template>
    <footer class="app-footer">
      <p>&copy; 2024 Repositório Acadêmico IF Sudeste de Minas Gerais - Muriaé. Todos os direitos reservados.</p>
      <p>
        <a href="">Como Funciona</a> | 
        <a href="https://www.ifsudestemg.edu.br/" target="_blank" rel="noopener noreferrer">Conheça a Instituição</a>
      </p>
    </footer>
  </template>
  
  <script>
  export default {
    name: "AppFooter",
  };
  </script>
  
  <style scoped>
  .app-footer {
    background-color: #005f00;
    border-bottom: 10px solid #00420c;
    color: #fff;
    text-align: center;
    padding: 20px 10px;
    bottom: 0;
    left: 0;
    width: 100%;
    font-family: 'Arial', sans-serif;
    font-size: 14px;
  }
  
  .app-footer a {
    color: #92c37a;
    text-decoration: none;
    text-transform: uppercase;
    font-weight: bold;
  }
  
  .app-footer a:hover {
    text-decoration: underline;
  }
  </style>  