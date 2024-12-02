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
            v-model="obra.tipos"
            :items="tipos"
            item-text="nome"
            item-value="id"
            :rules="[rules.required]"
            outlined
            dense
          ></v-select>

          <!-- Data de Apresentação -->
          <v-text-field
            label="Data de Apresentação"
            v-model="obra.data_apresentacao"
            v-mask="'##/##/####'"
            :rules="[rules.required, rules.date]"
            outlined
            dense
          ></v-text-field>

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
            :rules="[rules.requiredFile, rules.validFileType, rules.maxFileSize]"
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
            :rules="[rules.required, rules.matriculaLength]"
            v-mask="'##########'"
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
            :rules="[rules.required, rules.email]"
            outlined
            dense
          ></v-text-field>

          <h4 class="text-center">Orientador</h4>
          <!-- Orientador -->
          <v-text-field
            label="Matrícula"
            v-model="obra.orientador.matricula"
            :rules="[rules.required, rules.matriculaLength]"
            v-mask="'##########'"
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
          <v-select
            label="Titulação"
            v-model="obra.orientador.titulacoes"
            :items="titulacoes"
            item-text="nome"
            item-value="id"
            :rules="[rules.required]"
            outlined
            dense
          ></v-select>
          <v-text-field
            label="Área de Atuação"
            v-model="obra.orientador.areaAtuacao"
            :rules="[rules.required]"
            outlined
            dense
          ></v-text-field>
          <v-text-field
            label="Email"
            v-model="obra.orientador.email"
            :rules="[rules.required, rules.email]"
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
              :rules="[rules.required, rules.matriculaLength]"
              v-mask="'##########'"
              outlined
              dense
            ></v-text-field>
            <v-text-field
              label="Nome"
              v-model="obra.coorientador.nome"
              :rules="coorientadorRules"
              outlined
              dense
            ></v-text-field>
            <v-select
              label="Titulação"
              v-model="obra.coorientador.titulacoes"
              :rules="coorientadorRules"
              :items="titulacoes"
              item-text="nome"
              item-value="id"
              outlined
              dense
            ></v-select>
            <v-text-field
              label="Área de Atuação"
              v-model="obra.coorientador.areaAtuacao"
              :rules="coorientadorRules"
              outlined
              dense
            ></v-text-field>
            <v-text-field
              label="Email"
              v-model="obra.coorientador.email"
              :rules="[rules.required ,rules.email]"
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
  import { rules } from "@/helpers/formValidations";
  import { initialObra } from "@/helpers/obraData";
  import { handleReset, handleFormSubmit } from "@/helpers/formMethods";
  import { mask } from "vue-the-mask"; // Importa a diretiva de máscara

  export default {
    directives: { mask }, // Adiciona a diretiva de máscara ao componente

    data() {
      return {
        valid: false,
        menu: false,
        obra: { ...initialObra },
        cursos: ["ADMINISTRAÇÃO", "CIÊNCIAS AMBIENTAIS", "DESIGNER DE MODA", "GESTÃO EM TECNOLOGIA DA INFORMAÇÃO"],
        tipos: ["TCC"],
        titulacoes: [
          "Bacharel",
          "Tecnólogo",
          "Especialista",
          "Mestre",
          "Doutor",
        ],
        rules, // Regras de validação importadas
      };
    },

    // Regras condicionais para coorientador
    computed: {
      coorientadorRules() {
        return this.obra.possuiCoorientador ? [this.rules.required] : [];
      },
    },

    methods: {
      ...mapActions("obras", ["cadastrarObra"]),

      async handleSubmit() {
        const isValid = await this.$refs.obraForm.validate();

        if (isValid) {
          await handleFormSubmit(this.$refs.obraForm, this.obra, this.cadastrarObra, this.$router);
        } else {
          this.$toast.error("Preencha todos os campos obrigatórios!");
        }
      },

      handleReset() {
        handleReset(this.$refs.obraForm, this.obra);
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

h4 {
  margin-bottom: 10px;
  padding: 5px;
  text-transform: uppercase;
  font-weight: bold;
  background: linear-gradient(90deg, #00420c, #28a745);
  border-radius: 3px;
  color: #fff;
}
</style>
