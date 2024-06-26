<script setup>
import { Plus } from '@iconoir/vue';
import { computed, defineProps, defineEmits, ref } from 'vue';
import setupAxios from '../../../setupAxios';

const props = defineProps({
    shape: {
        type: String,
        default: 'circle'
    },
    label: {
        type: String,
        default: 'Label'
    },
    imageType: {
        type: String,
        default: 'profile',
        required: true
    },
    dataType: {
        type: String,
        default: 'crew',  // default to 'crew' if not provided
        required: true
    }
});

const userIdFromSession = sessionStorage.getItem('userId');
const iconComponent = computed(() => Plus);
const fileInput = ref(null);
const imageUrl = ref(null);

const openFileExplorer = () => {
    fileInput.value.click();
};

const handleFileChange = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('userId', userIdFromSession);
    formData.append('imageType', props.imageType);
    formData.append('dataType', props.dataType);

    try {
        const axiosInstance = setupAxios();
        const response = await axiosInstance.post('/file/uploadimage', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        imageUrl.value = response.data.imageUrl;
        emit('imageChanged', response.data.imageUrl);
    } catch (error) {
        console.error('Error uploading image:', error);
    }
};

const emit = defineEmits(['imageChanged']);
</script>

<template>
    <div class="imageUpload">
        <span class="imageUpload___label text-reg-normal">{{ label }}</span>
        <input type="file" accept="image/png, image/jpeg" @change="handleFileChange" style="display: none"
            ref="fileInput">
        <div :class="shape === 'circle' ? 'imageUpload__circle' : 'imageUpload__square'"
            :style="imageUrl ? { 'background-image': `url(${imageUrl})` } : {}" @click="openFileExplorer">
            <component v-if="!imageUrl" :is="iconComponent" class="imageUpload__plus" />
        </div>
    </div>
</template>

<style scoped>
.imageUpload {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.imageUpload___label {
    color: var(--black);
}

.imageUpload__circle,
.imageUpload__square {
    border: 2px solid var(--black);
    background-color: transparent;
    box-sizing: border-box;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.3s;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}

.imageUpload__circle {
    border-radius: 50%;
    height: 160px;
    width: 160px;
}

.imageUpload__square {
    border-radius: 5px;
    height: 160px;
    width: 336px;
}

.imageUpload__plus {
    stroke-width: 2px;
    width: 48px;
    height: 48px;
}

.imageUpload__circle:hover,
.imageUpload__square:hover {
    border-color: var(--blurple);
    color: var(--blurple);
    transition: none;
}
</style>