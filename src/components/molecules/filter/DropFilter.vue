<script setup>
import { defineProps } from 'vue';
import DropDown from '../../atoms/inputs/DropDown.vue';
import Checkbox from '../../atoms/checkboxes/Checkbox.vue';
import Slider from '../../atoms/inputs/Slider.vue'; 

const props = defineProps({
  numberOfCheckboxes: Number,
});
</script>

<template>
  <div class="drop-filter">
    <!-- Checkbox Dropdown -->
    <DropDown label="Checkbox Options">
      <Checkbox :number-of-checkboxes="numberOfCheckboxes" />
    </DropDown>

    <!-- Slider Dropdown -->
    <DropDown label="Slider Option">
      <Slider />
    </DropDown>
  </div>
</template>

<style scoped>
/* Your scoped styles here */
</style>
