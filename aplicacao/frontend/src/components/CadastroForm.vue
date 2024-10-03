<template>
    <div class="cadastro-obra">
      <h1>Cadastro de Obra</h1>
      <form @submit.prevent="submitForm">
        
        <!-- Campos do Curso -->
        <h2>Dados do Curso</h2>
        <div>
          <label for="nome_curso">Nome do Curso:</label>
          <input type="text" id="nome_curso" v-model="curso.nome_curso" required />
        </div>
  
        <!-- Botão de Envio -->
        <button type="submit">Cadastrar Obra</button>
        
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        curso: {
          nome_curso: ''
        }
      };
    },
    methods: {
      submitForm() {
        axios.post('http://localhost:3000/api/curso', this.curso)
          .then(response => {
            console.log('Curso cadastrado:', response.data);
          })
          .catch(error => {
            console.error('Erro ao cadastrar curso:', error);
          });
      }
    }
  };
  </script>
  
  <style src="../css/FormularioCadastro.css"></style>  