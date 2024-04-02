<template>
  <div>
    <NavBar />
    <div class="router">
      <TopNav v-if="!isDashboardRoute || $route.path !== '/dashboard'" name="John Smith" func="Gaffer"
        :profileImage="'https://placehold.co/56x56'" />
      <router-view></router-view>
    </div>
  </div>
</template>

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

<style scoped>
.router {
  margin-left: 144px;
  margin-right: 56px;
}
</style>
