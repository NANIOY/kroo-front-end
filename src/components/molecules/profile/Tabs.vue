<script setup>
import Tab from '../../atoms/profile/Tab.vue'
import { ref, defineEmits } from 'vue';

const activeTab = ref('About');
const emits = defineEmits(['update:activeTab']);

const changeTab = (newTab) => {
  activeTab.value = newTab;
  emits('update:activeTab', newTab);
};
</script>

<template>
    <div class="tabs">
      <Tab
        v-for="tab in ['About', 'Portfolio', 'Activity']"
        :key="tab"
        :label="tab"
        :isActive="activeTab === tab"
        @tabSelected="changeTab"
      />
    </div>
  </template>

<style scoped>
.tabs {
    display: flex;
    gap: 48px;
}
</style>