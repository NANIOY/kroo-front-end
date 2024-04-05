<script setup>
import DropFilter from './DropFilter.vue';
import InputField from '../../atoms/inputs/InputField.vue';
import Dropdown from '../../atoms/inputs/DropDown.vue';

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

const searchDropdownConfig = {
  label: ' ',
  placeholder: 'Sort by',
};

const searchInputConfig = {
  label: 'Search',
  placeholder: 'Placeholder',
  width: '272px'
};
</script>

<template>
  <div class="searchfilter">

    <div class="searchfilter__inputs">
      <InputField :label="searchInputConfig.label" :placeholder="searchInputConfig.placeholder" :hasIconLeft="true"
        iconLeftName="Search" class="searchfilter__input__field" />
      <Dropdown :label="searchDropdownConfig.label" :placeholder="searchDropdownConfig.placeholder"
        :options="searchDropdownConfig.options" class="searchfilter__input__dropdown" />
    </div>

    <div class="searchfilter__filters">
      <DropFilter :useSlider="false" :dropdowns="[timeConfig]" />
      <DropFilter :useSlider="distanceConfig.useSlider" :dropdowns="[distanceConfig]" />
      <DropFilter :useSlider="false" :dropdowns="[functionConfig]" />
      <DropFilter :useSlider="false" :dropdowns="[urgencyConfig]" />
      <DropFilter :useSlider="false" :dropdowns="[productionTypeConfig]" />
    </div>
  </div>
</template>

<style scoped>
.searchfilter {
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 272px;
}

.searchfilter__inputs {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.searchfilter__input__dropdown {
  width: 100%;
}

.searchfilter__filters {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
</style>
