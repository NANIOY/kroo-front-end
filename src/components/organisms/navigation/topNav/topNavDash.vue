<script setup>
import { defineProps, ref, onMounted } from 'vue';
import TransparentButton from '../../../atoms/buttons/TransparentButton.vue';
import setupAxios from '../../../../setupAxios.js';

const props = defineProps(['name', 'func', 'profileImage']);

const currentDate = new Date();
const formattedDate = currentDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'long' });
const dayName = currentDate.toLocaleDateString('en-GB', { weekday: 'long' });

const axiosInstance = setupAxios();
const userId = sessionStorage.getItem('userId');
const name = ref(props.name);
const func = ref(props.func);
const profileImage = ref(props.profileImage);

const fetchUserData = async () => {
  try {
    const userResponse = await axiosInstance.get(`/user/${userId}`);
    const userData = userResponse.data.data.user;
    name.value = userData.username;

    const crewDataId = userData.crewData?._id;
    if (crewDataId) {
      const crewResponse = await axiosInstance.get(`/crew/${crewDataId}`);
      const crewData = crewResponse.data.data;

      const functions = crewData.basicInfo.functions;
      if (functions.length > 2) {
        func.value = functions.slice(0, 2).join(', ') + ', ...';
      } else {
        func.value = functions.join(', ');
      }
      profileImage.value = crewData.basicInfo.profileImage;
    } else {
      throw new Error('crewDataId is not available');
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
};

onMounted(fetchUserData);
</script>

<template>
  <div id="navbarTop">
    <div id="navbarTop_left">
      <p class="text-bold-l text-primary">{{ formattedDate }}</p>
      <p class="text-reg-normal text-secondary">{{ dayName }}</p>
    </div>

    <div id="navbarTop_right">
      <div id="navbarTop_right_account">
        <img class="radius-full" :src="profileImage" alt="profile image">
        <div id="navbarTop_right_account_info">
          <p class="text-bold-l text-primary">{{ name }}</p>
          <p class="text-reg-normal text-secondary">{{ func }}</p>
        </div>
      </div>
      <div id="navbarTop__right__switch">
        <TransparentButton class="no-label" iconName="NavArrowUp" />
        <TransparentButton class="no-label" iconName="NavArrowDown" />
      </div>
    </div>
  </div>
</template>

<style scoped>
#navbarTop,
#navbarTop_right,
#navbarTop_right_account {
  display: flex;
  align-items: center;
}

#navbarTop {
  justify-content: space-between;
  padding: 0px 8px 16px 8px;
  margin: 32px 0px 36px 0px;
  border-bottom: 1px solid var(--neutral-70);
}

img {
  width: 56px;
  height: 56px;
  margin-right: 16px;
}

#navbarTop_right_account_info {
  margin-right: 8px;
}

p {
  margin: 0;
}
</style>