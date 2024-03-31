<script setup>
import { ref, watch, defineProps } from 'vue';
import Slider from '../../atoms/inputs/Slider.vue';
import Checkbox from '../../atoms/selectors/Checkbox.vue';

const { useSlider, checkboxConfigurations, sliderConfigurations } = defineProps(['useSlider', 'checkboxConfigurations', 'sliderConfigurations']);

const showSliderDropdown = ref(false);
const activeDropdown = ref(null);

function toggleSliderDropdown() {
  showSliderDropdown.value = !showSliderDropdown.value;
  // Hide all checkbox dropdowns when slider dropdown is toggled
  activeDropdown.value = null;
}

function toggleCheckboxDropdown(index) {
  console.log("Toggling dropdown:", index);
  console.log("Before toggle:", activeDropdown.value);

  if (activeDropdown.value === index) {
    activeDropdown.value = null;
  } else {
    activeDropdown.value = index;
  }

  console.log("After toggle:", activeDropdown.value);
}

watch(checkboxConfigurations, (newCheckboxConfigurations) => {
  newCheckboxConfigurations.forEach((config) => {
    config.checkboxLabels = generateCheckboxLabels(config.numberOfCheckboxes);
  });
});

function generateCheckboxLabels(count) {
  const labels = [];
  for (let i = 1; i <= count; i++) {
    labels.push(`Checkbox ${i}`);
  }
  return labels;
}
</script>

<template>
  <div class="drop-filter">
    <!-- Slider Dropdown -->
    <div v-if="useSlider" class="dropdown">
      <div class="dropdown-container">
        <button @click="toggleSliderDropdown" class="dropdown-button">Slider Option</button>
        <div v-show="showSliderDropdown" class="dropdown-content">
          <Slider />
        </div>
      </div>
    </div>

    <!-- Checkbox Dropdown -->
    <div v-else v-for="(dropdown, index) in checkboxConfigurations" :key="index" class="dropdown">
      <div class="dropdown-container">
        <button @click="toggleCheckboxDropdown(index)" class="dropdown-button">{{ dropdown.title }}</button>
        <div v-show="activeDropdown === index" class="dropdown-content">
          <!-- Rendering checkboxes using Checkbox component -->
          <div v-for="(label, checkboxIndex) in dropdown.checkboxLabels" :key="checkboxIndex" class="checkbox-container">
            <Checkbox :label="label" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.drop-filter {
  width: 272px;
}

.dropdown {
  margin-bottom: 20px;
}

.dropdown-container {
  display: flex;
  flex-direction: column;
}

.dropdown-button {
  cursor: pointer;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  padding: 10px;
}

.dropdown-content {
  display: none;
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 10px;
}

.dropdown-container:hover .dropdown-content {
  display: flex;
  flex-direction: column;
}
</style>
