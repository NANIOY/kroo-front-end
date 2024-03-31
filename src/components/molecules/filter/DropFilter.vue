<template>
  <div class="drop-filter">
    <!-- Slider Dropdown -->
    <div class="dropdown">
      <button @click="toggleSliderDropdown" class="dropdown-button">Slider Option</button>
      <div v-show="showSliderDropdown" class="dropdown-content">
        <Slider />
      </div>
    </div>

    <!-- Checkbox Dropdown -->
    <div class="dropdown">
      <button @click="toggleCheckboxDropdown" class="dropdown-button">{{ dropdownTitle }}</button>
      <div v-show="showCheckboxDropdown" class="dropdown-content">
        <!-- Pass label prop to Checkbox component -->
        <Checkbox v-for="(label, index) in checkboxLabels" :key="index" :label="label" />
      </div>
    </div>
  </div>
</template>
  
<script setup>
import { ref } from 'vue';
import Slider from '../../atoms/inputs/Slider.vue';
import Checkbox from '../../atoms/checkboxes/Checkbox.vue';

const showSliderDropdown = ref(false);
const showCheckboxDropdown = ref(false);
const numberOfCheckboxes = ref(3); // Default number of checkboxes
const checkboxLabels = ref(["Green", "Blue", "Red"]); // Default checkbox labels
const dropdownTitle = ref("Checkbox Options");

function toggleSliderDropdown() {
  showSliderDropdown.value = !showSliderDropdown.value;
}

function toggleCheckboxDropdown() {
  showCheckboxDropdown.value = !showCheckboxDropdown.value;
}
</script>
  
<style scoped>
.dropdown-button {
  cursor: pointer;
  background: none;
  border: none;
  outline: none;
  font-size: 16px;
}

.dropdown-content[v-show] {
  display: block;
}

/* Add margin between checkboxes */
.dropdown-content > div {
  margin-bottom: 8px; /* Adjust the value to increase or decrease spacing */
}
</style>
