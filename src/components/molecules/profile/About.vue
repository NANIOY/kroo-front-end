<script setup>
import { ref, onMounted } from 'vue';
import setupAxios from '../../../setupAxios';

const axiosInstance = setupAxios();
const userId = sessionStorage.getItem('userId');
const crewData = ref(null);

onMounted(async () => {
    if (userId) {
        try {
            const userResponse = await axiosInstance.get(`/user/${userId}`);
            const crewDataId = userResponse.data.data.user.crewData._id;

            if (crewDataId) {
                const crewResponse = await axiosInstance.get(`/crew/${crewDataId}`);
                crewData.value = crewResponse.data.data;
            }
        } catch (error) {
            console.error('Error fetching crew data:', error);
        }
    }
});
</script>

<template>
    <div v-if="crewData">
        <p>{{ crewData.profileDetails.bio }}</p>
        <h3>{{ crewData.profileDetails.age }}</h3>
        <ul>
            <li v-for="language in crewData.profileDetails.languages" :key="language">{{ language }}</li>
        </ul>
        <h3>{{ crewData.profileDetails.location }}</h3>
        <h3>{{ crewData.profileDetails.workRadius }} km</h3>
        <a :href="crewData.careerDetails.certificationsLicenses" target="_blank">View Certifications</a>
        <p>{{ crewData.careerDetails.unionStatus }}</p>
    </div>
</template>

<style scoped></style>