<template>
  <v-app-bar flat>
    <!-- Logo e Título -->
    <v-container class="d-flex justify-space-between align-center">
      <div class="d-flex align-center">
        <router-link to="/" class="d-flex align-center">
          <v-img class="logo-img mr-3" src="/img/logo.png" alt="logo"></v-img>
        </router-link>
        <router-link to="/" class="title-link">
          <v-title depressed class="title">REPOSITÓRIO ACADÊMICO IF SUDESTE DE MINAS GERAIS - MURIAÉ</v-title>
        </router-link>
      </div>

      <div class="d-flex align-center">
        <!-- Barra de pesquisa -->
        <v-text-field
          solo
          flat
          hide-details
          label="PESQUISA RÁPIDA"
          class="search-input"
        ></v-text-field>
        <!-- Botão de busca com ícone de lupa -->
        <v-btn
          icon
          class="search-btn"
          @click="handleSearch"
        >
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
        <!-- Divisor -->
        <v-divider vertical class="mx-4 divider-custom"></v-divider>
        <!-- Título e botão de login -->
        <v-title depressed class="title-adm">Sou administrador:</v-title>
        <v-btn @click="toggleLoginForm" class="login-btn ml-3">ENTRAR</v-btn>
      </div>
    </v-container>
  </v-app-bar>

  <!-- Formulário de Login -->
  <v-dialog v-model="loginFormVisible" max-width="500px">
    <v-card>
      <v-card-title class="text-center">
        <v-img class="logo-img mr-3" src="/img/logo.png" alt="logo"></v-img>
        <span class="headline">ÁREA ADMINISTRATIVA</span>
        <v-btn icon class="close-btn" @click="loginFormVisible = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-form @submit.prevent="submitLogin" v-model="valid">
          <v-text-field
            label="E-mail"
            v-model="loginData.email"
            type="email"
            :rules="emailRules"
            required
          ></v-text-field>
          <v-text-field
            label="Senha"
            v-model="loginData.password"
            type="password"
            :rules="passwordRules"
            required
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions class="d-flex justify-center">
        <v-btn color="#fff" @click="submitLogin" class="acess-btn" :disabled="!valid">Acessar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      loginFormVisible: false, // Controla a visibilidade do formulário de login
      valid: false, // Define a validação do formulário
      loginData: {
        email: "",
        password: "",
      },
      // Regras de validação para os campos de e-mail e senha
      emailRules: [
        (v) => !!v || "E-mail é obrigatório",
        (v) => /.+@.+\..+/.test(v) || "E-mail inválido",
      ],
      passwordRules: [(v) => !!v || "Senha é obrigatória"],
    };
  },
  methods: {
    toggleLoginForm() {
      // Alterna a visibilidade do formulário de login
      this.loginFormVisible = !this.loginFormVisible;
    },
    async submitLogin() {
      // Validar os campos do formulário
      if (!this.valid) {
        alert("Por favor, preencha todos os campos corretamente");
        return;
      }

      try {
        // Enviar dados para o backend
        const response = await axios.post(
          "http://seu-backend-endpoint/login",
          this.loginData
        );

        // Verificar a resposta do servidor
        if (response.data.success) {
          // Salvar o token ou dados do usuário, se necessário
          localStorage.setItem("userToken", response.data.token);

          // Redirecionar para a página de sucesso
          this.$router.push({ name: "TestePage" });

          // Fechar o formulário de login
          this.loginFormVisible = false;
        } else {
          alert("Credenciais inválidas!");
        }
      } catch (error) {
        console.error("Erro de login:", error);
        alert("Erro ao conectar com o servidor!");
      }
    },
    handleSearch() {
      alert("Busca acionada!"); // Substitua com a lógica de busca
    },
  },
};
</script>

<style scoped>
.v-app-bar {
  background: #005f00;
  padding: 10px 0;
  border-bottom: 10px solid #00420c;
}

.title {
  background-color: #00420c;
  padding: 15px;
  border-radius: 10px;
  font-weight: bold;
  color: #fff;
}

.title-link {
  text-decoration: none; /* Remove o sublinhado */
}

.logo-img {
  width: 50px;
  height: 50px;
}

.title-adm {
  font-weight: bold;
  color: #fff;
  text-transform: uppercase;
}

.search-input {
  max-width: 300px;
  width: 300px;
  border-radius: 10px;
  padding: 5px 10px;
  color: #fff;
}

.search-btn {
  background-color: #00420c;
  color: #fff;
  border-radius: 10%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.search-btn:hover {
  background-color: #001a05;
}

.v-divider {
  border-right: 3px solid #fff !important; /* Controla a espessura do divisor com border */
}

.divider-custom {
  background-color: #fff;
  margin-top: 10px;
  margin-bottom: 10px;
}

.login-btn {
  background-color: #00420c;
  color: #fff;
  border-radius: 7px;
  width: 120px;
  height: 45px;
}

.login-btn:hover {
  background-color: #001a05;
}

.text-center {
  text-align: center;
  color: #005f00;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 15px;
  color: red;
}

.acess-btn {
  width: 100%;
  height: 45px;
  border-radius: 5px;
  font-weight: bold;
  background-color: #00420c;
}

.acess-btn:hover {
  background-color: #001a05;
}
</style>