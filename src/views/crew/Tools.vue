<script setup>
import Tool from '../../components/molecules/tools/Tool.vue';
import ButtonsNormal from '../../components/atoms/buttons/NormalButton.vue';

import { ref, computed } from 'vue';

const tools = [
  { toolName: "Microsoft Teams", tagText: "COMMUNICATION" },
  { toolName: "Google Drive", tagText: "FILE STORAGE" },
  { toolName: "Microsoft OneDrive", tagText: "FILE STORAGE" },
  { toolName: "Zoom", tagText: "COMMUNICATION" }
];

const selectedFilter = ref("All");

function setFilter(filter) {
  selectedFilter.value = filter;
}

const filteredTools = computed(() => {
  if (selectedFilter.value === "All") {
    return tools;
  } else {
    const filter = selectedFilter.value.toLowerCase();
    return tools.filter(tool => tool.tagText.toLowerCase() === filter);
  }
});
</script>

<template>
  <div>
    <div class="toolbar">
      <ButtonsNormal label="All" class="button--primary" @click="setFilter('All')" />
      <ButtonsNormal label="Agenda service" class="button--tertiary" @click="setFilter('Agenda service')" />
      <ButtonsNormal label="Communication" class="button--tertiary" @click="setFilter('Communication')" />
      <ButtonsNormal label="File storage" class="button--tertiary" @click="setFilter('File storage')" />
      <ButtonsNormal label="Presentation" class="button--tertiary" @click="setFilter('Presentation')" />
      <ButtonsNormal label="Spreadsheets" class="button--tertiary" @click="setFilter('Spreadsheets')" />
      <ButtonsNormal label="Workplace" class="button--tertiary" @click="setFilter('Workplace')" />
    </div>
    <div class="tools-container">
      <Tool v-for="tool in filteredTools" :key="tool.toolName" :toolName="tool.toolName" />
    </div>
  </div>
</template>

<style scoped>
.toolbar {
  display: inline-flex;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 24px;
}

.tools-container {
  display: flex;
  width: 100%;
  align-items: center;
  align-content: center;
  gap: 24px 30px;
  flex-wrap: wrap;
}

.normalButton {
  padding: 0px 32px;
}
</style>