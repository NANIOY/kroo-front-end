<script setup>
import { ref, defineProps, defineEmits, watch } from 'vue';
import Overlay from '../../molecules/popups/Overlay.vue';
import LargeButton from '../../atoms/buttons/LargeButton.vue';
import DropDown from '../../atoms/inputs/DropDown.vue';
import InputField from '../../atoms/inputs/InputField.vue';
import UploadFile from '../../atoms/inputs/UploadFile.vue';
import Alert from '../../atoms/alerts/alert.vue';

const props = defineProps({
    isVisible: {
        type: Boolean,
        default: false,
    }
});

const emits = defineEmits(['close', 'submit']);

const title = ref('');
const selectedType = ref(null);
const file = ref(null);
const typeOptions = ['Short Film', 'Feature Film', 'Documentary', 'Music Video', 'Commercial', 'Animation', 'Web Series', 'TV Show', 'Corporate Video', 'Experimental', 'Photography', 'Other'];

const alertVisible = ref(false);
const alertMessage = ref('');
const alertType = ref('good');

const handleFileUpload = (uploadedFile) => {
    file.value = uploadedFile;
};

const closeModal = () => {
    emits('close');
};

const handleSubmit = () => {
    if (!title.value || !selectedType.value || !file.value) {
        showAlert('Please fill in all fields and upload a file.', 'bad');
        return;
    }

    const portfolioData = {
        title: title.value,
        type: selectedType.value,
        file: file.value
    };

    emits('submit', portfolioData);
    closeModal();
};

const showAlert = (message, type) => {
    alertMessage.value = message;
    alertType.value = type;
    alertVisible.value = true;
};
</script>

<template>
    <Alert v-if="alertVisible" :type="alertType" :label="alertMessage" />

    <Overlay v-if="isVisible" @overlayClick="closeModal">
        <div class="portfoliopop" @click.stop>
            <div class="portfoliopop__top">
                <h3>Add Portfolio Work</h3>
            </div>
            <div class="portfoliopop__body">
                <InputField v-model="title" placeholder="Enter title" :hasLabel="true" label="Title" />
                <DropDown v-model="selectedType" :options="typeOptions" :hasLabel="true" placeholder="Select type"
                    label="Type" />
                <UploadFile @fileUploaded="handleFileUpload" :hasLabel="true" label="Upload file" />
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
