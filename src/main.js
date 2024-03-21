import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './styles/normalize.css';
import './styles/global.css';

// import global components
import Navbar from './components/NavBar.vue';

const app = createApp(App);

app.use(router);
app.mount('#app');
app.component('navbar', Navbar);
