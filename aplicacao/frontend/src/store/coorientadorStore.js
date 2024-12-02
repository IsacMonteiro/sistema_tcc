import { defineStore } from 'pinia';
import axios from 'axios';

export const useCoorientadorStore = defineStore('coorientador', {
  state: () => ({
    coorientadores: [],
  }),
  actions: {
    async listarCoorientadores() {
      try {
        const response = await axios.get('http://localhost:3000/api/coorientador');
        this.coorientadores = response.data;
      } catch (error) {
        console.error('Erro ao listar coorientadores:', error);
      }
    },
    async cadastrarCoorientador(matricula_coorientador, nome_coorientador, titulacao, area_atuacao, email_coorientador) {
      try {
        const novoCoorientador = { matricula_coorientador, nome_coorientador, titulacao, area_atuacao, email_coorientador};
        const response = await axios.post('http://localhost:3000/api/coorientador', novoCoorientador);
        this.coorientadores.push(response.data.result);
        return { message: 'Coorientador cadastrado com sucesso!' };
      } catch (error) {
        console.error('Erro ao cadastrar coorientador:', error.response?.data || error.message);
        throw error;
      }
    },
    async excluirCoorientador(id_coorientador) {
      try {
        await axios.delete(`http://localhost:3000/api/coorientador/${id_coorientador}`);
        await this.listarCoorientadores();
      } catch (error) {
        console.error('Erro ao excluir coorientador:', error);
      }
    },
    async editarCoorientador(id_coorientador ,matricula_coorientador, nome_coorientador, titulacao, area_atuacao, email_coorientador) {
      try {
        const coorientadorAtualizado = { matricula_coorientador, nome_coorientador, titulacao, area_atuacao, email_coorientador };
        const response = await axios.put(`http://localhost:3000/api/coorientador/${id_coorientador}`, coorientadorAtualizado);
        await this.listarCoorientadores();
        return response;
      } catch (error) {
        console.error('Erro ao editar coorientador:', error.response?.data || error.message);
        throw error;
      }
    },
  },
});
