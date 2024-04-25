<script setup>
import { ref } from 'vue';
import Form from '../../components/organisms/forms/Form.vue';
import LoginImage from '../../components/molecules/login/LoginImage.vue';

// Define ref for inputFields and imageUploads
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

const multidropdownProps = ref([
    {
        hasLabel: true,
        label: 'Media types',
        placeholder: 'Select your media types...',
        options: [
            '3D Modeling',
            'Animation',
            'Art Direction',
            'Audio Editing',
            'Casting',
            'Cinematography',
            'Color Grading',
            'Costume Design',
            'Directing',
            'Editing',
            'Event Production',
            'Graphic Design',
            'Grip',
            'Lighting',
            'Location Scouting',
            'Makeup Artistry',
            'Motion Graphics',
            'Photography',
            'Production Design',
            'Props',
            'Script Supervision',
            'Scriptwriting',
            'Set Decoration',
            'Set Design',
            'Set Dressing',
            'Sound Design',
            'Special Effects',
            'Storyboarding',
            'Stunt Coordination',
            'Visual Effects',
            'Wardrobe',
            'Assistant Director',
            'Boom Operator',
            'Camera Operator',
            'Choreography',
            'Craft Services',
            'Dialect Coach',
            'Foley Artist',
            'Hair Styling',
            'Key Grip',
            'Location Manager',
            'On-set Dresser',
            'Production Assistant',
            'Pyrotechnician',
            'Scenic Artist',
            'Score Composer',
            'Second Unit Director',
            'Sound Mixer',
            'Still Photography',
            'Transportation Coordinator',
            'Unit Production Manager'
        ],
        localStorageKey: 'functions',
        group: 'basicInfo'
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
        localStorageKey: 'skills',
        group: 'profileDetails'
    }
]);
const multidropdowns = ref(multidropdownProps);

</script>

<template>
    <div class="registerContainer">
        <Form class="registerContainer__form" header="Business info" :hasSteps="true"
            steps="Set up business account: step 1/5" :hasBack="true" :hasSkip="false" :hasText="true"
            text="Glad to see you here Grasshoppers Academy. Let’s get you up and running." :inputFields="inputFields"
            :hasImageUpload="true" :imageUploads="imageUploads" :hasMultiDropdown=true
            :multidropdowns="multidropdownProps" :hasLargeButton="true" buttonLabel="Next"
            redirect="/register/business/step-3">
        </Form>

        <LoginImage class="registerContainer__image" />
    </div>
</template>

<style scoped></style>