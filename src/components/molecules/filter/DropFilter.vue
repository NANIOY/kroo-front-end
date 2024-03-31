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
    <div v-for="(dropdown, index) in dropdowns" :key="index" class="dropdown">
      <button @click="toggleCheckboxDropdown(index)" class="dropdown-button">{{ dropdown.title }}</button>
      <div v-show="activeDropdown === index" class="dropdown-content">
        <!-- Pass label prop to Checkbox component -->
        <div v-for="(label, checkboxIndex) in dropdown.checkboxLabels" :key="checkboxIndex" class="checkbox-container">
          <Checkbox :label="label" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import Slider from '../../atoms/inputs/Slider.vue';
import Checkbox from '../../atoms/selectors/Checkbox.vue';

const showSliderDropdown = ref(false);
const activeDropdown = ref(null);
const dropdowns = ref([
  { title: 'Checkbox Options', numberOfCheckboxes: 3 },
  // Add more dropdown configurations as needed
]);
const checkboxLabels = ref([]);

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


watch(dropdowns, (newDropdowns) => {
  newDropdowns.forEach((dropdown) => {
    dropdown.checkboxLabels = generateCheckboxLabels(dropdown.numberOfCheckboxes);
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

<style scoped>
.dropdown-button {
  cursor: pointer;
  background: none;
  border: none;
  outline: none;
  font-size: 16px;
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
