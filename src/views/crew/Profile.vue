<script setup>
import { ref, onMounted } from 'vue';
import setupAxios from '../../setupAxios';
import ProfileLeft from '../../components/organisms/profile/ProfileLeft.vue';
import ProfileRight from '../../components/organisms/profile/ProfileRight.vue';

const user = ref(null);
const loading = ref(true);
const error = ref(null);

const axiosInstance = setupAxios();
const userId = sessionStorage.getItem('userId');

onMounted(async () => {
  try {
    const response = await axiosInstance.get(`/user/${userId}`);
    user.value = response.data.data.user;
    console.log('Profile fetched user:', user.value);
  } catch (err) {
    error.value = err.response?.data?.message || 'Error fetching user profile';
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="profile">
    <ProfileLeft :user="user" />
    <ProfileRight :user="user" />
  </div>
</template>

<style scoped>
.profile {
  display: flex;
  gap: 80px;
}
</style>