<script setup>
import TransparentButton from '../../../atoms/buttons/TransparentButton.vue';

const currentDate = new Date();
const options = { day: 'numeric', month: 'long' };
const formattedDate = currentDate.toLocaleDateString('en-GB', options);
const dayName = currentDate.toLocaleDateString('en-GB', { weekday: 'long' });

</script>

<template>
  <div id="navbarTop">
    <div id="navbarTop_left">
      <div id="navbarTop_left_date">
        <p class="text-bold-l">{{ formattedDate }}</p>
      </div>
      <div id="navbarTop_left_day">
        <p class="text-reg-normal">{{ dayName }}</p>
      </div>
    </div>

    <div id="navbarTop_right">
      <div id="navbarTop_right_account">
        <div id="navbarTop_right_account_image">
          <div id="navbarTop_right_account_image_wrapper">
            <img class="radius-full" src="https://placehold.co/56x56" alt="profile image">
          </div>
        </div>
        <div id="navbarTop_right_account_info">
          <div id="navbarTop_right_account_info_name">
            <p class="text-bold-l">name</p>
          </div>
          <div id="navbarTop_right_account_info_function">
            <p class="text-reg-normal">function</p>
          </div>
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
  padding: 0px 8px 16px 8px;
  margin: 32px 0px 36px 0px;
  border-bottom: 1px solid var(--neutral-70);
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

p {
  margin: 0;
}
</style>