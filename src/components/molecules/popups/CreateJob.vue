<script setup>
import { ref, defineProps, defineEmits, watch, onMounted } from 'vue';
import InputField from '../../atoms/inputs/InputField.vue';
import MultiDropdown from '../../atoms/inputs/MultiDropdown.vue';
import Dropdown from '../../atoms/inputs/DropDown.vue';
import UploadFile from '../../atoms/inputs/UploadFile.vue';
import DatePicker from '../../atoms/inputs/DatePicker.vue';
import TimePicker from '../../atoms/inputs/TimePicker.vue';
import LargeButton from '../../atoms/buttons/LargeButton.vue';
import NormalButton from '../../atoms/buttons/NormalButton.vue';
import Overlay from './Overlay.vue';
import setupAxios from '../../../setupAxios';

const props = defineProps({
    isVisible: {
        type: Boolean,
        default: false,
    },
    postData: {
        type: Object,
        default: () => ({
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
        })
    },
    type: {
        type: String,
        default: 'create' // 'create' or 'edit'
    },
    jobId: {
        type: String,
        default: ''
    }
});

const emits = defineEmits(['close', 'submit', 'delete']);

const localPostData = ref({ ...props.postData })

watch(() => props.postData, (newPostData) => {
    localPostData.value = { ...newPostData };
}, { deep: true });

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

    const jobData = { ...localPostData.value, businessId };
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
        emits('submit', localPostData.value);
        closeModal();
    } catch (error) {
        console.error('Failed to create job:', error);
    }
};

const updateJob = async () => {
    const token = sessionStorage.getItem('sessionToken') || sessionStorage.getItem('rememberMeToken');

    if (!token) {
        console.error('Authentication token is missing');
        return;
    }

    console.log('Updating job data:', JSON.stringify(localPostData.value, null, 2));

    try {
        const response = await axiosInstance.put(`/bussJob/${props.jobId}`, localPostData.value, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        console.log('Job updated successfully:', response.data);
        emits('submit', localPostData.value);
        closeModal();
    } catch (error) {
        console.error('Failed to update job:', error);
    }
};

const deleteJob = async () => {
    const token = sessionStorage.getItem('sessionToken') || sessionStorage.getItem('rememberMeToken');

    if (!token) {
        console.error('Authentication token is missing');
        return;
    }

    try {
        const response = await axiosInstance.delete(`/bussJob/${props.jobId}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        console.log('Job deleted successfully:', response.data);
        emits('delete', props.jobId);
        closeModal();
    } catch (error) {
        console.error('Failed to delete job:', error);
    }
};

const handleSubmit = () => {
    if (props.type === 'create') {
        createJob();
    } else {
        updateJob();
    }
};

const closeModal = () => {
    emits('close');
};
</script>

<template>
    <Overlay class="modal__overlay" v-if="isVisible" @overlayClick="closeModal">
        <div class="modal" @click.stop>
            <div class="modal__top">
                <h2>{{ props.type === 'create' ? 'Create new job' : 'Edit job' }}</h2>
                <NormalButton v-if="props.type === 'update'" label="Delete" class="button--danger modal__buttons__button"
                    @click="deleteJob" />
            </div>
            <form class="modal__form" @submit.prevent="handleSubmit">
                <InputField v-model="localPostData.title" :hasLabel="true" label="Title"
                    placeholder="Enter a job title" />
                <Dropdown v-model="localPostData.jobFunction" class="modal__dropdown" :hasLabel="true"
                    label="Job Function" :options="functionOptions" />
                <InputField v-model="localPostData.description" :hasLabel="true" label="Description"
                    placeholder="Enter a brief description" />
                <div class="modal__multi modal__multi--wageskills">
                    <InputField v-model="localPostData.wage" :hasLabel="true" label="Wage (€/hr)" type="number"
                        placeholder="Enter a wage" />
                    <MultiDropdown v-model="localPostData.skills" :hasLabel="true" label="Skills"
                        :options="skillsOptions" />
                </div>
                <div class="modal__multi modal__multi--datetime">
                    <DatePicker v-model="localPostData.date" :hasLabel="true" label="Date" type="date"
                        placeholder="Select date" />
                    <TimePicker v-model="localPostData.time" :hasLabel="true" label="Time" type="time"
                        placeholder="Select time" />
                </div>
                <div class="modal__multi">
                    <InputField v-model="localPostData.location.city" :hasLabel="true" label="City"
                        placeholder="Enter city" />
                    <InputField v-model="localPostData.location.address" :hasLabel="true" label="Address"
                        placeholder="Enter address" />
                </div>
                <div class="modal__multi">
                    <Dropdown class="modal__dropdown" v-model="localPostData.production_type" :hasLabel="true"
                        label="Production Type" :options="productionTypes" placeholder="Select type" />
                    <Dropdown class="modal__dropdown" v-model="localPostData.union_status" :hasLabel="true"
                        label="Union Status" :options="unionStatuses" placeholder="Select union status" />
                </div>
                <UploadFile v-model="localPostData.attachments" :hasLabel="true" label="Attachments"
                    placeholder="Upload file" />

                <div class="modal__buttons">
                    <LargeButton :label="props.type === 'create' ? 'Create' : 'Update'"
                        class="button--primary modal__buttons__button" type="submit" />
                    <LargeButton label="Cancel" class="button--secondary modal__buttons__button" @click="closeModal" />
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

.modal__top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
}

.modal__top> :nth-child(2) {
    width: 128px;
    background-color: var(--warning);
    color: var(--white);
    transition: 0.3s;
}

.modal__top> :nth-child(2):hover {
    filter: brightness(92%);
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

.modal__multi--wageskills> :nth-child(1) {
    width: 104px;
}

.modal__multi--wageskills> :nth-child(2) {
    width: calc(100% - 104px - 16px);
}

.modal__multi--datetime> :nth-child(1),
.modal__multi--datetime> :nth-child(2) {
    width: 100%;
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