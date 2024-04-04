import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import setupAxios from './setupAxios';
import './styles/normalize.css';
import './styles/global.css';

// Primevue
import PrimeVue from 'primevue/config';


const app = createApp(App);

app.use(PrimeVue, {
  unstyled: true
});
app.use(router);
setupAxios();
app.mount('#app');