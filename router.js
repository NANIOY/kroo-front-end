import { createRouter, createWebHashHistory } from 'vue-router'; // Updated

import DashboardView from './src/views/Dashboard.vue'; // Assuming your dashboard component

const routes = [
  // Set the default route to your dashboard component
  { path: '/', component: DashboardView },

  // Routes for other views
  { path: '/help', component: () => import('./src/views/Help.vue') }, // Lazy loading
  { path: '/profile', component: () => import('./src/views/Profile.vue') }, // Lazy loading
  { path: '/search', component: () => import('./src/views/Search.vue') }, // Lazy loading
  { path: '/settings', component: () => import('./src/views/Settings.vue') }, // Lazy loading
  { path: '/tools', component: () => import('./src/views/Tools.vue') }, // Lazy loading
  { path: '/tracker', component: () => import('./src/views/Tracker.vue') }, // Lazy loading
  { path: '/calendar', component: () => import('./src/views/Calendar.vue') }, // Lazy loading
  { path: '/login', component: () => import('./src/views/Login.vue') }, // Lazy loading
  { path: '/dashboard', component: () => import('./src/views/Dashboard.vue') }, // Lazy loading
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
