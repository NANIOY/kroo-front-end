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
        <option value="" disabled selected hidden> {{ label }}</option>
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
  font-size: 16px;
}

select {
  width: 536px;
  height:48px;
  padding: 8px;
  border: 2px solid var(--black);
  border-radius: 4px;
  font-size: 20px;
}

option {
  color: var(--black);
}
  </style>
  