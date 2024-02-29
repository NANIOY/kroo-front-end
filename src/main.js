import { createApp } from 'vue'
import './style.css'
import Login from './views/Login.vue'
import Calendar from './views/Calendar.vue'
import Dashboard from './views/Dashboard.vue'
import Help from './views/Help.vue'
import Profile from './views/Profile.vue'
import Search from './views/Search.vue'
import Settings from './views/Settings.vue'
import Tools from './views/Tools.vue'
import Tracker from './views/Tracker.vue'
import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

const routes = [
  { path: '/', component: Login },
  { path: '/calendar', component: Calendar },
  { path: '/dashboard', component: Dashboard },
  { path: '/help', component: Help },
  { path: '/profile', component: Profile },
  { path: '/search', component: Search },
  { path: '/settings', component: Settings },
  { path: '/tools', component: Tools },
  { path: '/tracker', component: Tracker },

];

const router = new VueRouter({
  routes,
});

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');

createApp(App).mount('#app')
