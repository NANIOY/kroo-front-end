<script setup>
import Tool from '../../components/molecules/tools/Tool.vue';
import ButtonsNormal from '../../components/atoms/buttons/NormalButton.vue';
</script>

<template>
  <div>
    <div class="toolbar">
      <ButtonsNormal label="All" />
      <ButtonsNormal label="Agenda service" />
      <ButtonsNormal label="Communication" />
      <ButtonsNormal label="File storage" />
      <ButtonsNormal label="Presentation" />
      <ButtonsNormal label="Spreadsheets" />
      <ButtonsNormal label="Workplace" />
    </div>
    <div class="tools-container">
      <Tool toolName="Microsoft Teams" />
      <Tool toolName="Google Drive" />
      <Tool toolName="Microsoft OneDrive" />
      <Tool toolName="Zoom" />
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
</style>