<script setup>
import ProfileLeft from '../../components/organisms/profile/ProfileLeft.vue';
import ProfileRight from '../../components/organisms/profile/ProfileRight.vue';
</script>

<template>
  <div class="profile">
    <ProfileLeft />
    <ProfileRight />
  </div>
</template>

<style scoped>
  .profile {
    display: flex;
    gap: 80px;
  }
</style>