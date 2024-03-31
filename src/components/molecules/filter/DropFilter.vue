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

button{
border: none;
    text-decoration: none;
    font-size: 16px;
    display: flex;
    gap: 6px;
    font-weight: bold;
    line-height: 100%;
    cursor: pointer;
    justify-content: flex-start;
}

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
  border-bottom: 2px solid var(--neutral-80);
  padding: 10px;
  padding-left: 2px;
  padding-bottom: 2px;
  background-color: transparent ;
  border-radius: 0px;
}

.dropdown-content {
  display: none;
  padding: 10px;
}

.dropdown-container:hover .dropdown-content {
  display: flex;
  flex-direction: column;
}
</style>
