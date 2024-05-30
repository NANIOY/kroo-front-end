<script setup>
import { ref, onMounted, watch, computed } from 'vue';
import { useRoute } from 'vue-router';
import setupAxios from '../../setupAxios';
import ProfileLeft from '../../components/organisms/profile/ProfileLeft.vue';
import ProfileRight from '../../components/organisms/profile/ProfileRight.vue';

const user = ref(null);
const loading = ref(true);
const error = ref(null);
const currentUser = ref(null); // Store information about the logged-in user

const axiosInstance = setupAxios();
const route = useRoute();

const fetchUserProfile = async (userId) => {
  try {
    const response = await axiosInstance.get(`/user/${userId}`);
    user.value = response.data.data.user;
    console.log('Profile fetched user:', user.value);
  } catch (err) {
    error.value = err.response?.data?.message || 'Error fetching user profile';
  } finally {
    loading.value = false; // Set loading to false after fetching user profile
  }
};

const fetchCurrentUser = async () => {
  try {
    const response = await axiosInstance.get('/current-user');
    return response.data.data.user;
  } catch (err) {
    console.error('Error fetching current user:', err);
  }
};

watch(route, () => {
  const userId = route.params.userId || sessionStorage.getItem('userId');
  fetchUserProfile(userId);
}, { immediate: true });

onMounted(() => {
  const userId = route.params.userId || sessionStorage.getItem('userId');
  fetchUserProfile(userId);
  // Fetch information about the logged-in user
  fetchCurrentUser().then((userData) => {
    currentUser.value = userData;
  }).catch((error) => {
    console.error('Error fetching current user:', error);
  });
});

// Function to check if the logged-in user is viewing their own profile
const isCurrentUserProfile = computed(() => {
  return user.value && currentUser.value && user.value.id === currentUser.value.id;
});

// Function to handle edit profile button click
const editProfile = () => {
  // Add logic to navigate to the edit profile page or open an edit profile modal
};
</script>

<template>
  <div class="profile">
    <ProfileLeft :user="user" v-if="user" />
    <ProfileRight :user="user" :currentUser="currentUser" :isCurrentUserProfile="isCurrentUserProfile" v-if="user" />
    <!-- Show edit button only if the logged-in user is viewing their own profile -->
    <button v-if="isCurrentUserProfile && currentUser.value.role === 'crew'" @click="editProfile">Edit</button>
    <p v-else>{{ error }}</p>
  </div>
</template>

<style scoped>
.profile {
  display: flex;
  gap: 80px;
}
</style>