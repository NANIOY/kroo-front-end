<script setup>
import InputField from '../inputs/InputField.vue';
import Dropdown from '../inputs/DropDown.vue';
import LargeButton from '../buttons/LargeButton.vue';

// Data for the first input field
const input1Label = 'First Field';
const input1Placeholder = 'Enter text...';
let input1Value = '';

// Data for the second input field or dropdown
const input2Label = 'Second Field';
const input2Placeholder = 'Enter text...';
let input2Value = '';

// Options for the dropdown
const dropdownOptions = ['Option 1', 'Option 2', 'Option 3'];

// Whether to show the counter on the second input field
const showCounter = false;

// Whether to show the dropdown instead of the second input field
const showDropdown = true;

</script>

<template>
 <div class="input-combo">
    <!-- First InputField -->
    <InputField
      v-model="input1Value"
      :label="input1Label"
      :placeholder="input1Placeholder"
    />
        <!-- Second InputField or Dropdown -->
        <component :is="showDropdown ? 'Dropdown' : 'InputField'"
               v-model="input2Value"
               :options="dropdownOptions"
               :label="input2Label"
               :placeholder="input2Placeholder"
               :counter="showCounter" />
<!-- LargeButton -->
<LargeButton
  label="Submit"
  :hasLabel="false"
  iconName="plus" 
  :class="{ 'button--tertiary': true }"
/>

  </div>
</template>

<style scoped>
.input-combo {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>