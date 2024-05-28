<script setup>
import { ref, computed } from 'vue';
import Tool from '../../components/molecules/tools/Tool.vue';
import ButtonsNormal from '../../components/atoms/buttons/NormalButton.vue';

const tools = [
  { toolName: "Discord", tags: ["COMMUNICATION"] },
  { toolName: "Microsoft Teams", tags: ["COMMUNICATION"] },
  { toolName: "Slack", tags: ["COMMUNICATION"] },
  { toolName: "Google Drive", tags: ["FILE STORAGE", "WORKPLACE"] },
  { toolName: "Notion", tags: ["WORKPLACE"] },
  { toolName: "Microsoft Outlook", tags: ["AGENDA SERVICE"] },
  { toolName: "Zoom", tags: ["COMMUNICATION"] },
  { toolName: "Microsoft OneDrive", tags: ["FILE STORAGE", "WORKPLACE"] },
  { toolName: "Trello", tags: ["WORKSPACE"] },
];

const selectedFilter = ref("All");

function setFilter(filter) {
  selectedFilter.value = filter;
}

const allFilters = computed(() => {
  const filters = ["Agenda service", "Communication", "File storage", "Presentation", "Spreadsheets", "Workplace"];
  return filters;
});

const filteredTools = computed(() => {
  if (selectedFilter.value === "All") {
    return tools;
  } else {
    const filter = selectedFilter.value.toLowerCase();
    return tools.filter(tool => tool.tags.map(tag => tag.toLowerCase()).includes(filter));
  }
});
</script>

<template>
  <div>
    <div class="toolbar">
      <ButtonsNormal label="All" class="button--primary" @click="setFilter('All')" />
      <ButtonsNormal v-for="filter in allFilters" :key="filter" :label="filter" class="button--tertiary"
        @click="setFilter(filter)" />
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
  margin-top: -24px;
  margin-bottom: 24px;
}

.tools-container {
  display: flex;
  width: 100%;
  align-items: center;
  align-content: center;
  gap: 24px 30px;
  flex-wrap: wrap;
  margin-bottom: 24px;
}

.normalButton {
  padding: 0px 32px;
}
</style>
