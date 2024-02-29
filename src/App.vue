<template>
  <div>
    <NavBar /> <!-- Include the NavBar component -->
    <NavBarTop/>
    <div>
      <!-- Your other content goes here -->
      Fake Dashboard
    </div>
  </div>
</template>

<script setup>
import NavBar from './components/NavBar.vue';  // Update the path if needed
import NavBarTop from './components/NavBarTop.vue';  // Update the path if needed
</script>

<style scoped>
/* Your styles for the App component go here */
</style>
