<template>
  <div>
    <NavBar /> <!-- Include the NavBar component -->
    <NavBarTop/>
    <Buttons /> <!-- Include the Buttons component -->
    <div>
      <!-- Your other content goes here -->
      Fake Dashboard
    </div>
  </div>
</template>

<script setup>
import NavBar from './components/NavBar.vue';
import NavBarTop from './components/NavBarTop.vue';
import Buttons from './components/Buttons.vue';
</script>

<style scoped>

</style>
