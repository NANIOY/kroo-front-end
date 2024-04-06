<script setup>
import { ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import NavBar from './components/organisms/navigation/NavBar.vue';
import TopNav from './components/organisms/navigation/topNav/topNav.vue';

const route = useRoute();
const isDashboardRoute = ref(route.path === '/dashboard');

watchEffect(() => {
  isDashboardRoute.value = route.path === '/dashboard';
});
</script>

<template>
  <div>
    <NavBar class="navbar" />
    <div class="router">
      <TopNav v-if="!isDashboardRoute || $route.path !== '/dashboard'" :userId="userId" :func="func"
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