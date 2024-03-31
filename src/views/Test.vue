<script setup>
import DropFilter from '../components/molecules/filter/DropFilter.vue';

const checkboxConfigurations = [
  { 
    title: 'Checkbox Options', 
    checkboxLabels: ['Checkbox 1', 'Checkbox 2', 'Checkbox 3'] 
  }
];

const sliderConfigurations = [
];
</script>

<template>
  <div>
    <DropFilter :useSlider="false" :checkboxConfigurations="checkboxConfigurations" />
  </div>
</template>

<style scoped></style>