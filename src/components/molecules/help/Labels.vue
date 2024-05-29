<script setup>
import InputField from '../../atoms/inputs/InputField.vue'

const searchInputConfig = {
    label: 'Search Label',
    placeholder: 'Type to search...'
};
</script>

<template>
  <div class="container">
    <InputField 
      :label="searchInputConfig.label" 
      :placeholder="searchInputConfig.placeholder" 
      :hasIconLeft="true"
      iconLeftName="Search" 
      class="searchfilter__input__field" 
    />
  </div>
</template>

<style scoped>
.container {
  display: flex;
  width: 192px;
  height: 344px;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  flex-shrink: 0;
}
</style>
