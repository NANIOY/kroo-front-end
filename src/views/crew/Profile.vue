<script setup>
import { ref, onMounted, watch, computed } from 'vue';
import { useRoute } from 'vue-router';
import setupAxios from '../../setupAxios';
import ProfileLeft from '../../components/organisms/profile/ProfileLeft.vue';
import ProfileRight from '../../components/organisms/profile/ProfileRight.vue';

const user = ref(null);
const loading = ref(true);
const error = ref(null);
const currentUser = ref(null);

const axiosInstance = setupAxios();
const route = useRoute();

const fetchUserProfile = async (userId) => {
  try {
    const response = await axiosInstance.get(`/user/${userId}`);
    user.value = response.data.data.user;
  } catch (err) {
    error.value = err.response?.data?.message || 'Error fetching user profile';
  } finally {
    loading.value = false;
  }
};

watch(route, () => {
  const userId = route.params.userId || sessionStorage.getItem('userId');
  fetchUserProfile(userId);
}, { immediate: true });

onMounted(() => {
  const userId = route.params.userId || sessionStorage.getItem('userId');
  fetchUserProfile(userId);
});

const isCurrentUserProfile = computed(() => {
  return user.value && currentUser.value && user.value._id === currentUser.value._id;
});

const editProfile = () => {
};
</script>

<template>
  <div class="profile">
    <ProfileLeft :user="user" v-if="user" />
    <ProfileRight :user="user" :currentUser="currentUser" :isCurrentUserProfile="isCurrentUserProfile" v-if="user" />
  </div>
</template>

<style scoped>
.profile {
  display: flex;
  gap: 80px;
}
</style>