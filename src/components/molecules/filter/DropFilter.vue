<script setup>
import { ref } from 'vue';
import Slider from '../../atoms/inputs/Slider.vue';

const showSliderDropdown = ref(false);

function toggleSliderDropdown() {
  showSliderDropdown.value = !showSliderDropdown.value;
}
</script>

<template>
  <div class="drop-filter">
    <!-- Slider Dropdown -->
    <div class="dropdown">
      <button @click="toggleSliderDropdown" class="dropdown-button">Slider Option</button>
      <div v-show="showSliderDropdown" class="dropdown-content">
        <Slider />
      </div>
    </div>
  </div>
</template>

<style scoped>
.dropdown-button {
  cursor: pointer;
  background: none;
  border: none;
  outline: none;
  font-size: 16px;
}

.dropdown-content[v-show] {
  display: block;
}
</style>
