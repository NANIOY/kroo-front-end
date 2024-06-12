<script setup>
import { ref, onMounted } from 'vue';
import setupAxios from '../../setupAxios';
import BusinessProfileLeft from '../../components/organisms/profile/BusinessProfileLeft.vue';

const props = defineProps(['name', 'func', 'profileImage']);
const userId = sessionStorage.getItem('userId');
const name = ref(props.name);

const business = ref(null);
const hasBusiness = ref(false);

const axiosInstance = setupAxios();

const fetchUserData = async () => {
  try {
    const userResponse = await axiosInstance.get(`/user/${userId}`);
    const userData = userResponse.data.data.user;
    name.value = userData.username;

    const businessDataId = userData.businessData;
    if (businessDataId) {
      try {
        const businessResponse = await axiosInstance.get(`/business/${businessDataId}`);
        console.log('businessResponse:', businessResponse.data);
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
  <div v-if="hasBusiness">
    <BusinessProfileLeft :business="business" />
  </div>
  <div v-else>
    <p>No business data available</p>
  </div>
</template>


<style scoped></style>