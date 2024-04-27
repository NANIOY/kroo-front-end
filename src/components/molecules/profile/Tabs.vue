<script setup>
import { ref, defineEmits } from 'vue';
import Tab from '../../atoms/profile/Tab.vue'
import NormalButton from '../../atoms/buttons/NormalButton.vue'

const activeTab = ref('About');
const emits = defineEmits(['update:activeTab']);

const changeTab = (newTab) => {
  activeTab.value = newTab;
  emits('update:activeTab', newTab);
};
</script>

<template>
  <div class="tabcontainer">
    <div class="tabcontainer__tabs">
      <Tab v-for="tab in ['About', 'Portfolio', 'Activity']" :key="tab" :label="tab" :isActive="activeTab === tab"
        @tabSelected="changeTab" />
    </div>
    <NormalButton class="button--secondary tabcontainer__button" label="Edit" iconName="EditPencil" :hasRequest=false redirect="/settings"/>
  </div>
</template>

<style scoped>
.tabcontainer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.tabcontainer__tabs {
  display: flex;
  gap: 48px;
}

.tabcontainer__button {
  width: 96px;
}
</style>