<script setup>
import { Tiktok } from '@iconoir/vue';

const props = defineProps({
    iconType: {
        type: String,
        required: true
    }
});

let icon = null;

switch (props.iconType.toLowerCase()) {
    case 'tiktok':
        icon = Tiktok;
        break;
    default:
        icon = null;
}
</script>

<template>
    <a :href="link" target="_blank" rel="noopener noreferrer" class="social-button">
        <img :src="icon" alt="Social Media Icon" class="social-icon">
    </a>
</template>

<style scoped></style>