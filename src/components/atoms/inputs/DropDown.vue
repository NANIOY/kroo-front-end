<script setup>
import { ref, defineProps } from 'vue';

const props = defineProps({
  label: String,
});

const options = ref(['Male', 'Female']);
</script>

<template>
    <div>
      <label>{{ label }}</label>
      <select required>
        <option value="" disabled selected hidden>Choose {{ label }}...</option>
        <option v-for="option in options" :key="option">{{ option }}</option>
      </select>
    </div>
  </template>
  
  <style scoped>
  select:invalid {
    color: gray;
  }
  
  option {
    color: black;
  }
  </style>
  