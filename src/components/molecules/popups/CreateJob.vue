<script setup>
import { ref, defineProps, defineEmits, onMounted } from 'vue';
import InputField from '../../atoms/inputs/InputField.vue';
import MultiDropdown from '../../atoms/inputs/MultiDropdown.vue';
import Dropdown from '../../atoms/inputs/DropDown.vue';
import UploadFile from '../../atoms/inputs/UploadFile.vue';
import LargeButton from '../../atoms/buttons/LargeButton.vue';
import Overlay from './Overlay.vue';
import setupAxios from '../../../setupAxios';

const props = defineProps({
    isVisible: {
        type: Boolean,
        default: false,
    },
});

const emits = defineEmits(['close', 'submit']);

const postData = ref({
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

const axiosInstance = setupAxios();

const fetchBusinessId = async () => {
    const token = sessionStorage.getItem('sessionToken') || sessionStorage.getItem('rememberMeToken');
    const userId = sessionStorage.getItem('userId');

    if (!token || !userId) {
        console.error('Authentication token or user ID is missing');
        return null;
    }

    try {
        const userResponse = await axiosInstance.get(`/user/${userId}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const businessId = userResponse.data.data.user.businessData;
        return businessId;
    } catch (error) {
        console.error('Failed to fetch user data:', error);
        return null;
    }
};

const createJob = async () => {
    const businessId = await fetchBusinessId();
    if (!businessId) {
        console.error('Business ID is missing');
        return;
    }

    const jobData = { ...postData.value, businessId };
    const token = sessionStorage.getItem('sessionToken') || sessionStorage.getItem('rememberMeToken');

    if (!token) {
        console.error('Authentication token is missing');
        return;
    }

    console.log('Posting job data:', JSON.stringify(jobData, null, 2));

    try {
        const response = await axiosInstance.post('/bussJob', jobData, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        console.log('Job created successfully:', response.data);
        emits('submit', postData.value);
        closeModal();
    } catch (error) {
        console.error('Failed to create job:', error);
    }
};

const closeModal = () => {
    emits('close');
};
</script>

<template>
    <Overlay class="modal__overlay" v-if="isVisible" @overlayClick="closeModal">
        <div class="modal" @click.stop>
            <h2>Create new job</h2>
            <form class="modal__form" @submit.prevent="createJob">
                <InputField v-model="postData.title" :hasLabel="true" label="Title" placeholder="Enter a job title" />
                <Dropdown v-model="postData.jobFunction" class="modal__dropdown" :hasLabel="true" label="Job Function"
                    :options="functionOptions" />
                <InputField v-model="postData.description" :hasLabel="true" label="Description"
                    placeholder="Enter a brief description" />
                <div class="modal__multi">
                    <InputField v-model="postData.wage" :hasLabel="true" label="Wage (€/hr)" type="number"
                        placeholder="Enter a wage" />
                    <MultiDropdown v-model="postData.skills" :hasLabel="true" label="Skills" :options="skillsOptions" />
                </div>
                <div class="modal__multi">
                    <InputField v-model="postData.date" :hasLabel="true" label="Date" type="date"
                        placeholder="Select date" />
                    <InputField v-model="postData.time" :hasLabel="true" label="Time" type="time"
                        placeholder="Select time" />
                </div>
                <div class="modal__multi">
                    <InputField v-model="postData.location.city" :hasLabel="true" label="City"
                        placeholder="Enter city" />
                    <InputField v-model="postData.location.address" :hasLabel="true" label="Address"
                        placeholder="Enter address" />
                </div>
                <div class="modal__multi">
                    <Dropdown class="modal__dropdown" v-model="postData.production_type" :hasLabel="true"
                        label="Production Type" :options="productionTypes" placeholder="Select type" />
                    <Dropdown class="modal__dropdown" v-model="postData.union_status" :hasLabel="true"
                        label="Union Status" :options="unionStatuses" placeholder="Select union status" />
                </div>
                <UploadFile v-model="postData.attachments" :hasLabel="true" label="Attachments"
                    placeholder="Upload file" />

                <div class="modal__buttons">
                    <LargeButton label="Cancel" class="button--secondary modal__buttons__button" @click="closeModal" />
                    <LargeButton label="Create" class="button--primary modal__buttons__button" type="submit" />
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