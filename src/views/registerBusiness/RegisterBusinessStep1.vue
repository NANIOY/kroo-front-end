<script setup>
import { ref } from 'vue';
import Form from '../../components/organisms/forms/Form.vue';
import LoginImage from '../../components/molecules/login/LoginImage.vue';

const localfields = ref([
    {
        hasLabel: true,
        label: 'Company email',
        placeholder: 'Enter company email',
        localStorageKey: 'companyEmail',
        group: 'businessInfo'
    },
    {
        hasLabel: true,
        label: 'Location',
        placeholder: 'Enter your location',
        localStorageKey: 'location',
        group: 'businessInfo'
    }
]);

const imageUploads = ref([
    {
        shape: 'circle',
        label: 'Logo',
        localStorageKey: 'logo',
        group: 'businessInfo'
    },
    {
        shape: 'square',
        label: 'Banner image',
        localStorageKey: 'bannerImage',
        group: 'businessInfo'
    }
]);



</script>

<template>
    <div class="registerContainer">
        <Form class="registerContainer__form" header="Business info" :hasSteps="true"
            steps="Set up business account: step 1/5" :hasBack="true" :hasSkip="false" :hasText="true"
            text="Glad to see you here Grasshoppers Academy. Let’s get you up and running." :localfields="localfields"
            :hasImageUpload="true" :imageUploads="imageUploads" :hasLargeButton="true" buttonLabel="Next"
            redirect="/register/business/step-2">
        </Form>

        <LoginImage class="registerContainer__image" />
    </div>
</template>

<style scoped></style>