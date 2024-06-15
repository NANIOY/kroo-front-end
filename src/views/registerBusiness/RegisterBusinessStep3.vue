<script setup>
import setupAxios from '../../setupAxios';
import { ref, onMounted, computed } from 'vue';
import Form from '../../components/organisms/forms/Form.vue';
import LoginImage from '../../components/molecules/login/LoginImage.vue';

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

const localfields = ref([
    {
        hasLabel: true,
        label: 'Bio',
        placeholder: 'Tell us about your company',
        localStorageKey: 'bio',
        group: 'businessInfo'
    },
    {
        hasLabel: true,
        label: 'Tagline',
        placeholder: 'Enter a tagline',
        localStorageKey: 'tagline',
        group: 'businessInfo'
    }
]);
</script>

<template>
    <div class="registerContainer">
        <Form class="registerContainer__form" header="Show projects" :hasSteps="true"
            steps="Set up business account: step 3/5" :hasBack="true" :hasText="true"
            text="Highlight your company's projects." :hasSocialInput="false" :localfields="localfields"
            :multidropdowns="multidropdownProps" :hasMultiDropdown=true :hasLargeButton="true" buttonLabel="Next"
            redirect="/register/business/step-4" />
        <LoginImage class="registerContainer__image" />
    </div>
</template>

<style scoped></style>
