<script setup>
import { Plus } from '@iconoir/vue';
import { computed, defineProps, ref } from 'vue';
import DropDown from './DropDown.vue';

const props = defineProps({
    hasLabel: {
        type: Boolean,
        default: true
    },
    label: {
        type: String,
        default: 'Portfolio work'
    }
});

const options = [
    'Short Film', 'Feature Film', 'Documentary', 'Music Video', 'Commercial', 'Animation', 'Web Series', 'TV Show', 'Corporate Video', 'Experimental', 'Photography', 'Other'
];

const iconComponent = computed(() => Plus);

const fileInput = ref(null);
const imageUrl = ref(null);

const openFileExplorer = () => {
    fileInput.value.click();
};

const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log('Uploaded file:', file);
    const reader = new FileReader();
    reader.onload = () => {
        imageUrl.value = reader.result;
    };
    reader.readAsDataURL(file);
};
</script>

<template>
    <div class="inputPortfolio">
        <span v-if="(hasLabel)" class="text-reg-normal">{{ label }}</span>
        <input type="file" accept="image/png, image/jpeg, image/webp, image/gif, video/mp4, audio/mpeg"
            @change="handleFileChange" style="display: none" ref="fileInput">
        <button class="inputPortfolio__square" @click="openFileExplorer"
            :style="{ backgroundImage: `url(${imageUrl})` }">
            <component v-if="!imageUrl" :is="iconComponent" class="inputPortfolio__plus" />
        </button>
        <DropDown :options="options" />
    </div>
</template>

<style scoped>
.inputPortfolio {
    display: flex;
    flex-direction: column;
    width: 200px;
    gap: 8px;
    color: var(--black);
}

.inputPortfolio__square {
    width: 100%;
    height: 144px;
    border: 2px solid var(--black);
    background-color: transparent;
    padding: 10px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.3s;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}
</style>