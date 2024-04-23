<script setup>
import { ref } from 'vue';
import Form from '../../components/organisms/forms/Form.vue';
import LoginImage from '../../components/molecules/login/LoginImage.vue';

const inputFields = ref([
    {
        hasLabel: true,
        label: 'Company',
        placeholder: 'Enter company name',
        localStorageKey: 'companyName',
        group: 'basicInfo'
    },
    {
        hasLabel: true,
        label: 'Primary Roles',
        placeholder: 'Enter your primary roles...',
        localStorageKey: 'functions',
        group: 'basicInfo'
    },
    {
        hasLabel: true,
        label: 'Skills',
        placeholder: 'Enter your skills...',
        localStorageKey: 'skills',
        group: 'profileDetails'
    }
]);

const imageUploads = ref([
    {
        shape: 'circle',
        label: 'Profile image',
        localStorageKey: 'profileImage',
        group: 'basicInfo'
    },
    {
        shape: 'square',
        label: 'Banner image',
        localStorageKey: 'bannerImage',
        group: 'basicInfo'
    }
]);
</script>

<template>
    <div class="registerContainer">
        <Form class="registerContainer__form" header="Business info" :hasSteps="true"
            steps="Set up business account: step 1/5" :hasBack="true" :hasSkip="false" :hasText="true"
            text="Glad to see you here *business name*. Let’s get you up and running." :inputFields="inputFields"
            :hasImageUpload="true" :imageUploads="imageUploads" :hasLargeButton="true" buttonLabel="Next"
            redirect="/register/business/step-3" />
        <LoginImage class="registerContainer__image" />
    </div>
</template>

<style scoped></style>
