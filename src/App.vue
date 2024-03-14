<template>
  <div>
    <!-- <NavBar />  -->
    <NavBarTop/>
    <largeButton
      class="button--primary"
      :hasIcon="true"
      :hasLabel="true"
      label="Label"
      iconName="User"
    />
    <normalButton
      class="button--secondary"
      :hasIcon="true"
      :hasLabel="true"
      label="Label"
      iconName="User" 
    />
    <transparentButton
      class="button--tertiary"
      :hasIcon="true"
      :hasLabel="true"
      label="Label"
      iconName="User"
    />
  
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
