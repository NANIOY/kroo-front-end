<script setup>
import setupAxios from '../../setupAxios';
import { ref } from 'vue';
import Form from '../../components/organisms/forms/Form.vue';
import LoginImage from '../../components/molecules/login/LoginImage.vue';

const dropdownOptions = [
    { value: 'Producer', label: 'Producer' },
    { value: 'Editor', label: 'Editor' },
    { value: 'Audience', label: 'Audience' }
];

const inputComboProps = {
    label: 'Invite employees',
    input1Placeholder: 'Email',
    input2Placeholder: 'Select Role',
    buttonLabel: 'Add',
    showCounter: true,
    showDropdown: true,
    dropdownOptions: dropdownOptions 
};

const inputCombo = ref(inputComboProps);
</script>

<template>
    <div class="registerContainer">
        <Form class="registerContainer__form" header="Add members" :hasSteps="true"
            steps="Set up business account: step 5/5" :hasBack="true" :hasText="true"
            text="Invite your employees and assign roles for permissions." :hasLocalStorageButton="true"
            buttonLabel="Finish" endpoint="/business" redirect="/dashboard" :inputCombo="inputCombo"
            />
        <LoginImage class="registerContainer__image" />
    </div>
</template>

<style scoped></style>