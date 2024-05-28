<template>
  <div>
    <div class="toolbar">
      <button class="button">Button 1</button>
      <button class="button">Button 2</button>
      <button class="button">Button 3</button>
      <button class="button">Button 4</button>
      <button class="button">Button 5</button>
      <button class="button">Button 6</button>
      <button class="button">Button 7</button>
    </div>
    <div class="tools-container">
      <Tool toolName="Microsoft Teams" />
      <Tool toolName="Google Drive" />
      <Tool toolName="Microsoft OneDrive" />
      <Tool toolName="Zoom" />
    </div>
  </div>
</template>

<script setup>
import Tool from '../../components/molecules/tools/Tool.vue'
</script>

<style scoped>
.toolbar {
  display: inline-flex;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 24px; /* Add margin to the bottom */
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
