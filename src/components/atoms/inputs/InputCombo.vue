<!-- InputCombo.vue -->
<script setup>
import { ref } from 'vue';
import InputField from '../inputs/InputField.vue';
import Dropdown from '../inputs/DropDown.vue';
import LargeButton from '../buttons/LargeButton.vue';

// Define props
const props = defineProps({
    input1Label: {
        type: String,
        default: 'First Field'
    },
    input1Placeholder: {
        type: String,
        default: 'Enter text...'
    },
    input2Label: {
        type: String,
        default: 'Second Field'
    },
    input2Placeholder: {
        type: String,
        default: 'Enter text...'
    },
    dropdownOptions: {
        type: Array,
        default: () => []
    },
    showCounter: {
        type: Boolean,
        default: false
    },
    showDropdown: {
        type: Boolean,
        default: true
    }
});

// Data for the input fields and dropdown
const input1Value = ref('');
const input2Value = ref('');
</script>

<template>
    <div class="input-combo">
        <!-- First InputField -->
        <InputField v-model="input1Value" :label="props.input1Label" :placeholder="props.input1Placeholder" />

        <!-- Second InputField or Dropdown -->
        <component :is="props.showDropdown ? 'Dropdown' : 'InputField'" v-model="input2Value"
            :options="props.dropdownOptions" :label="props.input2Label" :placeholder="props.input2Placeholder"
            :counter="props.showCounter" />

        <!-- LargeButton -->
        <LargeButton label="Submit" :hasLabel="true" iconName="plus" :class="{ 'button--tertiary': true }" />
    </div>
</template>

<style scoped>
.input-combo {
    display: flex;
    flex-direction: column;
    gap: 10px;
}
</style>
