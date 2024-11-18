import api from "@/api"; // Importa a configuração do Axios

export default {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    async cadastrarObra({ commit }, obra) {
      try {
        const response = await api.post("/obra", obra);
        return response.data; // Retorna os dados do backend
      } catch (error) {
        console.error("Erro ao cadastrar obra:", error.response || error);
        throw error; // Propaga o erro para ser tratado no componente
      }
    },
  },
};