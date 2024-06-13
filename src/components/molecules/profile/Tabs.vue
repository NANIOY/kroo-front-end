<script setup>
import { ref, defineProps, defineEmits, watch } from 'vue';
import Tab from '../../atoms/profile/Tab.vue';

const props = defineProps({
  currentUser: {
    type: Object,
    required: true
  },
  isCurrentUserProfile: {
    type: Boolean,
    required: true
  }
});

const emits = defineEmits(['update:activeTab']);

const tabs = ['About', 'Portfolio', 'Activity'];
const activeTabIndex = ref(0);

const setActiveTab = (index) => {
  activeTabIndex.value = index;
  emits('update:activeTab', tabs[index]);
};

watch(activeTabIndex, (newIndex) => {
  emits('update:activeTab', tabs[newIndex]);
});
</script>

<template>
  <div class="tabcontainer">
    <div class="tabcontainer__tabs">
      <Tab v-for="(tab, index) in tabs" :key="tab" :label="tab" :isActive="index === activeTabIndex"
        @tabSelected="setActiveTab(index)" />
    </div>
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