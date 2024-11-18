<template>
  <v-container>
    <!-- Título do Formulário -->
    <v-row justify="center" class="mb-4">
      <v-col cols="12" md="8">
        <h2 class="form-title text-center">Cadastro de Obra</h2>
      </v-col>
    </v-row>

    <!-- Formulário -->
    <v-form ref="obraForm" v-model="valid">
      <v-row justify="center" class="form-container" no-gutters>
        <!-- Coluna 1 -->
        <v-col cols="12" md="6" class="pr-md-2">
          <h4 class="text-center">Obra</h4>
          <!-- Título -->
          <v-text-field
            label="Título da Obra"
            v-model="obra.titulo"
            :rules="[rules.required]"
            outlined
            dense
          ></v-text-field>

          <!-- Tipo -->
          <v-select
            label="Tipo de Obra"
            v-model="obra.tipo"
            :items="tipos"
            item-text="nome"
            item-value="id"
            :rules="[rules.required]"
            outlined
            dense
          ></v-select>

          <!-- Data de Apresentação -->
          <v-menu
            v-model="menu"
            :close-on-content-click="false"
            :nudge-width="200"
            offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                label="Data de Apresentação"
                v-model="obra.data_apresentacao"
                :rules="[rules.required]"
                readonly
                placeholder="Escolha uma data"
                v-bind="attrs"
                v-on="on"
                outlined
                dense
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="obra.data_apresentacao"
              @input="menu = false"
              scrollable
            ></v-date-picker>
          </v-menu>

          <!-- Resumo -->
          <v-textarea
            label="Resumo"
            v-model="obra.resumo"
            :rules="[rules.required]"
            outlined
            dense
            rows="3"
          ></v-textarea>

          <!-- Palavras-Chave -->
          <v-text-field
            label="Palavras-Chave"
            v-model="obra.palavras_chave"
            :rules="[rules.keywords]"
            outlined
            dense
            hint="Separe por vírgulas (Ex.: TI, Repositório, TCC)"
          ></v-text-field>

          <!-- Arquivo -->
          <v-file-input
            label="Arquivo"
            v-model="obra.arquivo"
            outlined
            dense
            accept=".pdf"
          ></v-file-input>

          <!-- Curso -->
          <v-container class="my-5">
            <h4 class="text-center">Curso</h4>
            <v-select
              label="Curso"
              v-model="obra.fk_id_curso"
              :items="cursos"
              item-text="nome"
              item-value="id"
              :rules="[rules.required]"
              outlined
              dense
            ></v-select>
        </v-container>
        </v-col>

        <!-- Coluna 2 -->
        <v-col cols="12" md="6" class="pl-md-2">
          <h4 class="text-center">Autor</h4>
          <!-- Autor -->
          <v-text-field
            label="Matrícula"
            v-model="obra.autor.matricula"
            :rules="[rules.required]"
            outlined
            dense
          ></v-text-field>
          <v-text-field
            label="Nome"
            v-model="obra.autor.nome"
            :rules="[rules.required]"
            outlined
            dense
          ></v-text-field>
          <v-text-field
            label="Email"
            v-model="obra.autor.email"
            :rules="[rules.email]"
            outlined
            dense
          ></v-text-field>

          <h4 class="text-center">Orientador</h4>
          <!-- Orientador -->
          <v-text-field
            label="Matrícula"
            v-model="obra.orientador.matricula"
            :rules="[rules.required]"
            outlined
            dense
          ></v-text-field>
          <v-text-field
            label="Nome"
            v-model="obra.orientador.nome"
            :rules="[rules.required]"
            outlined
            dense
          ></v-text-field>
          <v-text-field
            label="Titulação"
            v-model="obra.orientador.titulacao"
            :rules="[rules.required]"
            outlined
            dense
          ></v-text-field>
          <v-text-field
            label="Área de Atuação"
            v-model="obra.orientador.areaAtuacao"
            outlined
            dense
          ></v-text-field>
          <v-text-field
            label="Email"
            v-model="obra.orientador.email"
            :rules="[rules.email]"
            outlined
            dense
          ></v-text-field>

          <!-- Possui Coorientador -->
          <v-switch
            label="Possui Coorientador?"
            v-model="obra.possuiCoorientador"
            inset
            dense
          ></v-switch>

          <!-- Coorientador Exibido Condicionalmente -->
          <div v-if="obra.possuiCoorientador">
            <h4 class="text-center">Coorientador</h4>
            <v-text-field
              label="Matrícula"
              v-model="obra.coorientador.matricula"
              outlined
              dense
            ></v-text-field>
            <v-text-field
              label="Nome"
              v-model="obra.coorientador.nome"
              outlined
              dense
            ></v-text-field>
            <v-text-field
              label="Titulação"
              v-model="obra.coorientador.titulacao"
              outlined
              dense
            ></v-text-field>
            <v-text-field
              label="Área de Atuação"
              v-model="obra.coorientador.areaAtuacao"
              outlined
              dense
            ></v-text-field>
            <v-text-field
              label="Email"
              v-model="obra.coorientador.email"
              :rules="[rules.email]"
              outlined
              dense
            ></v-text-field>
          </div>
        </v-col>
      </v-row>

      <!-- Botões -->
      <v-row justify="center" class="mt-4">
        <v-col cols="12" md="8" class="text-center">
          <v-btn class="mr-4" id="save" @click="handleSubmit">Salvar</v-btn>
          <v-btn outlined class="mr-4" id="reset" @click="handleReset">Limpar</v-btn>
          <v-btn outlined id="back" @click="goBack">Voltar</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      valid: false,
      menu: false,
      obra: {
        titulo: "",
        tipo: "",
        data_apresentacao: null,
        resumo: "",
        palavras_chave: "",
        arquivo: null,
        fk_id_curso: null,
        autor: { matricula: "", nome: "", email: "" },
        orientador: { matricula: "", nome: "", titulacao: "", areaAtuacao: "", email: "" },
        coorientador: { matricula: "", nome: "", titulacao: "", areaAtuacao: "", email: "" },
        possuiCoorientador: false,
      },
      cursos: [], // Lista de cursos
      tipos: [], // Lista de tipos de obra
      rules: {
        required: (value) => !!value || "Este campo é obrigatório",
        email: (value) =>
          !value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || "Email inválido",
        keywords: (value) =>
          (value && value.split(",").length > 0) ||
          "Informe ao menos uma palavra-chave",
      },
    };
  },
  methods: {
    ...mapActions("obras", ["cadastrarObra"]),

    async handleSubmit() {
      if (this.$refs.obraForm.validate()) {
        try {
          await this.cadastrarObra(this.obra);
          this.$toast.success("Obra cadastrada com sucesso!");
          this.handleReset(); // Limpa o formulário após o cadastro
        } catch (error) {
          this.$toast.error("Erro ao cadastrar a obra!");
        }
      }
    },

    handleReset() {
      this.$refs.obraForm.reset();
      Object.keys(this.obra).forEach((key) => (this.obra[key] = null));
      this.obra.orientador = { matricula: "", nome: "", titulacao: "", areaAtuacao: "", email: "" };
      this.obra.coorientador = { matricula: "", nome: "", titulacao: "", areaAtuacao: "", email: "" };
      this.obra.possuiCoorientador = false;
    },

    goBack() {
      this.$router.push("/HomePageAdm");
    },
  },
};
</script>

<style scoped>
/* Título do formulário */
.form-title {
  font-weight: bold;
  border-radius: 5px;
  font-size: 20px;
  text-transform: uppercase;
  padding: 10px;
  margin: 30px 0 20px;
  color: #fff;
  background: linear-gradient(90deg, #00420c, #28a745);
}

/* Botões */
#save {
  background-color: #006dba;
  color: #fff;
  font-weight: bold;
}

#reset {
  background-color: red;
  color: #fff;
  font-weight: bold;
}

#back {
  background-color: #00420c;
  color: #fff;
}

#save:hover {
  background-color: #004b81;
}

#reset:hover {
  background-color: #f44336;
}

#back:hover {
  background-color: #002907;
}

/* Formulário */
.form-container {
  max-width: 1170px;
  border-radius: 10px;
  margin: auto;
  padding: 20px;
  background-color: #f9f9f9;
  color: #002907;
}

h4{
  margin-bottom: 10px;
  padding: 5px;
  text-transform: uppercase;
  font-weight: bold;
  background: linear-gradient(90deg, #00420c, #28a745);
  border-radius: 3px;
  color: #fff;
}
</style>