<script setup>
import { defineProps } from 'vue';
import NormalButton from '../../components/atoms/buttons/NormalButton.vue';
import LargeButton from '../../components/atoms/buttons/LargeButton.vue';
import { Xmark } from '@iconoir/vue';
import InputField from '../../components/atoms/inputs/InputField.vue';
import Dropdown from '../../components/atoms/inputs/DropDown.vue';

const props = defineProps({
    button1LabelNormal: String,
    button2LabelNormal: String,
    button1LabelLarge: String,
    input1Label: String,
    input2Label: String,
    input3Label: String,
    dropdown1Label: String,
    dropdown1Options: Array,
    dropdown2Label: String,
    dropdown2Options: Array
});
</script>

<template>
    <div class="backPlate">
        <div class="buttonicon-container">
            <div class="button-left">
                <NormalButton :label="props.button1LabelNormal" />
                <NormalButton :label="props.button2LabelNormal" />
            </div>
            <div class="icon-container">
                <Xmark class="icon" />
            </div>
        </div>
        <div class="input-dropdown-container">
            <div>
                <label>{{ props.input1Label }}</label>
                <InputField :label="props.input1Label" />
            </div>
            <div class="dropdown-container">
                <label>{{ props.dropdown1Label }}</label>
                <Dropdown :label="props.dropdown1Label" :options="props.dropdown1Options" />
            </div>
            <div>
                <label>{{ props.input2Label }}</label>
                <InputField :label="props.input2Label" />
            </div>
            <div class="dropdown-container">
                <label>{{ props.dropdown2Label }}</label>
                <Dropdown :label="props.dropdown2Label" :options="props.dropdown2Options" />
            </div>
            <div>
                <label>{{ props.input3Label }}</label>
                <InputField :label="props.input3Label" />
            </div>
            <div class="large-button-container">
                <LargeButton :label="props.button1LabelLarge" />
            </div>
        </div>
    </div>
</template>

<style>
.backPlate {
    width: 600px;
    height: 674px;
    background-color: var(--white);
    border-radius: 8px;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}

.buttonicon-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 48px 48px 0;
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
    margin-left: 48px;
    margin-right: 48px;
}

.icon {
    font-size: 24px;
}

.dropdown-container {
    display: flex;
    flex-direction: column;
}
</style>