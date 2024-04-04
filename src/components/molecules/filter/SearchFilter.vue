<script setup>
import DropFilter from './DropFilter.vue';
import InputField from '../../atoms/inputs/InputField.vue';
import Dropdown from '../../atoms/inputs/DropDown.vue'; // Corrected import name

// Define configurations for each component
const timeConfig = { 
  title: 'Time', 
  numberOfCheckboxes: 4, 
  hasMore: false, 
  checkboxLabels: ['Only show when I"m available', 'Morning', 'Evening', 'Night'] 
};

const distanceConfig = { 
  title: 'Distance (km)', 
  useSlider: true
};

const functionConfig = { 
  title: 'Function', 
  numberOfCheckboxes: 3, 
  hasMore: true, 
  checkboxLabels: ['Production assistant', 'Gaffer', 'Director assistant'] 
};

const urgencyConfig = { 
  title: 'Urgency', 
  numberOfCheckboxes: 3, 
  hasMore: true, 
  checkboxLabels: ['Urgent', 'Semi-urgent', 'Not urgent'] 
};

const productionTypeConfig = { 
  title: 'Production Type', 
  numberOfCheckboxes: 3, 
  hasMore: true, 
  checkboxLabels: [' Feature film', 'Television', 'Commercial'] 
};

// Configuration for dropdown
const searchDropdownConfig = {
  label: ' ',
  placeholder: 'Sort by',
};

// Configuration for input field
const searchInputConfig = {
  label: 'Search',
  placeholder: 'Enter your search query',
};
</script>

<template>
  <div>

      <!-- Input field -->
      <InputField :label="searchInputConfig.label" :placeholder="searchInputConfig.placeholder" />

    <!-- Input field for dropdown -->
    <Dropdown :label="searchDropdownConfig.label" :placeholder="searchDropdownConfig.placeholder" :options="searchDropdownConfig.options" />

    <!-- Dropdown menu for "Time" -->
    <DropFilter :useSlider="false" :dropdowns="[timeConfig]" />

    <!-- Slider Dropdown for "Distance (km)" -->
    <DropFilter :useSlider="distanceConfig.useSlider" :dropdowns="[distanceConfig]" />

    <!-- Dropdown menu for "Function" -->
    <DropFilter :useSlider="false" :dropdowns="[functionConfig]" />

    <!-- Dropdown menu for "Urgency" -->
    <DropFilter :useSlider="false" :dropdowns="[urgencyConfig]" />

    <!-- Dropdown menu for "Production type" -->
    <DropFilter :useSlider="false" :dropdowns="[productionTypeConfig]" />
  </div>
</template>

<style scoped>
/* Your scoped styles here */
</style>
