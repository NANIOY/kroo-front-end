<template>
  <div>
    <!-- <NavBar />  -->
    <NavBarTop/>

    <br><br>
    <normalButton
      class="button--secondary"
      :hasIcon="true"
      :hasLabel="false"
      label="Label"
      iconName="NavArrowDown" 
    />
    <br><br>
  
    <div>
      Fake Dashboard
    </div>
  </div>
</template>

<script setup>
import NavBar from './components/NavBar.vue';
import NavBarTop from './components/NavBarTop.vue';
import largeButton from './components/buttons/LargeButton.vue';
import transparentButton from './components/buttons/TransparentButton.vue';
import normalButton from './components/buttons/NormalButton.vue';
</script>

<style scoped>

</style>
