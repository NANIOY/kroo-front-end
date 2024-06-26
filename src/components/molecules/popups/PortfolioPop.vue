<script setup>
import { ref, defineProps, defineEmits, watch } from 'vue';
import setupAxios from '../../../setupAxios';
import Overlay from '../../molecules/popups/Overlay.vue';
import LargeButton from '../../atoms/buttons/LargeButton.vue';
import DropDown from '../../atoms/inputs/DropDown.vue';
import InputField from '../../atoms/inputs/InputField.vue';
import UploadFile from '../../atoms/inputs/UploadFile.vue';
import Alert from '../../atoms/alerts/alert.vue';

const props = defineProps({
    isVisible: {
        type: Boolean,
        default: false
    },
    initialData: {
        type: Object,
        default: () => ({})
    }
});

const emits = defineEmits(['close', 'submit']);
const axiosInstance = setupAxios();
const title = ref(props.initialData.portfolioTitle || '');
const selectedType = ref(props.initialData.portfolioType || null);
const file = ref(null);
const portfolioId = ref(props.initialData._id || null);
const typeOptions = ['Short Film', 'Feature Film', 'Documentary', 'Music Video', 'Commercial', 'Animation', 'Web Series', 'TV Show', 'Corporate Video', 'Experimental', 'Photography', 'Other'];

const alertVisible = ref(false);
const alertMessage = ref('');
const alertType = ref('good');

const handleFileUpload = (uploadedFile) => {
    console.log('File uploaded:', uploadedFile);
    file.value = uploadedFile;
};

watch(file, (newFile) => {
    console.log('File changed:', newFile);
});

const closeModal = () => {
    emits('close');
};

const handleSubmit = async () => {
    if (!title.value || !selectedType.value) {
        showAlert('Please fill in all fields.', 'bad');
        return;
    }

    const token = sessionStorage.getItem('sessionToken');
    const userId = sessionStorage.getItem('userId');

    if (!token || !userId) {
        showAlert('Session token or user ID is missing.', 'bad');
        return;
    }

    const formData = new FormData();
    formData.append('portfolioTitle', title.value);
    formData.append('portfolioType', selectedType.value);

    // Include the file if it's uploaded
    if (file.value) {
        formData.append('file', file.value);
    }

    try {
        let response;
        if (portfolioId.value) {
            // Edit existing item
            response = await axiosInstance.put(`/file/portfolio/${portfolioId.value}`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
        } else {
            // Add new item
            response = await axiosInstance.post('/file/portfolio', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
        }

        emits('submit', response.data);
        closeModal();
        window.location.reload();
    } catch (error) {
        console.error('Failed to update portfolio:', error);
        showAlert('Failed to update portfolio.', 'bad');
    }
};

const showAlert = (message, type) => {
    alertMessage.value = message;
    alertType.value = type;
    alertVisible.value = true;
};

watch(() => props.initialData, (newData) => {
    title.value = newData.portfolioTitle || '';
    selectedType.value = newData.portfolioType || null;
    portfolioId.value = newData._id || null;
});
</script>

<template>
    <Alert v-if="alertVisible" :type="alertType" :label="alertMessage" />

    <Overlay v-if="isVisible" @overlayClick="closeModal">
        <div class="portfoliopop" @click.stop>
            <div class="portfoliopop__top">
                <h3>{{ portfolioId ? 'Edit' : 'Add' }} Portfolio Work</h3>
            </div>
            <div class="portfoliopop__body">
                <InputField v-model="title" placeholder="Enter title" :hasLabel="true" label="Title" />
                <DropDown v-model="selectedType" :options="typeOptions" :hasLabel="true" placeholder="Select type"
                    label="Type" />
                <UploadFile @fileUploaded="handleFileUpload" :hasLabel="true" label="Upload file" :autoUpload="false"
                    :fileTypes="['image/png', 'image/jpeg', 'image/webp', 'image/gif', 'image/svg+xml', 'video/mp4', 'video/webm', 'audio/mpeg', 'audio/mp3', 'audio/wav', 'audio/wave', 'audio/ogg']" />
            </div>
            <div class="portfoliopop__buttons">
                <LargeButton label="Submit" class="button--primary" :hasRequest="false" @click="handleSubmit" />
                <LargeButton label="Cancel" class="button--tertiary" :hasRequest="false" @click="closeModal" />
            </div>
        </div>
    </Overlay>
</template>

<style scoped>
.portfoliopop {
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
    gap: 32px;
}

.portfoliopop__body {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.portfoliopop__body .container {
    width: 100%;
}

.portfoliopop__buttons {
    display: flex;
    gap: 16px;
}
</style>
