<template>
  <v-container>
    <!-- Cabeçalho -->
    <v-row justify="space-between" class="mb-4">
      <v-col cols="12" md="6">
        <v-title class="title">Gerenciamento de Obras</v-title>
      </v-col>
      <v-col cols="12" md="6" class="d-flex justify-end">
        <v-btn class="add-btn" outlined @click="handleAddTCC">
          <v-icon left>mdi-plus</v-icon>
          Nova Obra
        </v-btn>
      </v-col>
    </v-row>

    <!-- Barra de Pesquisa -->
    <v-row>
      <v-col cols="12" md="4" class="mb-3">
        <v-text-field
          v-model="search"
          label="Pesquisar..."
          outlined
          dense
          clearable
          append-icon="mdi-magnify"
        ></v-text-field>
      </v-col>
    </v-row>

    <!-- Tabela de Obras -->
    <v-data-table
      :headers="headers"
      :items="obras"
      :search="search"
      item-value="id"
      class="tcc-table"
      dense
      show-select
    >
      <!-- Coluna de ações personalizadas -->
      <template v-slot:[`item.actions`]="{ item }">
        <v-btn icon small class="edit-btn" @click="handleEditTCC(item.id)">
          <v-icon color="blue">mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon small class="delete-btn" @click="handleDeleteTCC(item.id)">
          <v-icon color="red">mdi-delete</v-icon>
        </v-btn>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      // Cabeçalhos da tabela
      headers: [
        { text: "Título", value: "title" },
        { text: "Autor", value: "author" },
        { text: "Curso", value: "course" },
        { text: "Ações", value: "actions", sortable: false },
      ],
      // Lista de Obras simuladas
      obras: [
        { id: 1, title: "Título 1", author: "Autor 1", course: "Curso 1" },
        { id: 2, title: "Título 2", author: "Autor 2", course: "Curso 2" },
        { id: 3, title: "Título 3", author: "Autor 3", course: "Curso 3" },
      ],
      // Campo de pesquisa
      search: "",
    };
  },
  methods: {
    // Redireciona para o formulário de cadastro de nova obra
    handleAddTCC() {
      this.$router.push("/CadastroFormPage"); // Certifique-se de que a rota esteja configurada
    },
    // Simula a edição de uma Obra
    handleEditTCC(id) {
      console.log(`Editar obra com ID ${id}`);
    },
    // Simula a exclusão de uma Obra
    handleDeleteTCC(id) {
      console.log(`Excluir obra com ID ${id}`);
      this.obras = this.obras.filter((obra) => obra.id !== id);
    },
  },
};
</script>

<style scoped>
/* Título */
.title {
  font-size: 24px;
  font-weight: bold;
  text-transform: uppercase;
  color: #fff;
  background: linear-gradient(90deg, #00420c, #28a745);
  padding: 10px;
  border-radius: 10px;
}

.mb-4 {
  margin-top: 100px;
}

/* Botão de adicionar */
.add-btn {
  color: #fff;
  background-color: #00420c;
}

.add-btn:hover {
  background-color: #001a05;
}

/* Campo de pesquisa */
.v-text-field {
  width: 100%;
}

/* Tabela */
.tcc-table {
  background-color: #f5f5f5;
  border-radius: 10px;
  max-height: 400px;
  overflow-y: auto;
}

/* Botões de ação */
.edit-btn,
.delete-btn {
  background-color: transparent !important;
  box-shadow: none !important;
  padding: 0;
}

.edit-btn v-icon {
  color: blue;
}

.delete-btn v-icon {
  color: red;
}

/* Barra de Pesquisa */
.mb-3{
  border-radius: 10px;
  color: #002907;
}
</style>