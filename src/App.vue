<script setup>
import { ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import NavBar from './components/organisms/navigation/NavBar.vue';
import TopNav from './components/organisms/navigation/topNav/topNav.vue';
import TopNavDash from './components/organisms/navigation/topNav/topNavDash.vue';
import NavbarLogo from './components/organisms/navigation/NavbarLogo.vue';

import BillType from './components/atoms/bill/BillType.vue';

const route = useRoute();
const isDashboardRoute = ref(route.path === '/dashboard');

const selectedBillingType = ref(null); 

watchEffect(() => {
  isDashboardRoute.value = route.path === '/dashboard';
});

// Define handleBillingTypeChange function
const handleBillingTypeChange = (newType) => {
  if (selectedBillingType.value !== null) {
    selectedBillingType.value = newType;
  }
};

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
        v-if="!['/login', '/register', '/register/crew', '/register/crew/step-1', '/register/crew/step-2', '/register/crew/step-3', '/register/crew/step-4', '/register/crew/step-5', '/register/business', '/register/business/step-1', '/register/business/step-2', '/register/business/step-3', '/register/business/step-4', '/register/business/step-5', '/forgot-password', '/dashboard', '/profile'].includes(route.path)"
        :userId="userId" :func="func" :profileImage="profileImage" />
      <TopNavDash v-if="['/dashboard'].includes(route.path)" :userId="userId" :func="func"
        :profileImage="profileImage" />
      <router-view></router-view>

      <!-- Configure BillType component -->
      <BillType
        v-if="['/dashboard'].includes(route.path)"
        billingOptionText="Billing Type"
        :billingType="selectedBillingType === null ? '' : selectedBillingType"
        :onBillingTypeChange="handleBillingTypeChange"
        :priceForMonthlyBilling="25"
        :priceForYearlyBilling="250" 
      />
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
