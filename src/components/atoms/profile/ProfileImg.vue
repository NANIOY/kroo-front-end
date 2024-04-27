<script setup>
import { defineProps, ref, onMounted } from 'vue';
import { Check } from '@iconoir/vue';
import setupAxios from '../../../setupAxios.js';

const props = defineProps({
    showBadge: Boolean
});

const axiosInstance = setupAxios();
const userId = sessionStorage.getItem('userId');
const profileImage = ref('');

onMounted(async () => {
    if (userId) {
        try {
            const userResponse = await axiosInstance.get(`/user/${userId}`);
            const crewDataId = userResponse.data.data.user.crewData._id;

            if (crewDataId) {
                const crewResponse = await axiosInstance.get(`/crew/${crewDataId}`);
                profileImage.value = crewResponse.data.data.basicInfo.profileImage;
            }
        } catch (error) {
            console.error('Error fetching profile image:', error);
        }
    }
});
</script>

<template>
    <div class="pfpContainer">
        <img :src="profileImage" alt="Profile Image" class="pfpContainer__image">
        <div v-if="showBadge" class="pfpContainer__badge">
            <img src="../../../assets/img/badge.svg" alt="badge" @contextmenu.prevent>
        </div>
    </div>
</template>

<style scoped>
.pfpContainer {
    position: relative;
    display: inline-block;
}

.pfpContainer__image {
    border-radius: 50%;
    border: 2px solid var(--white);
    width: 168px;
    height: 168px;
    object-fit: cover;
}

.pfpContainer__badge {
    position: absolute;
    bottom: 0;
    right: 0;
    user-select: none;
}

.pfpContainer__badge img {
    width: 48px;
    height: 48px;
}

.pfpContainer__badge::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
}
</style>