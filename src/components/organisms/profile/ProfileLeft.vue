<script setup>
import { defineProps } from 'vue';
import ProfileInfo from '../../molecules/profile/ProfileInfo.vue';

const props = defineProps({
    user: {
        type: Object,
        required: true
    }
});
</script>

<template>
    <div class="profileleft">
        <ProfileInfo :user="user" />
    </div>
</template>

<style scoped>
.profileleft {
    width: 512px;
    height: 100vh;
    background-color: rgba(14, 15, 15, 0.96);
    margin-left: -48px;
}
</style>