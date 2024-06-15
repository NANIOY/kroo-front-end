<script setup>
import InputField from '../../atoms/inputs/InputField.vue'
import { ref } from 'vue'

const searchInputConfig = {
  label: 'Search Label',
  placeholder: 'Type to search...'
};

const buttons = [
  { label: 'Getting started', endpoint: '/getting-started' },
  { label: 'Account', endpoint: '/account' },
  { label: 'Connecting tools', endpoint: '/connecting-tools' },
  { label: 'Purchases', endpoint: '/purchases' },
  { label: 'Report & feedback', endpoint: '/report-feedback' },
  { label: 'Privacy policy', endpoint: '/privacy-policy' },
];

const selectedButton = ref(0);
</script>

<template>
  <div class="labels">
    <InputField :label="searchInputConfig.label" :placeholder="searchInputConfig.placeholder" :hasIconLeft="true"
      iconLeftName="Search" class="labels__search-input" />
    <div class="button_container">
      <button v-for="(button, index) in buttons" :key="index" @click="selectedButton = index"
        :style="{ backgroundColor: index === selectedButton ? 'var(--blurple)' : 'transparent' }" class="button">
        {{ button.label }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.labels {
  display: flex;
  flex-direction: column;
  width: 192px;
  height: 344px;
  gap: 16px;
  flex-shrink: 0;
}

.button_container {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
}

.button {
  border: none;
  padding: 10px;
  text-align: left;
  width: 100%;
  cursor: pointer;
  background-color: transparent;
  transition: background-color 0.3s ease;
}

.button--selected {
  background-color: var(--blurple);
  color: var(--white);
}
</style>