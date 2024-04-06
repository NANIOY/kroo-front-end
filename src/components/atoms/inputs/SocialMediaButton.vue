<script setup>
import { Tiktok } from '@iconoir/vue';
import { defineProps } from 'vue';

const props = defineProps({
    iconType: {
        type: String,
        required: true
    },
    link: {
        type: String,
        default: 'https://www.example.com'
    }
});

let icon = null;

switch (props.iconType.toLowerCase()) {
    case 'tiktok':
        icon = Tiktok;
        break;
}
</script>

<template>
    <a :href="link" target="_blank" class="social-button">
        <icon :icon="icon" class="social-icon" />
    </a>
</template>

<style scoped></style>
