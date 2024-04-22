<script setup>
import { ref, defineProps } from 'vue';
import InputField from '../inputs/InputField.vue';
import DropDown from '../inputs/DropDown.vue';
import LargeButton from '../buttons/LargeButton.vue';

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
    placeholder: {
        type: String,
        default: 'Select an option'
    },
});

const clickCount = ref(0);

const handleButtonClick = () => {
    clickCount.value++;
};

const counterFontWeight = 'bolder';
const counterFontSize = '16px'; 
</script>

<template>
    <div class="input-combo">
        <div class="label-container">
            <label class="label">{{ label }}</label>

            <span v-if="showCounter" class="click-count"
                :style="{ fontWeight: counterFontWeight, fontSize: counterFontSize }">{{ clickCount }} / #</span>
        </div>

        <div class="input-button-container">
            <InputField v-model="input1Value" :placeholder="input1Placeholder" class="custom-input" />

            <template v-if="showDropdown">
                <DropDown v-model="input2Value" :placeholder="input2Placeholder" :options="dropdownOptions"
                    class="custom-input" />
            </template>
            <template v-else>
                <InputField v-model="input2Value" :placeholder="input2Placeholder" class="custom-input" />
            </template>

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