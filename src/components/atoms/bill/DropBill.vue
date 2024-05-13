<script setup>
import BillType from '../components/atoms/bill/BillType.vue';
import Dropdown from '../components/atoms/inputs/DropDown.vue';

const dropdownOptions = [
  '2', '3', '4', '5+', '10+'
];

const handleDropdownOptionSelected = (option) => {
  console.log('Selected dropdown option:', option);
};

const selectedOption = '1'; // Default placeholder value
</script>

<template>
  <div class="container">
    <Dropdown 
      :options="dropdownOptions" 
      @optionSelected="handleDropdownOptionSelected" 
      hasLabel
      label="Number of users"
      :placeholder="'1'"
      class="dropdown-width"
    />

    <BillType class="margin-bottom-16" />

  </div>
</template>

<style scoped>
.container {
  margin-bottom: 16px;
}

.margin-bottom-16 {
  margin-bottom: 16px;
}

.payment-methods {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.payment-method-label {
  margin-top: 20px;
  font-size: 16px;
  font-family: var(--font-body);
}

.dropdown-width {
  width: 100%;
}
</style>
