<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
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

const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const axiosInstance = setupAxios();
const userId = sessionStorage.getItem('userId');
const name = ref(props.name);
const func = ref(props.func);
const profileImage = ref(props.profileImage);
const hasBusiness = ref(false);
const currentRole = ref(sessionStorage.getItem('role'));
const router = useRouter();

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
    }

    // fetch business data
    const businessDataId = userData.businessData;
    if (businessDataId) {
      try {
        const businessResponse = await axiosInstance.get(`/business/${businessDataId}`);
        if (businessResponse && businessResponse.data) {
          hasBusiness.value = true;
        } else {
          hasBusiness.value = false;
        }
      } catch (err) {
        console.error('Fetching business data failed:', err);
        hasBusiness.value = false;
      }
    } else {
      hasBusiness.value = false;
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
};

const showDropdown = ref(false);
const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
};

const closeDropdown = event => {
  if (!event.target.closest('.navbarTop_right__dropdown') && !event.target.closest('#navbarTop_right_account')) {
    showDropdown.value = false;
  }
};

const switchToBusiness = async () => {
  let route = '/dashboard';
  const token = sessionStorage.getItem('sessionToken') || sessionStorage.getItem('rememberMeToken');
  if (!token) {
    console.error("No token available for authentication");
    return;
  }

  try {
    const response = await axiosInstance.post('/auth/switch-role', {
      token,
      role: 'business'
    });
    console.log("response:", response);

    if (response && response.data) {
      sessionStorage.setItem('sessionToken', response.data.token);
      sessionStorage.setItem('role', 'business');

      if (router.currentRoute.value.path !== route) {
        router.push(route).then(() => {
          router.isReady().then(() => {
            window.location.reload();
          });
        });
      } else {
        window.location.reload();
      }
    }
  } catch (error) {
    console.error("Error switching to business profile:", error.response ? error.response.data : error);
  }
};

const switchToCrew = async () => {
  let route = '/dashboard';
  const token = sessionStorage.getItem('sessionToken') || sessionStorage.getItem('rememberMeToken');
  if (!token) {
    console.error("No token available for authentication");
    return;
  }

  try {
    const response = await axiosInstance.post('/auth/switch-role', {
      token,
      role: 'crew'
    });
    console.log("response:", response);

    if (response && response.data) {
      sessionStorage.setItem('sessionToken', response.data.token);
      sessionStorage.setItem('role', 'crew');

      if (router.currentRoute.value.path !== route) {
        router.push(route).then(() => {
          router.isReady().then(() => {
            window.location.reload();
          });
        });
      } else {
        window.location.reload();
      }
    }
  } catch (error) {
    console.error("Error switching to crew profile:", error.response ? error.response.data : error);
  }
};

const createBusiness = () => {
  let route = '/register/business';
  router.push(route);
};

onMounted(() => {
  document.addEventListener('click', closeDropdown);
  fetchUserData();
});

onUnmounted(() => {
  document.removeEventListener('click', closeDropdown);
});
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
        <TransparentButton class="no-label navbarTop_right_account__button" iconName="NavArrowDown"
          @click="toggleDropdown" />
      </div>
      <div v-if="showDropdown" class="navbarTop_right__dropdown text-reg-normal">
        <p v-if="hasBusiness && currentRole !== 'business'" @click="switchToBusiness">Switch to Business Profile</p>
        <p v-if="!hasBusiness" @click="createBusiness">Create Business Profile</p>
        <p v-if="currentRole !== 'crew'" @click="switchToCrew">Switch to Crew Profile</p>
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

/* DROPDOWN MENU */
.navbarTop_right__dropdown {
  position: absolute;
  background-color: var(--white);
  box-shadow: 0 1px 4px rgba(14, 15, 15, 0.1);
  width: auto;
  right: 0;
  top: 72px;
  border-radius: 4px;
  z-index: 999;
  border: var(--gray) 1px solid;
}

.navbarTop_right__dropdown p {
  padding: 12px 16px;
  text-align: right;
  cursor: pointer;
  user-select: none;
  transition: background-color 0.3s;
}

.navbarTop_right__dropdown p:hover {
  background-color: var(--gray);
}
</style>