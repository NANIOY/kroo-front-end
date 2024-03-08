<template>
  <div>
    <!-- <NavBar />  -->
    <NavBarTop/>
    <LargeButton class="button--primary"
      :hasIcon="true"
      :hasLabel="false"
      label="Label"
    />
    <div>
      Fake Dashboard
    </div>
  </div>
</template>

<script setup>
import NavBar from './components/NavBar.vue';
import NavBarTop from './components/NavBarTop.vue';
// import Buttons from './components/Buttons.vue';
import LargeButton from './components/buttons/LargeButton.vue';
</script>

<style scoped>

</style>
