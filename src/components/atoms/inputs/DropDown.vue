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
      <select v-model="selectedOption" @change="selectOption(selectedOption)" class="text-reg-l dropdown-select" required>
        <option value="" disabled selected hidden>Placeholder</option>
        <option v-for="option in options" :key="option" :value="option">{{ option }}</option>
      </select>
    </div>
  </div>
</template>


<style scoped>
select:invalid {
  color: gray;
}

.custom-dropdown{
  width:100%;
  display: inline-block;
}

.dropdown-container {
  margin-bottom: 10px;
  width: 392px;
}

.dropdown-content {
  width: 100%;
  border: 2px solid var(--black); 
  border-radius: 4px;
  margin-top: 4px;
}

.dropdown-option {
  padding-left: 16px;
  padding-right: 16px;
  height: 40px;
  line-height: 40px;
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