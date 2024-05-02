  <script setup>
  import { ref } from 'vue';
  
  const props = defineProps({
    method: Object
  });
  
  const isSelected = ref(false);
  
  const toggleSelection = () => {
    isSelected.value = !isSelected.value;
  };
  </script>

<template>
    <div
      class="payment-method"
      :class="{ 'selected': isSelected }"
      @click="toggleSelection"
    >
      <img :src="method.imageUrl" :alt="method.name" />
    </div>
  </template>
  
<style scoped>

</style>