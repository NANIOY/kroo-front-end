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
  <NavBar />
  <div class="router">
    <div class="content">
      <TopNav v-if="!isDashboardRoute || $route.path !== '/dashboard'" />
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped>
.router {
  margin-left: 96px;
}

.content {
  margin-left: 48px;
}
</style>