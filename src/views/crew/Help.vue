<script setup>
import HelpList from '../../components/molecules/help/HelpList.vue';
import Labels from '../../components/molecules/help/Labels.vue';

// First set of data
const customDropdownItems = [
  { label: 'Dropdown A', textOptions: 'Option A' },
  { label: 'Dropdown B', textOptions: 'Option B' },
  { label: 'Dropdown A', textOptions: 'Option A' },
  { label: 'Dropdown B', textOptions: 'Option B' },
  { label: 'Dropdown B', textOptions: 'Option B' },
];
const titleLabel = 'Getting started';

// Second set of data (custom)
const customDropdownItems2 = [
  { label: 'Custom Dropdown 1', textOptions: 'Custom Option A' },
  { label: 'Custom Dropdown 2', textOptions: 'Custom Option B' },
  { label: 'Custom Dropdown 3', textOptions: 'Custom Option C' },
  { label: 'Custom Dropdown 4', textOptions: 'Custom Option D' },
  { label: 'Custom Dropdown 5', textOptions: 'Custom Option E' },
];
const customTitleLabel = 'Account';

// Third set of data
const customDropdownItems3 = [
  { label: 'Third Dropdown 1', textOptions: 'Third Option A' },
  { label: 'Third Dropdown 2', textOptions: 'Third Option B' },
  { label: 'Third Dropdown 3', textOptions: 'Third Option C' },
  { label: 'Third Dropdown 4', textOptions: 'Third Option D' },
  { label: 'Third Dropdown 5', textOptions: 'Third Option E' },
];
const thirdTitleLabel = 'Connecting tools';
</script>

<template>
  <div class="main-container">
    <div class="side-by-side-container">
      <Labels />
      <div class="section-container">
        <HelpList :titleLabel="titleLabel" :dropdownItems="customDropdownItems" />
        <HelpList :titleLabel="customTitleLabel" :dropdownItems="customDropdownItems2" />
        <HelpList :titleLabel="thirdTitleLabel" :dropdownItems="customDropdownItems3" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.main-container {
  display: flex;
  flex-direction: column;
  width: 1440px;
  align-items: flex-start;
  gap: 80px;
}

.side-by-side-container {
  display: flex;
  align-items: flex-start;
  gap: 80px;
  width: 100%;
}

.side-by-side-container> :first-child {
  flex-shrink: 0;
  width: 200px;
}

.section-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 48px;
  width: 100%;
  height: 870px;
  flex: 1 0 0;
}
</style>