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
    <a :href="link" target="_blank" class="socialButton">
        <div class="socialButton__wrapper">
            <icon :icon="icon" class="socialButton__wrapper__icon" />
        </div>
    </a>
</template>

<style scoped>
.socialButton {
    text-decoration: none;
    width: 40px;
    height: 40px;
    display: block;
}

.socialButton__wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 2px solid var(--black);
    box-sizing: border-box;
    transition: 0.3s ease-out
}

.socialButton:hover .socialButton__wrapper {
    background-color: var(--blurple);
}

.socialButton__wrapper__icon {
    color: var(--black);
    font-size: 24px;
    width: 28px;
    height: 28px;
    stroke-width: 2px;
    transition: color 0.3s ease-out;
}

.socialButton__wrapper__icon:hover {
    color: var(--white);
}
</style>