<template>
  <div>
    <!-- Dropdown menu for "Time" -->
    <DropFilter :useSlider="false" :dropdowns="[timeConfig]" />

    <!-- Slider Dropdown for "Distance (km)" -->
    <DropFilter :useSlider="true" :sliderConfigurations="distanceConfig" />

    <!-- Dropdown menu for "Function" -->
    <DropFilter :useSlider="false" :dropdowns="[functionConfig]" />

    <!-- Dropdown menu for "Urgency" -->
    <DropFilter :useSlider="false" :dropdowns="[urgencyConfig]" />

    <!-- Dropdown menu for "Production type" -->
    <DropFilter :useSlider="false" :dropdowns="[productionTypeConfig]" />
  </div>
</template>

<script setup>
import DropFilter from '../components/molecules/filter/DropFilter.vue';

// Define configurations for each component
const timeConfig = { 
  title: 'Time', 
  numberOfCheckboxes: 1, 
  hasMore: false, 
  checkboxLabels: ['Label 1'] 
};

const distanceConfig = { title: 'Distance (km)', useSlider: true };

const functionConfig = { 
  title: 'Function', 
  numberOfCheckboxes: 4, 
  hasMore: true, 
  checkboxLabels: ['Label 1', 'Label 2', 'Label 3', 'Label 4'] 
};

const urgencyConfig = { 
  title: 'Urgency', 
  numberOfCheckboxes: 3, 
  hasMore: true, 
  checkboxLabels: ['High', 'Medium', 'Low'] 
};

const productionTypeConfig = { 
  title: 'Production Type', 
  numberOfCheckboxes: 5, 
  hasMore: true, 
  checkboxLabels: ['Type 1', 'Type 2', 'Type 3', 'Type 4', 'Type 5'] 
};
</script>

<style scoped>
/* Your scoped styles here */
</style>
