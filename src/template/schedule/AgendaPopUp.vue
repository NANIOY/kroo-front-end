<script setup>
import { ref } from 'vue';
import NormalButton from '../../components/atoms/buttons/NormalButton.vue';
import { Xmark } from '@iconoir/vue';
import InputField from '../../components/atoms/inputs/InputField.vue';
import Dropdown from '../../components/atoms/inputs/DropDown.vue';

const button1Label = ref('Button 1');
const button2Label = ref('Button 2');
const input1Label = ref('Input 1');
const input2Label = ref('Input 2');
const input3Label = ref('Input 3');
const dropdown1Label = ref('Dropdown 1');
const dropdown1Options = ref(['Option 1', 'Option 2', 'Option 3']);
const dropdown2Label = ref('Dropdown 2');
const dropdown2Options = ref(['Option 1', 'Option 2', 'Option 3']); 
</script>

<template>
    <div class="backPlate">
        <div class="buttonicon-container">
            <div class="button-left">
                <NormalButton :label="button1Label" />
                <NormalButton :label="button2Label" />
            </div>
            <div class="input-dropdown-container">
                <div class="input-wrapper">
                    <label>{{ input1Label }}</label>
                    <InputField :label="input1Label" />
                </div>
                <div class="input-wrapper">
                    <label>{{ dropdown1Label }}</label>
                    <Dropdown :label="dropdown1Label" :options="dropdown1Options" />
                </div>
                <div class="input-wrapper">
                    <label>{{ input2Label }}</label>
                    <InputField :label="input2Label" />
                </div>
                <div class="input-wrapper">
                    <label>{{ dropdown2Label }}</label>
                    <Dropdown :label="dropdown2Label" :options="dropdown2Options" />
                </div>
                <div class="input-wrapper">
                    <label>{{ input3Label }}</label>
                    <InputField :label="input3Label" />
                </div>
            </div>
            <div class="icon-coontainer">
                <Xmark class="icon" />
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
    padding-top: 48px;
}

.button-left {
    display: flex;
    margin-left: 48px;
    gap: 12px;
}

.input-dropdown-container {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.input-wrapper {
    display: flex;
    flex-direction: column;
}

.icon-coontainer {
    display: flex;
    margin-right: 48px;
}

.icon {
    font-size: 24px;
}
</style>