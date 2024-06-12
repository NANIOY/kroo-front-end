<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import setupAxios from '../../setupAxios';
import ProfileLeft from '../../components/organisms/profile/ProfileLeft.vue';
import ProfileRight from '../../components/organisms/profile/ProfileRight.vue';

const props = defineProps(['name', 'func', 'profileImage']);
const userId = sessionStorage.getItem('userId');
const name = ref(props.name);

const businessName = ref('');
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
          businessName.value = businessResponse.data.data.business.businessInfo.companyName;
          hasBusiness.value = true;
        } else {
          businessName.value = '';
          hasBusiness.value = false;
        }
      } catch (err) {
        console.error('Fetching business data failed:', err);
        businessName.value = '';
        hasBusiness.value = false;
      }
    } else {
      businessName.value = '';
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
  <div>
    <ProfileLeft :name="name" :profileImage="profileImage" />
    <ProfileRight :hasBusiness="hasBusiness" :businessName="businessName" />
  </div>
</template>


<style scoped>
</style>