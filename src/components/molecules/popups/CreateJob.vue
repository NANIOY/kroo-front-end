<script setup>
import { reactive, defineProps, defineEmits, watch, ref } from 'vue';
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
import axios from 'axios';
import Alert from '../../atoms/alerts/alert.vue';

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
                address: '',
                country: ''
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

const alertVisible = ref(false);
const alertMessage = ref('');
const alertType = ref('good');
const alertText = ref('');

const localPostData = reactive({
    title: props.postData.title || '',
    description: props.postData.description || '',
    wage: props.postData.wage || '',
    date: props.postData.date ? new Date(props.postData.date).toISOString().substr(0, 10) : new Date().toISOString().substr(0, 10), // Initialize with current date if not provided
    time: props.postData.time || new Date().toTimeString().substr(0, 5), // Initialize with current time if not provided
    skills: props.postData.skills || [],
    jobFunction: props.postData.jobFunction || '',
    location: {
        city: props.postData.location.city || '',
        address: props.postData.location.address || '',
        country: props.postData.location.country || ''
    },
    production_type: props.postData.production_type || '',
    union_status: props.postData.union_status || '',
    attachments: props.postData.attachments || []
});

watch(() => props.postData, (newPostData) => {
    Object.assign(localPostData, JSON.parse(JSON.stringify(newPostData)));
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

    if (!localPostData.location.country && localPostData.location.city) {
        try {
            const apiUrl = `https://nominatim.openstreetmap.org/search?format=json&city=${encodeURIComponent(localPostData.location.city)}&addressdetails=1`;
            const response = await axios.get(apiUrl, {
                headers: { 'Accept-Language': 'en' }
            });
            if (response.data && response.data.length > 0) {
                localPostData.location.country = response.data[0].address.country;
            } else {
                throw new Error('Unable to fetch country for the provided city.');
            }
        } catch (error) {
            console.error('Error fetching country:', error.message);
            return;
        }
    }

    const jobData = { ...localPostData, businessId };
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
        emits('submit', localPostData);
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

    console.log('Updating job data:', JSON.stringify(localPostData, null, 2));

    try {
        const response = await axiosInstance.put(`/bussJob/${props.jobId}`, localPostData, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        console.log('Job updated successfully:', response.data);
        emits('submit', localPostData);
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
        const businessId = await fetchBusinessId();

        if (!businessId) {
            console.error('Business ID is missing');
            return;
        }

        const response = await axiosInstance.delete(`/bussJob/${props.jobId}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        console.log('Job deleted successfully:', response.data);
        emits('delete', props.jobId);
        closeModal();
        showAlert('Job deleted successfully!', 'good');
    } catch (error) {
        console.error('Failed to delete job:', error);
    }
};

const handleSubmit = () => {
    console.log('Submitting job data:', JSON.stringify(localPostData, null, 2));
    if (props.type === 'create') {
        createJob();
        showAlert('Job created successfully!', 'good', 'The job has been created successfully. You can see it in the jobs list.');
    } else {
        updateJob();
        showAlert('Job updated successfully!', 'good', 'The job has been updated successfully.');
    }
};

const closeModal = () => {
    emits('close');
};

const showAlert = (message, type, text) => {
    alertMessage.value = message;
    alertType.value = type;
    alertText.value= text;
    alertVisible.value = true;
};

</script>

<template>
    <Alert v-if="alertVisible" :type="alertType" :label="alertMessage" :text="alertText" />

    <Overlay class="modal__overlay" v-if="isVisible" @overlayClick="closeModal">
        <div class="modal" @click.stop>
            <div class="modal__top">
                <h2>{{ props.type === 'create' ? 'Create new job' : 'Edit job' }}</h2>
                <NormalButton v-if="props.type === 'update'" label="Delete"
                    class="button--danger modal__buttons__button" :hasRequest=false @click="deleteJob" />
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
                <div class="modal__multi modal__multi--address">
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
                        class="button--primary modal__buttons__button" type="submit" :hasRequest="false" />
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

.modal__multi--address> :nth-child(1),
.modal__multi--address> :nth-child(2) {
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