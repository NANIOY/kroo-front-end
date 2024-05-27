<script setup>
import { ref, defineProps, defineEmits } from 'vue';
import NormalButton from '../../atoms/buttons/NormalButton.vue';
import LargeButton from '../../atoms/buttons/LargeButton.vue';
import TransparentButton from '../../atoms/buttons/TransparentButton.vue';
import InputField from '../../atoms/inputs/InputField.vue';
import Dropdown from '../../atoms/inputs/DropDown.vue';
import Overlay from './Overlay.vue';
import DatePicker from '../../atoms/inputs/DatePicker';

const props = defineProps({
    isVisible: {
        type: Boolean,
        default: false,
    },
    iconName: String, // Define iconName prop
});

const emits = defineEmits(['close', 'submit']);

const isButton2Secondary = ref(false);

const toggleButton2Color = () => {
    isButton2Secondary.value = !isButton2Secondary.value;
};

const revertButton2Color = () => {
    isButton2Secondary.value = !isButton2Secondary.value;
};

const closeModal = () => {
    emits('close');
};

// Define options for the Priority dropdown
const priorityOptions = ['Low Priority', 'Medium Priority', 'High Priority'];

// Define modelValue for the DatePicker
const selectedDate = ref('');

// Event handler for updating the selected date
const updateSelectedDate = (date) => {
    selectedDate.value = date;
};
</script>

<template>
    <Overlay class="modal__overlay" v-if="isVisible" @overlayClick="closeModal">
        <div class="modal" @click.stop>
            <div class="button-icon-container">
                <div class="button-left">
                    <NormalButton label="Personal"
                        :class="{ 'button--secondary': !isButton2Secondary, 'button--tertiary': isButton2Secondary }"
                        @click="revertButton2Color" />
                    <NormalButton label="Professional"
                        :class="{ 'button--secondary': isButton2Secondary, 'button--tertiary': !isButton2Secondary }"
                        @click="toggleButton2Color" />
                </div>
                <div class="icon-container">
                    <TransparentButton :iconName="iconName" :hasLabel="false" :hasIcon="true" />
                </div>
            </div>
            <div class="input-dropdown-container">
                <div>
                    <InputField placeholder="Aa" :hasLabel="true" label="Title" />
                </div>
                <div class="datepicker-container">
                    <DatePicker :modelValue="selectedDate" @update:modelValue="updateSelectedDate" :hasLabel="true"
                        label="Date" />
                </div>
                <div>
                    <InputField placeholder="Ae" :hasLabel="true" label="Location" />
                </div>
                <div class="dropdown-container">
                    <Dropdown label="Priority" :options="priorityOptions" :hasLabel="true" />
                </div>
                <div>
                    <InputField placeholder="Aa" :hasLabel="true" label="Description" />
                </div>
            </div>
            <div class="large-button-container">
                <LargeButton label="Add" class="button--primary" />
            </div>
        </div>
    </Overlay>
</template>

<style scoped>
.modal {
    background-color: var(--white);
    color: var(--black);
    box-shadow: 0px 0px 16px 0 rgba(14, 15, 15, 0.04);
    padding: 48px;
    border-radius: 8px;
    width: 600px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 50%;
    transform: translateY(-50%);
    right: 64px;
    gap: 16px;
}

.button-icon-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.button-left {
    display: flex;
    gap: 12px;
}

.icon-container {
    margin-left: auto;
}

.input-dropdown-container {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: 24px;
}

.icon {
    font-size: 24px;
}

.dropdown-container {
    display: flex;
    flex-direction: column;
}

.large-button-container {
    display: flex;
    justify-content: center;
    margin-top: 32px;
}

.button--secondary,
.button--tertiary {
    padding: 0px 12px;
}
</style>