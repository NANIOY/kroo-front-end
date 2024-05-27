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
</script>

<template>
    <Overlay class="modal__overlay" v-if="isVisible" @overlayClick="closeModal">
        <div class="modal" @click.stop>
            <div class="button-icon-container">
                <div class="button-left">
                    <NormalButton :label="props.button1LabelNormal"
                        :class="{ 'button--secondary': !isButton2Secondary, 'button--tertiary': isButton2Secondary }"
                        @click="revertButton2Color" />
                    <NormalButton :label="props.button2LabelNormal"
                        :class="{ 'button--secondary': isButton2Secondary, 'button--tertiary': !isButton2Secondary }"
                        @click="toggleButton2Color" />
                </div>
                <div class="icon-container">
                    <TransparentButton :iconName="props.iconName" :hasLabel="false" :hasIcon="true" />
                </div>
            </div>
            <div class="input-dropdown-container">
                <div>
                    <label>{{ props.input1Label }}</label>
                    <InputField :label="props.input1Label" :placeholder="props.input1Placeholder" />
                </div>
                <div class="dropdown-container">
                    <label>{{ props.dropdown1Label }}</label>
                    <Dropdown :label="props.dropdown1Label" :options="props.dropdown1Options" />
                </div>
                <div>
                    <label>{{ props.input2Label }}</label>
                    <InputField :label="props.input2Label" :placeholder="props.input2Placeholder" />
                </div>
                <div class="dropdown-container">
                    <label>{{ props.dropdown2Label }}</label>
                    <Dropdown :label="props.dropdown2Label" :options="props.dropdown2Options" />
                </div>
                <div>
                    <label>{{ props.input3Label }}</label>
                    <InputField :label="props.input3Label" :placeholder="props.input3Placeholder" />
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