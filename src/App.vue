<script setup>
  import { useRoute } from 'vue-router';
  import NavBar from './components/organisms/navigation/NavBar.vue';
  import TopNav from './components/organisms/navigation/topNav/topNav.vue';

  const route = useRoute();
  const isDashboardRoute = route.path === '/dashboard';
</script>

<template>
  <NavBar />
  <div class="router">
    <div class="content">
      <TopNav v-if="!isDashboardRoute" />
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
