import { createRouter, createWebHashHistory } from 'vue-router';
import DashboardView from './src/views/Dashboard.vue';

const routes = [
  // default route
  { path: '/', name: 'Dashboard', component: DashboardView },

  // other routes
  { path: '/help', name: 'Help', component: () => import('./src/views/Help.vue') },
  { path: '/profile', name: 'Profile', component: () => import('./src/views/Profile.vue') },
  { path: '/search', name: 'Search', component: () => import('./src/views/Search.vue') },
  { path: '/settings', name: 'Settings', component: () => import('./src/views/Settings.vue') },
  { path: '/tools', name: 'Tools', component: () => import('./src/views/Tools.vue') },
  { path: '/tracker', name: 'Tracker', component: () => import('./src/views/Tracker.vue') },
  { path: '/calendar', name: 'Calendar', component: () => import('./src/views/Calendar.vue') },
  { path: '/login', name: 'Login', component: () => import('./src/views/Login.vue') },
  { path: '/test', name: 'Test', component: () => import('./src/views/Test.vue') },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

router.afterEach((to) => {
  document.title = `${to.meta.title} | kroo`;
});

export default router;