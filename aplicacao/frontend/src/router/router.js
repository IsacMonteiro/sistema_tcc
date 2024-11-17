import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/views/HomePage.vue';
import SearchPage from '@/views/SearchPage.vue';
import TccPage from '@/views/TccPage.vue';
import HomePageAdm from '@/views/HomePageAdm.vue';

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage
  },
  {
    path: '/SearchPage',
    name: 'SearchPage',
    component: SearchPage
  },
  {
    path: '/TccPage',
    name: 'TccPage',
    component: TccPage
  },
  {
    path: '/Adm',
    name: 'HomePageAdm',
    component: HomePageAdm
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;