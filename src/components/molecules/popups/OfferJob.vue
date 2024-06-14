<script setup>
import { ref, defineProps, defineEmits, watch } from 'vue';
import setupAxios from '../../../setupAxios';
import Overlay from './Overlay.vue';
import LargeButton from '../../atoms/buttons/LargeButton.vue';
import DropDown from '../../atoms/inputs/DropDown.vue';

const props = defineProps({
    isVisible: {
        type: Boolean,
        default: false,
    },
    email: {
        type: String,
        required: true
    },
    businessId: {
        type: String,
        required: true
    }
});

const emits = defineEmits(['close', 'submit']);

const axiosInstance = setupAxios();
const jobs = ref([]);
const selectedJobId = ref(null);
const jobOptions = ref([]);

const fetchAvailableJobs = async () => {
    const token = sessionStorage.getItem('sessionToken') || sessionStorage.getItem('rememberMeToken');
    if (!token) {
        console.error('Authentication token is missing');
        return;
    }

    try {
        const response = await axiosInstance.get(`/bussJob/${props.businessId}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        jobs.value = response.data.linkedJobs.filter(job => job.status === 'open');
        jobOptions.value = jobs.value.map(job => job.title);
    } catch (error) {
        console.error('Failed to fetch available jobs:', error);
    }
};

const sendJobOffer = async () => {
    const token = sessionStorage.getItem('sessionToken') || sessionStorage.getItem('rememberMeToken');
    if (!token) {
        console.error('Authentication token is missing');
        return;
    }

    try {
        await axiosInstance.post(`/bussJobInt/${selectedJobId.value}/offer`, {
            email: props.email
        }, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        emits('submit');
        closeModal();
    } catch (error) {
        console.error('Failed to send job offer:', error);
    }
};

const closeModal = () => {
    emits('close');
};

watch(() => props.isVisible, (newVal) => {
    if (newVal) {
        fetchAvailableJobs();
    }
}, { immediate: true });
</script>

<template>
    <Overlay v-if="isVisible" @overlayClick="closeModal">
        <div class="offerjob" @click.stop>
            <div class="offerjob__top">
                <h3>Select a Job to Offer</h3>
            </div>
            <div class="offerjob__body">
                <DropDown v-model="selectedJobId" :options="jobOptions" placeholder="Select a job" />
            </div>
            <div class="offerjob__buttons">
                <LargeButton label="Send Offer" class="button--primary" @click="sendJobOffer"
                    :disabled="!selectedJobId" />
                <LargeButton label="Cancel" class="button--tertiary" @click="closeModal" :hasRequest="false" />
            </div>
        </div>
    </Overlay>
</template>

<style scoped>
.offerjob {
    width: 600px;
    padding: 48px;
    border-radius: 8px;
    box-sizing: border-box;
    background-color: var(--white);
    box-shadow: 0px 0px 16px 0 rgba(14, 15, 15, 0.04);
    color: var(--black);
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 50%;
    transform: translateY(-50%);
    right: 64px;
    gap: 24px;
}

.offerjob__body .container {
    width: 100%;
}

.offerjob__buttons {
    display: flex;
    gap: 24px;
}
</style>