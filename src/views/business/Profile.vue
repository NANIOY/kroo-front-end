<script setup>
import { ref, onMounted } from 'vue';
import setupAxios from '../../setupAxios';
import BusinessProfileLeft from '../../components/organisms/profile/BusinessProfileLeft.vue';
import BusinessProfileRight from '../../components/organisms/profile/BusinessProfileRight.vue';

const props = defineProps(['name', 'func', 'profileImage']);
const userId = sessionStorage.getItem('userId');
const name = ref(props.name);

const business = ref(null);
const hasBusiness = ref(false);
const currentUser = ref(null);

const axiosInstance = setupAxios();

const fetchUserData = async () => {
  try {
    const userResponse = await axiosInstance.get(`/user/${userId}`);
    const userData = userResponse.data.data.user;
    name.value = userData.username;
    currentUser.value = userData;

    const businessDataId = userData.businessData;
    if (businessDataId) {
      try {
        const businessResponse = await axiosInstance.get(`/business/${businessDataId}`);
        if (businessResponse && businessResponse.data) {
          business.value = businessResponse.data.data.business;
          hasBusiness.value = true;
        } else {
          business.value = null;
          hasBusiness.value = false;
        }
      } catch (err) {
        console.error('Fetching business data failed:', err);
        business.value = null;
        hasBusiness.value = false;
      }
    } else {
      business.value = null;
      hasBusiness.value = false;
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
};

onMounted(() => {
  fetchUserData();
});
</script>

<template>
  <div class="profile" v-if="hasBusiness">
    <BusinessProfileLeft :business="business" />
    <BusinessProfileRight :business="business" :currentUser="currentUser" />
  </div>
  <div v-else>
    <p>No business data available</p>
  </div>
</template>

<style scoped>
.profile {
  display: flex;
  gap: 80px;
}
</style>