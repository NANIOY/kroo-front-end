<script setup>
const BillingType = {
  MONTHLY: 'monthly',
  YEARLY: 'yearly',
};

const selectedBillingType = ref(BillingType.MONTHLY); // Set monthly as default

const handleBillingTypeChange = (newType) => {
  selectedBillingType.value = newType;
};

</script>

<template>

</template>

<style scoped>

</style>