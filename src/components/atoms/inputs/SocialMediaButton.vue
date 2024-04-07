<script setup>
import { Facebook, Instagram, Youtube, Linkedin, X, Threads, Dribbble, Behance, Tiktok } from '@iconoir/vue';
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
    case 'facebook':
        icon = Facebook;
        break;
    case 'instagram':
        icon = Instagram;
        break;
    case 'youtube':
        icon = Youtube;
        break;
    case 'linkedin':
        icon = Linkedin;
        break;
    case 'x':
        icon = X;
        break;
    case 'threads':
        icon = Threads;
        break;
    case 'dribbble':
        icon = Dribbble;
        break;
    case 'behance':
        icon = Behance;
        break;
    case 'tiktok':
        icon = Tiktok;
        break;
    default:
        icon = null;
}
</script>

<template>
    <a :href="link" target="_blank" class="social-button">
        <div class="icon-wrapper">
            <icon :icon="icon" class="social-icon" />
        </div>
    </a>
</template>

<style scoped>
.social-button {
    text-decoration: none;
    width: 40px;
    height: 40px;
    display: block;
}

.icon-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 3px solid var(--black);
    box-sizing: border-box;
}

.social-icon {
    color: var(--black);
    font-size: 24px;
    width: 32px;
    height: 32px;
    stroke-width: 2px;
}
</style>