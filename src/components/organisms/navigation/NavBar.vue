<script setup>
import NavbarLabel from '../../atoms/items/NavbarLabel.vue';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const activeLabel = ref(null);
const currentRole = ref(sessionStorage.getItem('role') || 'crew');
const route = useRoute();

const toggleActiveLabel = (iconName) => {
  activeLabel.value = iconName;
};

watch(route, (newRoute) => {
  updateActiveLabel(newRoute.path);
});

const updateActiveLabel = (path) => {
  switch (path) {
    case '/dashboard':
      activeLabel.value = 'ReportColumns';
      break;
    case '/calendar':
      activeLabel.value = 'Calendar';
      break;
    case '/search':
      activeLabel.value = 'Search';
      break;
    case '/tracker':
      activeLabel.value = 'Bookmark';
      break;
    case '/tools':
      activeLabel.value = 'Tools';
      break;
    case '/profile':
      activeLabel.value = 'User';
      break;
    case '/notifications':
      activeLabel.value = 'Bell';
      break;
    case '/settings':
      activeLabel.value = 'Settings';
      break;
    case '/help':
      activeLabel.value = 'HelpCircle';
      break;
    case '/team':
      activeLabel.value = 'Community';
      break;
    default:
      activeLabel.value = null;
      break;
  }
};

updateActiveLabel(route.path);
</script>

<template>
  <div id="navbar">
    <div id="navbar__contents">
      <a id="navbar_contents__logo" href="/#/dashboard">
        <img src="../../../assets/logomark-color.webp" alt="Logo" width="40" height="40" />
      </a>
      <div id="navbar_contents--items">
        <div id="navbar_item--items_menu">
          <NavbarLabel iconName="ReportColumns" label="Dashboard" :hasLabel="false" :darkMode="true"
            :isActive="activeLabel === 'ReportColumns'" @toggleActive="toggleActiveLabel" />
          <NavbarLabel iconName="Calendar" label="Calendar" :hasLabel="false" :darkMode="true"
            :isActive="activeLabel === 'Calendar'" @toggleActive="toggleActiveLabel" />
          <NavbarLabel iconName="Search" label="Search" :hasLabel="false" :darkMode="true"
            :isActive="activeLabel === 'Search'" @toggleActive="toggleActiveLabel" />
          <NavbarLabel iconName="Bookmark" label="Tracker" :hasLabel="false" :darkMode="true"
            :isActive="activeLabel === 'Bookmark'" @toggleActive="toggleActiveLabel" />
          <NavbarLabel iconName="Tools" label="Tools" :hasLabel="false" :darkMode="true"
            :isActive="activeLabel === 'Tools'" @toggleActive="toggleActiveLabel" />
          <NavbarLabel v-if="currentRole === 'business'" iconName="Community" label="Team" :hasLabel="false"
            :darkMode="true" :isActive="activeLabel === 'Community'" @toggleActive="toggleActiveLabel" />
        </div>
        <div id="navbar_contents--items_account">
          <NavbarLabel iconName="User" label="Profile" :hasLabel="false" :darkMode="true"
            :isActive="activeLabel === 'User'" @toggleActive="toggleActiveLabel" />
          <NavbarLabel iconName="Bell" label="Notifications" :hasLabel="false" :darkMode="true"
            :isActive="activeLabel === 'Bell'" @toggleActive="toggleActiveLabel" />
          <NavbarLabel iconName="Settings" label="Settings" :hasLabel="false" :darkMode="true"
            :isActive="activeLabel === 'Settings'" @toggleActive="toggleActiveLabel" />
          <NavbarLabel iconName="HelpCircle" label="Help" :hasLabel="false" :darkMode="true"
            :isActive="activeLabel === 'HelpCircle'" @toggleActive="toggleActiveLabel" />
        </div>
      </div>
    </div>
  </div>
</template>

<style>
#navbar {
  background-color: var(--black);
  display: flex;
  flex-direction: column;
  width: 96px;
  height: 100dvh;
  position: fixed;
  top: 0%;
  left: 0%;
  padding: 1rem 0.1rem 0rem 0.1rem;
  text-align: center;
  line-height: 1.5;
}

#navbar_contents__logo {
  padding-bottom: 3.5rem;
}

#navbar__contents {
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;

}

#navbar_contents--logo {
  font-size: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

#navbar_contents--items {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.navbar_item {
  cursor: pointer;
}

#navbar_contents--items_account,
#navbar_item--items_menu {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  align-items: center;
}

#navbar_contents--items_account {
  margin-bottom: 3.5rem;
}
</style>