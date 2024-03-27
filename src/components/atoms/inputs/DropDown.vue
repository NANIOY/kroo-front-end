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
      <input v-model="selectedOption" @focus="showDropdown = true" @blur="showDropdown = false" type="text"
        class="text-reg-l dropdown-input" placeholder="Placeholder">
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

.dropdown-input {
  width: 392px;
  height: 48px;
  border: 2px solid var(--black);
  border-radius: 4px;
  /* arrow down inside the input field */
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>');
  background-repeat: no-repeat;
  background-position: right 15px center;
  background-size: 16px 16px;
  padding-left: 12px;
}

.dropdown-content div {
  padding: 8px;
  cursor: pointer;
}

.dropdown-input:focus {
  border-color: var(--blurple-50);
  outline: none;
}

label {
  display: block;
  margin-bottom: 5px;
  font-size: 16px;
}

select {
  width: 536px;
  height: 48px;
  padding: 8px;
  border: 2px solid var(--black);
  border-radius: 4px;
  font-size: 20px;
}

option {
  color: var(--black);
}
</style>