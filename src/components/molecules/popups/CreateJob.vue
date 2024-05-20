<script setup>
import { ref, defineProps, defineEmits } from 'vue';
import InputField from '../../atoms/inputs/InputField.vue';
import MultiDropdown from '../../atoms/inputs/MultiDropdown.vue';
import Dropdown from '../../atoms/inputs/DropDown.vue';
import UploadFile from '../../atoms/inputs/UploadFile.vue';
import LargeButton from '../../atoms/buttons/LargeButton.vue';
import AuthButton from '../../atoms/buttons/AuthButton.vue';
import Overlay from './Overlay.vue';

const props = defineProps({
    isVisible: {
        type: Boolean,
        default: false,
    },
});

const emits = defineEmits(['close', 'submit']);

const form = ref({
    title: '',
    description: '',
    wage: '',
    date: '',
    time: '',
    skills: [],
    jobFunction: '',
    location: {
        city: '',
        address: ''
    },
    production_type: '',
    union_status: '',
    attachments: []
});

const functionOptions = [
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
];

const skillsOptions = [
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
];

const productionTypes = [
    "Animation", "Children's programming", "Commercials", "Documentaries", "Feature films", "Game shows", "Music videos", "Reality television", "Short films", "Sports broadcasts", "Television programs", "Television shows", "Web series"
];

const unionStatuses = ['Union', 'Non-Union'];

const closeModal = () => {
    emits('close');
};

const createJob = () => {
    emits('submit', form.value);
    closeModal();
};
</script>

<template>
    <Overlay class="modal__overlay" v-if="isVisible" @overlayClick="closeModal">
        <div class="modal" @click.stop>
            <h2>Create new job</h2>
            <form class="modal__form" @submit.prevent="createJob">
                <InputField v-model="form.title" :hasLabel="true" label="Title" placeholder="Enter a job title" />
                <Dropdown v-model="form.jobFunction" class="modal__dropdown" :hasLabel="true" label="Job Function"
                    :options="functionOptions" />
                <InputField v-model="form.description" :hasLabel="true" label="Description"
                    placeholder="Enter a brief description" />
                <div class="modal__multi">
                    <InputField v-model="form.wage" :hasLabel="true" label="Wage (€/hr)" type="number"
                        placeholder="Enter a wage" />
                    <MultiDropdown v-model="form.skills" :hasLabel="true" label="Skills" :options="skillsOptions" />
                </div>
                <div class="modal__multi">
                    <InputField v-model="form.date" :hasLabel="true" label="Date" type="date"
                        placeholder="Select date" />
                    <InputField v-model="form.time" :hasLabel="true" label="Time" type="time"
                        placeholder="Select time" />
                </div>
                <div class="modal__multi">
                    <InputField v-model="form.location.city" :hasLabel="true" label="City" placeholder="Enter city" />
                    <InputField v-model="form.location.address" :hasLabel="true" label="Address"
                        placeholder="Enter address" />
                </div>
                <div class="modal__multi">
                    <Dropdown class="modal__dropdown" v-model="form.production_type" :hasLabel="true"
                        label="Production Type" :options="productionTypes" placeholder="Select type" />
                    <Dropdown class="modal__dropdown" v-model="form.union_status" :hasLabel="true" label="Union Status"
                        :options="unionStatuses" placeholder="Select union status" />
                </div>
                <UploadFile v-model="form.attachments" :hasLabel="true" label="Attachments" placeholder="Upload file" />

                <div class="modal__buttons">
                    <LargeButton label="Cancel" class="button--secondary modal__buttons__button" @click="closeModal" />
                    <AuthButton label="Create" class="button--primary modal__buttons__button" type="submit" />
                </div>
            </form>
        </div>
    </Overlay>
</template>

<style scoped>
.modal {
    background-color: var(--white);
    color: var(--black);
    box-shadow: 0px 0px 16px 0 rgba(14, 15, 15, 0.04);
    padding: 48px;
    border-radius: 8px;
    width: 680px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 50%;
    transform: translateY(-50%);
    right: 64px;
    gap: 16px;
}

.modal__form {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.modal__dropdown {
    width: 100%;
}

.modal__multi {
    display: flex;
    gap: 16px;
    justify-content: space-between;
}

/* BUTTONS */
.modal__buttons {
    display: flex;
    justify-content: space-between;
    gap: 12px;
    margin-top: 20px;
}

.modal__buttons__button {
    width: 50%;
}
</style>