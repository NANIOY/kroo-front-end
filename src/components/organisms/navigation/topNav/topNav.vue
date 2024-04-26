<script setup>
import { computed, ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import TransparentButton from '../../../atoms/buttons/TransparentButton.vue';
import setupAxios from '../../../../setupAxios.js';

const props = defineProps({
  pageName: String,
  name: String,
  func: String,
  profileImage: String
});

const route = useRoute();
const dynamicPageName = computed(() => {
  const routeName = route.name;
  if (routeName) {
    return capitalizeFirstLetter(routeName);
  } else {
    const segments = route.path.split('/');
    return capitalizeFirstLetter(segments[segments.length - 1]);
  }
});

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

const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
</script>

<template>
  <div class="navbarTop sticky">
    <div id="navbarTop_left">
      <h3>{{ dynamicPageName }}</h3>
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
.sticky {
  position: sticky;
  top: 0;
  z-index: 998;
  background-color: var(--white);
}

.navbarTop,
#navbarTop_right,
#navbarTop_right_account {
  display: flex;
  align-items: center;
}

.navbarTop {
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

p,
h3 {
  margin: 0;
}
</style>