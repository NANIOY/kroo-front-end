<script setup>
import NavBar from './components/organisms/navigation/NavBar.vue';
</script>

<template>
  <NavBar />
  <div class="router">
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped>
.router {
  margin-left: 96px;
}

.content {
  margin-left: 48px;
}
</style>