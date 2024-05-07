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
    },
    {
        hasLabel: true,
        label: 'Bio',
        placeholder: 'Tell us about your company',
        localStorageKey: 'bio',
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

const multidropdownProps = ref([
    {
        hasLabel: true,
        label: 'Media types',
        placeholder: 'Select your media types...',
        options: [
            "Animation",
            "Children's programming",
            "Commercials",
            "Documentaries",
            "Feature films",
            "Game shows",
            "Music videos",
            "Reality television",
            "Short films",
            "Sports broadcasts",
            "Television programs",
            "Television shows",
            "Web series"
        ],
        localStorageKey: 'mediaTypes',
        group: 'businessInfo'
    },
    {
        hasLabel: true,
        label: 'Languages',
        placeholder: 'Select your languages...',
        options: [
            'English',
            'Español',
            'Deutsch',
            'Français',
            'Italiano',
            'Português',
            'Русский',
            'Nederlands',
            'Polski',
            'Svenska',
            'Norsk',
            'Dansk',
            'Suomi',
            'Ελληνικά',
            'Čeština',
            'Magyar',
            'Türkçe',
            'Română',
            'Български',
            'Українська',
            'Slovenčina',
            'Lietuvių',
            'Latviešu',
            'Eesti',
            'Hrvatski',
            'Srpski',
            'Српски',
            'Slovenščina',
            'Беларуская',
            'Íslenska',
            'العربية',
            'हिन्दी',
            '中文',
            '日本語',
            '한국어',
            'فارسی',
            'বাংলা',
            'עברית',
            'ਪੰਜਾਬੀ',
            'தமிழ்',
            'తెలుగు',
            'മലയാളം',
            'ਪੰਜਾਬੀ',
            'ગુજરાતી'
        ],
        localStorageKey: 'languages',
        group: 'businessInfo'
    }
]);
const multidropdowns = ref(multidropdownProps);

</script>

<template>
    <div class="registerContainer">
        <Form class="registerContainer__form" header="Business info" :hasSteps="true"
            steps="Set up business account: step 1/5" :hasBack="true" :hasSkip="false" :hasText="true"
            text="Glad to see you here Grasshoppers Academy. Let’s get you up and running." :localfields="localfields"
            :hasImageUpload="true" :imageUploads="imageUploads" :hasMultiDropdown=true
            :multidropdowns="multidropdownProps" :hasLargeButton="true" buttonLabel="Next"
            redirect="/register/business/step-2">
        </Form>

        <LoginImage class="registerContainer__image" />
    </div>
</template>

<style scoped></style>