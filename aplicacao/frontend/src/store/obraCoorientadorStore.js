import { defineStore } from 'pinia';
import axios from 'axios';

export const useObraCoorientadorStore = defineStore('obraCoorientador', {
  state: () => ({
    obraCoorientadores: [],
  }),
  actions: {
    // Função para tratar erros
    handleError(error) {
      console.error('Erro:', error.response?.data || error.message);
    },

    // Listar todos os registros
    async listarObraCoorientadores() {
      try {
        const response = await axios.get('http://localhost:3000/api/obraCoorientador');
        this.obraCoorientadores = response.data;
      } catch (error) {
        this.handleError(error);
      }
    },

    // Criar relacionamento
    async cadastrarObraCoorientador(fk_id_obra, fk_id_coorientador) {
      try {
        const novoRelacionamento = { fk_id_obra, fk_id_coorientador };
        const response = await axios.post('http://localhost:3000/api/obraCoorientador', novoRelacionamento);
        this.obraCoorientadores.push(response.data.result);
        return { message: 'Relacionamento obra-coorientador criado com sucesso!' };
      } catch (error) {
        this.handleError(error);
        throw error;
      }
    },

    // Excluir relacionamento
    async excluirObraCoorientador(fk_id_obra, fk_id_coorientador) {
      try {
        await axios.delete(`http://localhost:3000/api/obraCoorientador/${fk_id_obra}/${fk_id_coorientador}`);
        await this.listarObraCoorientadores();
      } catch (error) {
        this.handleError(error);
      }
    },

    // Verificar relacionamento existente
    async verificarRelacionamento(fk_id_obra, fk_id_coorientador) {
      return this.obraCoorientadores.some(
        (rel) => rel.fk_id_obra === fk_id_obra && rel.fk_id_coorientador === fk_id_coorientador
      );
    },
  },
});