<template>
  <router-view id="body"></router-view>
  <NavBar />
</template>

<script setup>
import NavBar from './components/NavBar.vue';


</script>

<style scoped>
#body {
  margin-left: 144px;
}

</style>