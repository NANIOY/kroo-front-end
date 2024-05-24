<script setup>
import { ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import NavBar from './components/organisms/navigation/NavBar.vue';
import TopNav from './components/organisms/navigation/topNav/topNav.vue';
import TopNavDash from './components/organisms/navigation/topNav/topNavDash.vue';
import NavbarLogo from './components/organisms/navigation/NavbarLogo.vue';

const route = useRoute();
const isDashboardRoute = ref(route.path === '/dashboard');
const isUserProfileRoute = ref(/^\/user\/[^/]+$/.test(route.path));

watchEffect(() => {
  isDashboardRoute.value = route.path === '/dashboard';
  isUserProfileRoute.value = /^\/user\/[^/]+$/.test(route.path);
});
</script>

<template>
  <div>
    <NavBar
      v-if="!['/login', '/register', '/register/crew', '/register/crew/step-1', '/register/crew/step-2', '/register/crew/step-3', '/register/crew/step-4', '/register/crew/step-5', '/register/business', '/register/business/step-1', '/register/business/step-2', '/register/business/step-3', '/register/business/step-4', '/register/business/step-5', '/forgot-password'].includes(route.path)"
      class="navbar" />
    <NavbarLogo
      v-if="['/login', '/register', '/register/crew', '/register/crew/step-1', '/register/crew/step-2', '/register/crew/step-3', '/register/crew/step-4', '/register/crew/step-5', '/register/business', '/register/business/step-1', '/register/business/step-2', '/register/business/step-3', '/register/business/step-4', '/register/business/step-5', '/forgot-password'].includes(route.path)" />
    <div class="router">
      <TopNav
        v-if="!['/login', '/register', '/register/crew', '/register/crew/step-1', '/register/crew/step-2', '/register/crew/step-3', '/register/crew/step-4', '/register/crew/step-5', '/register/business', '/register/business/step-1', '/register/business/step-2', '/register/business/step-3', '/register/business/step-4', '/register/business/step-5', '/forgot-password', '/dashboard', '/profile'].includes(route.path) && !isUserProfileRoute"
        :userId="userId" :func="func" :profileImage="profileImage" />
      <TopNavDash v-if="isDashboardRoute" :userId="userId" :func="func"
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
