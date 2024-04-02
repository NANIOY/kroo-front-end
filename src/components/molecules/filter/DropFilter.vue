<script setup>
import { ref, watch, defineProps } from 'vue';
import Slider from '../../atoms/inputs/Slider.vue';
import Checkbox from '../../atoms/selectors/Checkbox.vue';
import { NavArrowDown, Search } from '@iconoir/vue';

const { useSlider, dropdowns, sliderConfigurations } = defineProps(['useSlider', 'dropdowns', 'sliderConfigurations']);

const showSliderDropdown = ref(false);
const activeDropdown = ref(null);

function toggleSliderDropdown() {
  showSliderDropdown.value = !showSliderDropdown.value;
  // Hide all checkbox dropdowns when slider dropdown is toggled
  activeDropdown.value = null;
}

function toggleCheckboxDropdown(index) {
  if (activeDropdown.value === index) {
    activeDropdown.value = null;
  } else {
    activeDropdown.value = index;
  }
}

watch(dropdowns, (newDropdowns) => {
  newDropdowns.forEach((config) => {
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
        <button @click="toggleSliderDropdown" class="dropdown-button">
          Slider Option
          <NavArrowDown :class="{ 'rotate': showSliderDropdown }" class="arrow-icon" />
        </button>
        <div :class="{ 'dropdown-content': true, 'show': showSliderDropdown, 'slide-down-enter': showSliderDropdown }"
          ref="sliderDropdown">
          <Slider />
        </div>
      </div>
    </div>

    <!-- Checkbox Dropdown -->
    <div v-else v-for="(dropdown, index) in dropdowns" :key="index" class="dropdown">
      <div class="dropdown-container">
        <button @click="toggleCheckboxDropdown(index)"
          :class="{ 'dropdown-button': true, 'expanded': activeDropdown === index }">
          {{ dropdown.title }}
          <NavArrowDown :class="{ 'rotate': activeDropdown === index }" class="arrow-icon" />
        </button>
        <div
          :class="{ 'dropdown-content': true, 'show': activeDropdown === index, 'slide-down-enter': activeDropdown === index }"
          ref="checkboxDropdown">
          <!-- Rendering checkboxes using Checkbox component -->
          <div v-for="(label, checkboxIndex) in dropdown.checkboxLabels" :key="checkboxIndex"
            class="checkbox-container">
            <Checkbox :label="label" />
          </div>
          <!-- Render "More" option if hasMore prop is true -->
          <div v-if="dropdown.hasMore" class="checkbox-container">
            <button class="more-button" @click="handleMoreClick">
              <Search class="search-icon" />
              <span class="more-text">More</span>

            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dropdown-content {
  display: none;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
}

.show {
  display: block;
  opacity: 1;
}

.slide-down-enter {
  animation: slideDown 0.3s;
}

@keyframes slideDown {
  0% {
    transform: translateY(-5%);
  }

  100% {
    transform: translateY(0);
  }
}

.rotate {
  transform: rotate(180deg);
}

button {
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

.arrow-icon {
  margin-left: auto;
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

.checkbox-container {
  display: flex;
  align-items: center;
}

.dropdown-button {
  cursor: pointer;
  border-bottom: 2px solid var(--neutral-80);
  padding: 10px;
  padding-left: 2px;
  padding-bottom: 2px;
  background-color: transparent;
  border-radius: 0px;
}

.dropdown-content {
  padding: 10px;
}

.search-icon {
  color: var(--blurple);
  stroke-width: 3px;
  height: 16px;
  width: 16px;
}

.more-button {
  display: flex;
  align-items: center;
  text-align: center;
  background-color: transparent;
}

.more-text {
  color: var(--blurple);
  font-weight: bold;
  font-size: 16px;
  margin-top: 5px;
}
</style>
