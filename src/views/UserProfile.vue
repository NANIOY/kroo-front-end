<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import setupAxios from '../setupAxios';
import ProfileLeft from '../components/organisms/profile/ProfileLeft.vue';
import ProfileRight from '../components/organisms/profile/ProfileRight.vue';

const route = useRoute();
const userUrl = route.params.userUrl;

const user = ref(null);
const loading = ref(true);
const error = ref(null);

const axiosInstance = setupAxios();

onMounted(async () => {
    try {
        const response = await axiosInstance.get(`/user/profile/${userUrl}`);
        user.value = response.data;
    } catch (err) {
        error.value = err.response?.data?.message || 'Error fetching user profile';
    } finally {
        loading.value = false;
    }
});
</script>

<template>
    <div class="profile">
        <div v-if="loading">Loading...</div>
        <div v-else-if="error">{{ error }}</div>
        <div v-else>
            <ProfileLeft :user="user" />
            <ProfileRight :user="user" />
        </div>
    </div>
</template>

<style scoped>
.profile {
    display: flex;
    gap: 80px;
}
</style>