<script setup>
import Form from '../../components/organisms/forms/Form.vue';
import LoginImage from '../../components/molecules/login/LoginImage.vue';

const dropdownOptions = [
    'Producer',
    'Editor',
    'Audience'
];

const inputCombo = {
    label: 'Invite employees',
    input1Placeholder: 'Email',
    input2Placeholder: 'Select Role',
    buttonLabel: 'Add',
    showCounter: true,
    dropdownOptions: dropdownOptions
};
</script>

<template>
    <div class="registerContainer">
        <Form class="registerContainer__form" header="Add members" :hasSteps="true"
            steps="Set up business account: step 5/5" :hasBack="true" :hasText="true"
            text="Invite your employees and assign roles for permissions." :hasLocalStorageButton="true"
            buttonLabel="Finish" endpoint="/business" redirect="/dashboard" :inputCombo="inputCombo" />
        <LoginImage class="registerContainer__image" />
    </div>
</template>

<style scoped></style>
