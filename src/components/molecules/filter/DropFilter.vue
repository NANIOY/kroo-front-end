<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  numberOfCheckboxes: Number,
});
</script>

<template>
    <div class="drop-filter">
      <div v-if="numberOfCheckboxes > 0"> <!-- Display checkboxes -->
        <label v-for="(checkbox, index) in numberOfCheckboxes" :key="index" class="checkbox">
          <input type="checkbox">
          <span class="checkbox-label">Checkbox {{ index + 1 }}</span>
        </label>
      </div>
    </div>
  </template>
  

<style scoped>

</style>