<script setup>
import { ref, defineProps } from 'vue';

const props = defineProps({
  label: String,
});

const options = ref(['Male', 'Female']);
const selectedOption = ref('');
const showDropdown = ref(false);

const selectOption = (option) => {
  selectedOption.value = option;
  showDropdown.value = false;
};
</script>

<template>
  <div class="dropdown-container">
    <label class="text-reg-normal">{{ label }}</label>
    <div class="custom-dropdown">
      <input v-model="selectedOption" @focus="showDropdown = true" @blur="showDropdown = false" type="text" class="text-reg-l dropdown-input" placeholder="Placeholder">
      <div v-if="showDropdown" class="dropdown-content">
        <div v-for="option in options" :key="option" @click="selectOption(option)">{{ option }}</div>
      </div>
    </div>
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
  