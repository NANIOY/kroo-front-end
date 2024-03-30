<script setup>
import { defineProps } from 'vue';
import TransparentButton from '../../../atoms/buttons/TransparentButton.vue';

const props = defineProps(['name', 'func', 'profileImage']);

const currentDate = new Date();
const options = { day: 'numeric', month: 'long' };
const formattedDate = currentDate.toLocaleDateString('en-GB', options);
const dayName = currentDate.toLocaleDateString('en-GB', { weekday: 'long' });
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