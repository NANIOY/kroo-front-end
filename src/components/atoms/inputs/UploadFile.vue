<script setup>
import { Upload } from '@iconoir/vue';
import { computed, defineProps, ref, defineEmits } from 'vue';
import setupAxios from '../../../setupAxios';

const props = defineProps({
    label: String,
    hasLabel: {
        type: Boolean,
        default: false
    },
    placeholder: {
        type: String,
        default: 'Upload file'
    },
    isError: {
        type: Boolean,
        default: false
    },
    inputWidth: {
        type: String,
        default: '100%'
    },
    autoUpload: {
        type: Boolean,
        default: true
    },
    fileTypes: {
        type: String,
        default: '.pdf,.doc,.docx,.jpg,.jpeg,.png'
    }
});

const userIdFromSession = sessionStorage.getItem('userId');
const fileInput = ref(null);
const fileName = ref('');

const openFileExplorer = () => {
    fileInput.value.click();
};

const handleFileChange = async (event) => {
    if (event.target.files.length === 0) return;

    const file = event.target.files[0];
    fileName.value = file.name;

    if (props.autoUpload) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('userId', userIdFromSession);

        try {
            const axiosInstance = setupAxios();
            const response = await axiosInstance.post('/file/uploadfile', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            emit('fileUploaded', response.data.fileUrl);
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    } else {
        emit('fileUploaded', file);
    }
};

const emit = defineEmits(['fileUploaded']);
</script>

<template>
    <div class="inputContainer">
        <label v-if="hasLabel">{{ label }}</label>
        <div class="inputContainer__wrapper">
            <input type="file" ref="fileInput" @change="handleFileChange" style="display: none;"
                :accept="fileTypes">
            <input type="text" :value="fileName || ''" :placeholder="fileName ? '' : placeholder"
                :class="{ error: isError }" :style="{ width: inputWidth }" readonly @click="openFileExplorer">
            <span class="icon" @click="openFileExplorer">
                <Upload />
            </span>
        </div>
    </div>
</template>

<style scoped>
.inputContainer {
    display: flex;
    flex-direction: column;
}

.inputContainer__wrapper {
    display: flex;
    align-items: center;
    position: relative;
    width: 100%;
}

label {
    margin-bottom: 4px;
    font-size: 16px;
    text-transform: capitalize;
}

.inputContainer__wrapper input {
    box-sizing: border-box;
    padding-top: 2px;
    padding-left: 12px;
    font-size: 20px;
    height: 48px;
    border: 2px solid var(--black);
    background-color: transparent;
    border-radius: 4px;
    transition: border-color 0.3s ease;
    cursor: pointer;
}

.inputContainer__wrapper input:focus {
    border-color: var(--blurple-50);
    outline: none;
}

input.error {
    border-color: var(--warning);
}

input::placeholder {
    color: var(--neutral-30);
}

.icon {
    position: absolute;
    display: flex;
    right: 12px;
    cursor: pointer;
}
</style>