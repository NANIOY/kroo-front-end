<script setup>
import { ref } from 'vue';
import Form from '../../components/organisms/forms/Form.vue';
import LoginImage from '../../components/molecules/login/LoginImage.vue';

const inputFields = ref([
    {
        hasLabel: true,
        label: 'Company email',
        placeholder: 'Enter company email',
        localStorageKey: 'companyName',
        group: 'basicInfo'
    },
    {
        hasLabel: true,
        label: 'Location',
        placeholder: 'Enter your location',
        localStorageKey: 'functions',
        group: 'basicInfo'
    },
    {
        hasLabel: true,
        label: 'Bio',
        placeholder: 'Tell us about your company',
        localStorageKey: 'skills',
        group: 'profileDetails'
    },
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

const addMediaType = () => {
    inputFields.value.push({
        hasLabel: true,
        label: 'Media Type',
        placeholder: 'Select media type',
        localStorageKey: 'mediaType' + inputFields.value.filter(f => f.localStorageKey.startsWith('mediaType')).length,
        group: 'basicInfo'
    });
};

const addLanguage = () => {
    inputFields.value.push({
        hasLabel: true,
        label: 'Language',
        placeholder: 'Select language',
        localStorageKey: 'language' + inputFields.value.filter(f => f.localStorageKey.startsWith('language')).length,
        group: 'basicInfo'
    });
};
</script>

<template>
    <div class="registerContainer">
        <Form class="registerContainer__form" header="Business info" :hasSteps="true"
            steps="Set up business account: step 1/5" :hasBack="true" :hasSkip="false" :hasText="true"
            text="Glad to see you here *business name*. Let’s get you up and running." :inputFields="inputFields"
            :hasImageUpload="true" :imageUploads="imageUploads" :hasLargeButton="true" buttonLabel="Next"
            redirect="/register/business/step-3" />

        <div class="multidrop">
            <label class="text-reg-normal">Media Types</label>
            <multidropdown :options="['Video', 'Audio', 'Text']" group="basicInfo" localStorageKey="mediaTypes" />
            <button @click="addMediaType">+ Add</button>
        </div>

        <div class="multidrop">
            <label class="text-reg-normal">Languages</label>
            <multidropdown :options="['English', 'Spanish', 'French']" group="basicInfo" localStorageKey="languages" />
            <button @click="addLanguage">+ Add</button>
        </div>

        <LoginImage class="registerContainer__image" />
    </div>
</template>

<style scoped></style>
