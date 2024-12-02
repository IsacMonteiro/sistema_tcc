import { createApp } from 'vue';
import App from './App.vue';
import router from './router/router';
import vuetify from './plugins/vuetify';
import { loadFonts } from './plugins/webfontloader';
import { createPinia } from 'pinia';

// Carrega as fontes personalizadas
loadFonts();

const app = createApp(App);

// Configura o Pinia (estado global)
const pinia = createPinia();
app.use(pinia);

// Configura o Vue Router e Vuetify
app.use(router);
app.use(vuetify);

// Monta a aplicação
app.mount('#app');