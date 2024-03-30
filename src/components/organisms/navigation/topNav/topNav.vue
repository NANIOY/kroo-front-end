<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import TransparentButton from '../../../atoms/buttons/TransparentButton.vue';

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
</script>

<template>
  <div id="navbarTop">
    <div id="navbarTop_left">
      <div id="navbarTop_left_page">
        <h3>{{ dynamicPageName }}</h3>
      </div>
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
#navbarTop {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  margin-bottom: 16px;
  border-bottom: 1px solid var(--black);
  margin: 32px 0px 32px 0px;
}

#navbarTop_left {
  display: flex;
  flex-direction: column;
}

#navbarTop_left_page h3 {
  margin: 0;
}

#navbarTop_right {
  display: flex;
  align-items: center;
}

#navbarTop_right_account {
  display: flex;
  align-items: center;
}

#navbarTop_right_account_image {
  margin-right: 16px;
}

#navbarTop_right_account_image_wrapper img {
  max-width: 56px;
  max-height: 56px;
}

#navbarTop_right_account_info {
  margin-right: 8px;
}

#navbarTop_right_account_info_name p,
#navbarTop_right_account_info_function p {
  margin: 0;
}

#navbarTop__right__switch {
  display: flex;
  flex-direction: column;

}

#navbarTop__right__switch__arrowUp a,
#navbarTop__right__switch__arrowDown a {
  color: var(--black);
}
</style>