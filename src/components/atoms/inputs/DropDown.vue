<script setup>
import { ref, defineProps } from 'vue';

const props = defineProps({
  label: String,
});

const options = ref(['Male', 'Female']);
</script>

<template>
    <div>
      <label class="text-reg-normal">{{ label }}</label>
      <select required  class="text-reg-l">
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
}

select {
  width: 536px;
  height:48px;
  padding: 8px;
  border: 2px solid var(--black);
  border-radius: 4px;
}

option {
  color: var(--black);
}

.text-reg-l {
  font-size: 20px;
}

.text-reg-normal{
    font-size: 16px;
  }
  </style>
  