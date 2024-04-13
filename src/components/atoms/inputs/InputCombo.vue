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
    input1Placeholder: {
        type: String,
        default: 'Enter text...'
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
    },
    // Add default placeholder for the dropdown
    placeholder: {
        type: String,
        default: 'Select an option'
    },
});

// Data for the input fields and dropdown
const input1Value = ref('');
const input2Value = ref('');
const clickCount = ref(0);

const handleButtonClick = () => {
    // Increment the click count
    clickCount.value++;
};

// Define font size and weight for the counter
const counterFontWeight = 'bolder';
const counterFontSize = '16px'; 
</script>

<template>
    <div class="input-combo">
        <!-- Container for label and click counter -->
        <div class="label-container">
            <!-- Label -->
            <label class="label">{{ label }}</label>

            <!-- Optional text showing the button click count -->
            <span v-if="showCounter" class="click-count"
                :style="{ fontWeight: counterFontWeight, fontSize: counterFontSize }">{{ clickCount }} / #</span>
        </div>

        <!-- Container for input fields and button -->
        <div class="input-button-container">
            <!-- First InputField -->
            <InputField v-model="input1Value" :placeholder="input1Placeholder" class="custom-input" />

            <!-- Second InputField or Dropdown -->
            <template v-if="showDropdown">
                <DropDown v-model="input2Value" :placeholder="input2Placeholder" :options="dropdownOptions"
                    class="custom-input" />
            </template>
            <template v-else>
                <InputField v-model="input2Value" :placeholder="input2Placeholder" class="custom-input" />
            </template>

            <!-- LargeButton -->
            <LargeButton :label="buttonLabel" :iconName="buttonIcon" @click="handleButtonClick"
                class="button--tertiary custom-button" />
        </div>
    </div>
</template>

<style scoped>
.input-combo {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.input-button-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.custom-input {
    width: 204px;
}

.custom-button {
    width: 96px;
    outline: 2px solid var(--black);
    outline-offset: -2px;
}

.label-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 522px;
}

.click-count {
    font-size: var(--font-size);
    font-weight: var(--font-weight);
}
</style>