<script setup>
import { ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import NavBar from './components/organisms/navigation/NavBar.vue';
import TopNav from './components/organisms/navigation/topNav/topNav.vue';
import TopNavDash from './components/organisms/navigation/topNav/topNavDash.vue';
import NavbarLogo from './components/organisms/navigation/NavbarLogo.vue';

const route = useRoute();
const isDashboardRoute = ref(route.path === '/dashboard');

watchEffect(() => {
  isDashboardRoute.value = route.path === '/dashboard';
});
</script>

<template>
  <div>
    <NavBar v-if="!['/login', '/register'].includes(route.path)" class="navbar" />
    <NavbarLogo v-if="['/login', '/register'].includes(route.path)" />
    <div class="router">
      <TopNav v-if="!['/login', '/register', '/dashboard'].includes(route.path)" :userId="userId" :func="func"
        :profileImage="profileImage" />
      <TopNavDash v-if="['/dashboard'].includes(route.path)" :userId="userId" :func="func"
        :profileImage="profileImage" />
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped>
.router {
  margin-left: 144px;
  margin-right: 56px;
}

.navbar {
  z-index: 1000;
}
</style>