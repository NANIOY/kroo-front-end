<script setup>
import { ref } from 'vue';
import Form from '../../components/organisms/forms/Form.vue';
import LoginImage from '../../components/molecules/login/LoginImage.vue';

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
        label: 'Functions',
        placeholder: 'Select your primary roles...',
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
        label: 'Skills',
        placeholder: 'Select your skills...',
        options: [
            'Adaptability',
            'Attention to Detail',
            'Budget Management',
            'Camera Operation',
            'Collaboration',
            'Communication',
            'Creative Problem Solving',
            'Critical Thinking',
            'Digital Asset Management',
            'Equipment Maintenance',
            'Event Coordination',
            'Flexibility',
            'Grip Handling',
            'Leadership',
            'Lighting Design',
            'Location Scouting',
            'Media Management',
            'Negotiation',
            'Networking',
            'Organization',
            'Patience',
            'Physical Stamina',
            'Post-production',
            'Previsualization',
            'Problem Solving',
            'Project Management',
            'Resourcefulness',
            'Rigging',
            'Safety Protocols',
            'Script Supervision',
            'Set Construction',
            'Set Decoration',
            'Software Proficiency',
            'Sound Design',
            'Special Effects',
            'Storyboarding',
            'Stunt Coordination',
            'Technical Proficiency',
            'Team Management',
            'Teamwork',
            'Time Management',
            'Troubleshooting',
            'Visual Awareness',
            'Wardrobe Management',
            'Wireless Video Transmission',
            'Workflow Optimization'
        ],
        localStorageKey: 'skills',
        group: 'profileDetails'
    }
]);

const multidropdowns = ref(multidropdownProps);
let profileDetailsGroup = 'functionsGroup';
</script>

<template>
    <div class="registerContainer">
        <Form class="registerContainer__form" header="Basic info" :hasSteps="true" steps="Setup profile: Step 2/5"
            :hasBack="true" :hasSkip="true" :hasText="true" text="Great! Let's tailor your profile and make you shine."
            :hasImageUpload="true" :imageUploads="imageUploads" :hasMultiDropdown="true"
            :multidropdowns="multidropdowns" :group="profileDetailsGroup" :hasLargeButton="true" buttonLabel="Next"
            redirect="/register/crew/step-3" />
        <LoginImage class="registerContainer__image" />
    </div>
</template>

<style scoped></style>