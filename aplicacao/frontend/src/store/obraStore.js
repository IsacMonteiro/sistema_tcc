import { defineStore } from 'pinia';
import axios from 'axios';

export const useObraStore = defineStore('obra', {
  state: () => ({
    obras: [],
    currentPage: 1, // Página atual para a paginação
    filterKey: null, // Filtro aplicado (e.g., Autor, Título)
    selectedItem: null, // Valor do filtro aplicado
  }),
  actions: {
    async listarObras() {
      try {
        const response = await axios.get('http://localhost:3000/api/obra');
        this.obras = response.data;
      } catch (error) {
        console.error('Erro ao listar obras:', error);
      }
    },
    async cadastrarObra(titulo, resumo, palavras_chave, data_publicacao, tipo, status, id_orientador, id_coorientador, id_curso) {
      try {
        const novaObra = { titulo, resumo, palavras_chave, data_publicacao, tipo, status, id_orientador, id_coorientador, id_curso };
        const response = await axios.post('http://localhost:3000/api/obra', novaObra);
        this.obras.push(response.data.result);
        return { message: 'Obra cadastrada com sucesso!' };
      } catch (error) {
        console.error('Erro ao cadastrar obra:', error.response?.data || error.message);
        throw error;
      }
    },
    async excluirObra(id_obra) {
      try {
        await axios.delete(`http://localhost:3000/api/obra/${id_obra}`);
        await this.listarObras();
      } catch (error) {
        console.error('Erro ao excluir obra:', error);
      }
    },
    async editarObra(id_obra, titulo, resumo, palavras_chave, data_publicacao, tipo, status, id_orientador, id_coorientador, id_curso) {
      try {
        const obraAtualizada = { titulo, resumo, palavras_chave, data_publicacao, tipo, status, id_orientador, id_coorientador, id_curso };
        const response = await axios.put(`http://localhost:3000/api/obra/${id_obra}`, obraAtualizada);
        await this.listarObras();
        return response;
      } catch (error) {
        console.error('Erro ao editar obra:', error.response?.data || error.message);
        throw error;
      }
    },
    setFilters(filterKey, selectedItem) {
      // Salva os filtros aplicados
      this.filterKey = filterKey;
      this.selectedItem = selectedItem;
    },
    setCurrentPage(page) {
      // Salva a página atual
      this.currentPage = page;
    },
  },
});