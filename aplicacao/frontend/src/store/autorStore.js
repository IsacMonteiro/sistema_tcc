import { defineStore } from 'pinia';
import axios from 'axios';

export const useAutorStore = defineStore('autor', {
  state: () => ({
    autores: [],
  }),
  actions: {
    async listarAutores() {
      try {
        const response = await axios.get('http://localhost:3000/api/autor');
        this.autores = response.data;
      } catch (error) {
        console.error('Erro ao listar autores:', error);
      }
    },
    async cadastrarAutor(matricula_autor, nome_autor, email_autor) {
      try {
        const novoAutor = { matricula_autor, nome_autor, email_autor };
        const response = await axios.post('http://localhost:3000/api/autor', novoAutor);
        this.autores.push(response.data.result);
        return { message: 'Autor cadastrado com sucesso!' };
      } catch (error) {
        console.error('Erro ao cadastrar autor:', error.response?.data || error.message);
        throw error;
      }
    },
    async excluirAutor(id_autor) {
      try {
        await axios.delete(`http://localhost:3000/api/autor/${id_autor}`);
        // Atualiza o estado removendo o autor da lista
        this.autores = this.autores.filter(autor => autor.id !== id_autor);
      } catch (error) {
        console.error('Erro ao excluir autor:', error);
      }
    },
    async editarAutor(id_autor, matricula_autor, nome_autor, email_autor) {
      try {
        const autorAtualizado = { matricula_autor, nome_autor, email_autor };
        const response = await axios.put(`http://localhost:3000/api/autor/${id_autor}`, autorAtualizado);
        // Atualiza o autor no estado
        this.autores = this.autores.map(autor =>
          autor.id === id_autor ? { ...autor, ...autorAtualizado } : autor
        );
        return response;
      } catch (error) {
        console.error('Erro ao editar autor:', error.response?.data || error.message);
        throw error;
      }
    },
  },
});