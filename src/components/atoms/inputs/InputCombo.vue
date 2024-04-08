<script setup>
import { ref, defineProps } from 'vue';
import InputField from '../inputs/InputField.vue';
import DropDown from '../inputs/DropDown.vue';
import LargeButton from '../buttons/LargeButton.vue';

// Define props
const props = defineProps({
    label: {
        type: String,
        default: 'Label'
    },
    input1Label: {
        type: String,
        default: 'InputField 1'
    },
    input1Placeholder: {
        type: String,
        default: 'Enter text...'
    },
    input2Label: {
        type: String,
        default: 'InputField 2 or Dropdown 1'
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
    },
    buttonLabel: {
        type: String,
        default: 'Submit'
    },
    buttonIcon: {
        type: String,
        default: 'plus'
    }
});

// Data for the input fields and dropdown
const input1Value = ref('');
const input2Value = ref('');

const handleSubmit = () => {
    // Handle submit logic here
    console.log('Submit clicked!');
};
</script>

<template>
    <div class="input-combo">
        <!-- Label -->
        <label>{{ label }}</label>

        <!-- Container for input fields and button -->
        <div class="input-button-container">
            <!-- First InputField -->
            <InputField v-model="input1Value" :label="input1Label" :placeholder="input1Placeholder" />

            <!-- Second InputField or Dropdown -->
            <template v-if="showDropdown">
                <DropDown v-model="input2Value" :label="input2Label" :placeholder="input2Placeholder"
                    :options="dropdownOptions" />
            </template>
            <template v-else>
                <InputField v-model="input2Value" :label="input2Label" :placeholder="input2Placeholder" />
            </template>

            <!-- LargeButton -->
            <LargeButton :label="buttonLabel" :hasLabel="true" :iconName="buttonIcon" :counter="showCounter"
                @click="handleSubmit" />
        </div>
    </div>
</template>

<style scoped>
.input-combo {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.input-button-container {
    display: flex;
    gap: 10px;
    align-items: center;
}

.input-wrapper {
    display: flex;
    gap: 10px;
}
</style>
