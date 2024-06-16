<script setup>
import { ref } from 'vue';

const items = [
  { label: 'Account', endpoint: '#account' },
  { label: 'Billing', endpoint: '#billing' },
  { label: 'Notifications', endpoint: '#notifications' },
  { label: 'Accessibility', endpoint: '#accessibility' }
];

const selectedItem = ref(3); 
</script>

<template>
  <div class="settings">
    <div class="button_container">
      <a v-for="(item, index) in items" :key="index" :href="item.endpoint"
        :class="{ 'button--selected': index === selectedItem }" class="button" @click="selectedItem = index">
        {{ item.label }}
      </a>
    </div>
  </div>
</template>

<style scoped>
.settings {
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
  transition: background-color 0.3s ease, color 0.3s ease;
  display: flex;
  justify-content: flex-start;
  text-decoration: none;
  color: black;
  font-size: 18px;
}

.button--selected {
  background-color: var(--blurple);
  color: var(--white);
}
</style>
