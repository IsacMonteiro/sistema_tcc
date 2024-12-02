import { defineStore } from 'pinia';
import axios from 'axios';

export const useCursoStore = defineStore('curso', {
  state: () => ({
    cursos: [],
  }),
  actions: {
    async listarCursos() {
      try {
        const response = await axios.get('http://localhost:3000/api/curso');
        this.cursos = response.data;
      } catch (error) {
        console.error('Erro ao listar cursos:', error);
      }
    },
    async cadastrarCurso(nome_curso) {
      try {
        const novoCurso = { nome_curso};
        const response = await axios.post('http://localhost:3000/api/curso', novoCurso);
        this.cursos.push(response.data.result);
        return { message: 'Curso cadastrado com sucesso!' };
      } catch (error) {
        console.error('Erro ao cadastrar curso:', error.response?.data || error.message);
        throw error;
      }
    },
    async excluirCurso(id_curso) {
      try {
        await axios.delete(`http://localhost:3000/api/curso/${id_curso}`);
        await this.listarCursos();
      } catch (error) {
        console.error('Erro ao excluir curso:', error);
      }
    },
    async editarCurso(id_curso, nome_curso) {
      try {
        const cursoAtualizado = { nome_curso};
        const response = await axios.put(`http://localhost:3000/api/curso/${id_curso}`, cursoAtualizado);
        await this.listarCursos();
        return response;
      } catch (error) {
        console.error('Erro ao editar curso:', error.response?.data || error.message);
        throw error;
      }
    },
  },
});