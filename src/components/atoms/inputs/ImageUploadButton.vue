<script setup>
import { Plus } from '@iconoir/vue';
import { computed, defineProps, ref } from 'vue';

const props = defineProps({
    shape: {
        type: String,
        default: 'circle'
    },
    label: {
        type: String,
        default: 'Label'
    }
});

const iconComponent = computed(() => Plus);

const fileInput = ref(null);

const openFileExplorer = () => {
    fileInput.value.click();
};

const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log('Uploaded file:', file);
};
</script>


<template>
    <div class="imageUpload">
        <span class="imageUpload___label text-reg-normal">{{ label }}</span>
        <input type="file" accept="image/png, image/jpeg" @change="handleFileChange" style="display: none" ref="fileInput">
        <button v-if="shape === 'circle'" class="imageUpload__circle" @click="openFileExplorer">
            <component :is="iconComponent" class="imageUpload__plus" />
        </button>
        <button v-else class="imageUpload__square" @click="openFileExplorer">
            <component :is="iconComponent" class="imageUpload__plus" />
        </button>
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
    padding: 10px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.3s;
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