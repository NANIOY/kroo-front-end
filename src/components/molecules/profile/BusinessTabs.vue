<script setup>
import { ref, defineProps, defineEmits, watch } from 'vue';
import Tab from '../../atoms/profile/Tab.vue';
import NormalButton from '../../atoms/buttons/NormalButton.vue';

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

const tabs = ['About', 'Portfolio'];
const activeTabIndex = ref(0);

const setActiveTab = (index) => {
  activeTabIndex.value = index;
  emits('update:activeTab', tabs[index]);
};

const cycleTab = (direction) => {
  const newIndex = direction === 'next' ? activeTabIndex.value + 1 : activeTabIndex.value - 1;
  activeTabIndex.value = (newIndex + tabs.length) % tabs.length;
  emits('update:activeTab', tabs[activeTabIndex.value]);
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
    <!-- Show edit button only if the logged-in user is viewing their own profile -->
    <template v-if="isCurrentUserProfile">
      <NormalButton class="button--secondary tabcontainer__button" label="Edit" iconName="EditPencil"
        :hasRequest="false" redirect="/settings" />
    </template>
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