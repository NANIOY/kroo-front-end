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
        <div v-for="(label, index) in numberOfCheckboxes" :key="index" class="checkbox-container">
          <Checkbox :label="checkboxLabels[index - 1]" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import Slider from '../../atoms/inputs/Slider.vue';
import Checkbox from '../../atoms/checkboxes/Checkbox.vue';

const showSliderDropdown = ref(false);
const showCheckboxDropdown = ref(false);
const numberOfCheckboxes = ref(null);
const checkboxLabels = ref([]);
const dropdownTitle = ref("Checkbox Options");

function toggleSliderDropdown() {
  showSliderDropdown.value = !showSliderDropdown.value;
  // Ensure checkbox dropdown is hidden when slider dropdown is toggled
  if (showSliderDropdown.value && showCheckboxDropdown.value) {
    showCheckboxDropdown.value = false;
  }
}

function toggleCheckboxDropdown() {
  showCheckboxDropdown.value = !showCheckboxDropdown.value;
  // Ensure slider dropdown is hidden when checkbox dropdown is toggled
  if (showCheckboxDropdown.value && showSliderDropdown.value) {
    showSliderDropdown.value = false;
  }
}

watch(numberOfCheckboxes, (newValue) => {
  if (newValue !== null) {
    checkboxLabels.value = generateCheckboxLabels(newValue);
  }
});

function generateCheckboxLabels(count) {
  const labels = [];
  for (let i = 1; i <= count; i++) {
    labels.push(`Checkbox ${i}`);
  }
  return labels;
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

.dropdown-content {
  display: none;
}

.dropdown-content.show {
  display: flex;
  flex-direction: column;
}

/* Add margin between each checkbox */
.checkbox-container {
  margin-top: 12px;
  margin-bottom: 36px;
}
</style>
