import { defineStore } from 'pinia';
import axios from 'axios';

export const useOrientadorStore = defineStore('orientador', {
  state: () => ({
    orientadores: [],
  }),
  actions: {
    async listarOrientadores() {
      try {
        const response = await axios.get('http://localhost:3000/api/orientador');
        this.orientadores = response.data;
      } catch (error) {
        console.error('Erro ao listar orientadores:', error);
      }
    },
    async cadastrarOrientador(matricula_orientador, nome_orientador, titulacao, area_atuacao, email_orientador) {
      try {
        const novoOrientador = { matricula_orientador, nome_orientador, titulacao, area_atuacao, email_orientador };
        const response = await axios.post('http://localhost:3000/api/orientador', novoOrientador);
        this.orientadores.push(response.data.result);
        return { message: 'Orientador cadastrado com sucesso!' };
      } catch (error) {
        console.error('Erro ao cadastrar orientador:', error.response?.data || error.message);
        throw error;
      }
    },
    async excluirOrientador(id_orientador) {
      try {
        await axios.delete(`http://localhost:3000/api/orientador/${id_orientador}`);
        await this.listarOrientadores();
      } catch (error) {
        console.error('Erro ao excluir orientador:', error);
      }
    },
    async editarOrientador(id_orientador , matricula_orientador, nome_orientador, titulacao, area_atuacao, email_orientador) {
      try {
        const orientadorAtualizado = { matricula_orientador, nome_orientador, titulacao, area_atuacao, email_orientador };
        const response = await axios.put(`http://localhost:3000/api/orientador/${id_orientador}`, orientadorAtualizado);
        await this.listarOrientadores();
        return response;
      } catch (error) {
        console.error('Erro ao editar orientador:', error.response?.data || error.message);
        throw error;
      }
    },
  },
});
