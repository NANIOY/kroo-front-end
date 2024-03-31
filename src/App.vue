<template>
  <div>
    <NavBar />
    <div class="router">
      <TopNav v-if="!isDashboardRoute || $route.path !== '/dashboard'" name="John Smith" func="Gaffer" :profileImage="'https://placehold.co/56x56'"/>
      <router-view></router-view>
      <DropFilter :dropdowns="dropdownConfig" />
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import NavBar from './components/organisms/navigation/NavBar.vue';
import TopNav from './components/organisms/navigation/topNav/topNav.vue';
import DropFilter from './components/molecules/filter/DropFilter.vue';

const route = useRoute();
const isDashboardRoute = ref(route.path === '/dashboard');

watchEffect(() => {
  isDashboardRoute.value = route.path === '/dashboard';
});

// Example dropdown configuration
const dropdownConfig = ref([
  { title: 'Dropdown 1', numberOfCheckboxes: 4 },
  { title: 'Dropdown 2', numberOfCheckboxes: 3 },
  // Add more dropdown configurations as needed
]);
</script>

<style scoped>
.router {
  margin-left: 144px;
  margin-right: 56px;
}
</style>
