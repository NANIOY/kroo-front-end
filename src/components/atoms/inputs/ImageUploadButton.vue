<script setup>
import { Plus } from '@iconoir/vue';
import { computed, defineProps } from 'vue';

const props = defineProps({
    shape: {
        type: String,
        default: 'circle'
    }
});

const iconComponent = computed(() => Plus);
</script>

<template>
    <div class="imageUpload">
        <button v-if="shape === 'circle'" class="imageUpload__circle">
            <component :is="iconComponent" class="imageUpload__plus" />
        </button>
        <button v-else class="imageUpload__square">
            <component :is="iconComponent" class="imageUpload__plus" />
        </button>
    </div>
</template>

<style scoped>
.imageUpload {
    width: 50%;
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