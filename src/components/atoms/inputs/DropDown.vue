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
  
  .dropdown-container {
  margin-bottom: 10px;
}

label {
  display: block;
  margin-bottom: 5px;
}

select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

option {
  color: black;
}
  </style>
  