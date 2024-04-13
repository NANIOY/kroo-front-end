<script setup>
import { ref } from 'vue';
import SocialButton from './SocialButton.vue';
</script>

<template>
    <div class="socialInput">
        <label for="socialInput" class="text-reg-normal">Socials</label>
        <div class="socialInput__socials">
            <SocialButton iconType="facebook" link="https://facebook.com" />
            <SocialButton iconType="instagram" link="https://instagram.com" />
            <SocialButton iconType="youtube" link="https://youtube.com" />
            <SocialButton iconType="linkedin" link="https://linkedin.com" />
            <SocialButton iconType="x" link="https://twitter.com" />
            <SocialButton iconType="threads" link="https://threads.net" />
            <SocialButton iconType="dribbble" link="https://dribbble.com" />
            <SocialButton iconType="behance" link="https://behance.net" />
            <SocialButton iconType="tiktok" link="https://tiktok.com" />
        </div>
    </div>
</template>

<style scoped>
.socialInput {
    display: flex;
    flex-direction: column;
    gap: 8px;
    color: var(--black);
}

.socialInput__socials {
    display: flex;
    justify-content: space-between;
}
</style>