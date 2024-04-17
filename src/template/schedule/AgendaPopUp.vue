<script setup>
import { ref } from 'vue';
import NormalButton from '../../components/atoms/buttons/NormalButton.vue';
import { Xmark } from '@iconoir/vue';
import InputField from '../../components/atoms/inputs/InputField.vue';
import Dropdown from '../../components/atoms/inputs/DropDown.vue';

// Define props to receive dynamic values from App.vue
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
            <div class="icon-container">
                <Xmark class="icon" />
            </div>
        </div>
        <div class="input-dropdown-container">
            <div>
                <label>{{ input1Label }}</label>
                <InputField :label="input1Label" />
            </div>
            <div class="dropdown-container">
                <label>{{ dropdown1Label }}</label>
                <Dropdown :label="dropdown1Label" :options="dropdown1Options" />
            </div>
            <div>
                <label>{{ input2Label }}</label>
                <InputField :label="input2Label" />
            </div>
            <div class="dropdown-container">
                <label>{{ dropdown2Label }}</label>
                <Dropdown :label="dropdown2Label" :options="dropdown2Options" />
            </div>
            <div>
                <label>{{ input3Label }}</label>
                <InputField :label="input3Label" />
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