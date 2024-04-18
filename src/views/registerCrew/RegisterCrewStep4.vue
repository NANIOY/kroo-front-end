<script setup>
import { ref } from 'vue';
import Form from '../../components/organisms/forms/Form.vue';
import LoginImage from '../../components/molecules/login/LoginImage.vue';

const inputComboProps = {
    label: 'Education/Training',
    showDropdown: false,
    input1Placeholder: 'Title',
    input2Placeholder: 'Where',
    buttonLabel: 'Add',
    input1Key: 'title',
    input2Key: 'where',
    localStorageKey: 'educationTraining',
    group: 'careerDetails',
};

const uploadFileProps = {
    label: 'Certifications & licenses',
    hasLabel: true,
    placeholder: 'Upload file',
    isError: false,
    inputWidth: '100%',
};

const dropdownProps = {
    hasLabel: true,
    label: 'Union status',
    placeholder: 'Select status',
    options: ['Non-union', 'Union'],
};

const inputCombo = ref(inputComboProps);
const uploadFile = ref(uploadFileProps);
const dropdown = ref(dropdownProps);


</script>

<template>
    <div class="registerContainer">
        <Form class="registerContainer__form" header="Career details" :hasSteps="true" steps="Setup profile: Step 4/5"
            :hasBack="true" :hasSkip="true" :hasText="true"
            text="Display your career details from the work you’ve done." :hasInputPortfolio="true"
            :inputCombo="inputCombo" :uploadFile="uploadFile" :dropdown="dropdown" :hasLargeButton="true"
            buttonLabel="Next" redirect="/register/crew/step-5" />
        <LoginImage class="registerContainer__image" />
    </div>
</template>

<style scoped></style>