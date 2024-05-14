<script setup>
import { ref } from 'vue';
import Form from '../../components/organisms/forms/Form.vue';
import LoginImage from '../../components/molecules/login/LoginImage.vue';

const localfields = ref([
    {
        label: 'age',
        hasLabel: true,
        placeholder: 'Enter your age',
        hasIconLeft: false,
        hasIconRight: false,
        isPassword: false,
        localStorageKey: 'age',
        group: 'profileDetails'
    },
    {
        label: 'city',
        hasLabel: true,
        placeholder: 'Enter your city',
        hasIconLeft: false,
        hasIconRight: false,
        isPassword: false,
        localStorageKey: 'city',
        group: 'profileDetails'
    },
    {
        label: 'bio',
        hasLabel: true,
        placeholder: 'Enter your bio',
        hasIconLeft: false,
        hasIconRight: false,
        isPassword: false,
        localStorageKey: 'bio',
        group: 'profileDetails'
    }
]);

const multidropdownProps = ref([
    {
        hasLabel: true,
        label: 'Language',
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
        group: 'profileDetails'
    }
]);

const multidropdowns = ref(multidropdownProps);

const slider = ref({
    label: 'Work radius (km from location)',
    maxValue: 1000,
    localStorageKey: 'workRadius',
    group: 'profileDetails'
});

</script>

<template>

    <div class="registerContainer">
        <Form class="registerContainer__form" header="Profile details" :hasSteps="true" steps="Setup profile: Step 3/5"
            :hasBack="true" :hasSkip="true" :hasText="true"
            text="Share a glimpse of who you are with these personal touches." :localfields="localfields"
            :hasMultiDropdown="true" :multidropdowns="multidropdowns" :slider="slider" :hasLargeButton="true"
            buttonLabel="Next" redirect="/register/crew/step-4" />
        <LoginImage class="registerContainer__image" />
    </div>
</template>

<style scoped></style>