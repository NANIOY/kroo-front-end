<script setup>
import { ref, defineProps, defineEmits, onMounted } from 'vue';
import NormalButton from '../../atoms/buttons/NormalButton.vue';
import LargeButton from '../../atoms/buttons/LargeButton.vue';
import TransparentButton from '../../atoms/buttons/TransparentButton.vue';
import InputField from '../../atoms/inputs/InputField.vue';
import Dropdown from '../../atoms/inputs/DropDown.vue';
import Overlay from './Overlay.vue';

const props = defineProps({
    isVisible: {
        type: Boolean,
        default: false,
    },
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

// Define static text for labels and placeholders
const Label1 = "Title";
const Placeholder1 = "Aa";
const Label2 = "Label 2";
const Placeholder2 = "Placeholder for Input 2";
const Label3 = "Label 3";
const Placeholder3 = "Placeholder for Input 3";
const DropdownLabel1 = "Date";
const DropdownLabel2 = "Dropdown Label 2";
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
                    <TransparentButton :iconName="props.iconName" :hasLabel="false" :hasIcon="true" />
                </div>
            </div>
            <div class="input-dropdown-container">
                <div>
                    <label>{{ Label1 }}</label>
                    <InputField :placeholder="Placeholder1" />
                </div>
                <div class="dropdown-container">
                    <label>{{ DropdownLabel1 }}</label>
                    <Dropdown :label="DropdownLabel1" />
                </div>
                <div>
                    <label>{{ Label2 }}</label>
                    <InputField :placeholder="Placeholder2" />
                </div>
                <div class="dropdown-container">
                    <label>{{ DropdownLabel2 }}</label>
                    <Dropdown :label="DropdownLabel2" />
                </div>
                <div>
                    <label>{{ Label3 }}</label>
                    <InputField :placeholder="Placeholder3" />
                </div>
            </div>
            <div class="large-button-container">
                <LargeButton :label="props.button1LabelLarge" class="button--primary" />
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
    margin-top: 32px;
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
    margin-top: 48px;
}

.button--tertiary {
    outline: 2px solid var(--black);
}
</style>