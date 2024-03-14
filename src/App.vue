<template>
  <div>
    <!-- <NavBar />  -->
    <NavBarTop/>
    <largeButton class="button--primary"
      :hasIcon="true"
      :hasLabel="false"
      label="Label"
    />
    <largeButton class="button--secondary"
      :hasIcon="true"
      :hasLabel="false"
      label="Label"
    />
    <largeButton class="button--tertiary button__stroke"
      :hasIcon="true"
      :hasLabel="false"
      label="Label"
    />
    <largeButton class="button--disabled"
      :hasIcon="true"
      :hasLabel="false"
      label="Label"
      :disabled="true"
    />

    <br><br>
    <normalButton
      class="button--primary"
      :hasIcon="true"
      :hasLabel="false"
      label="Label"
      :iconName="'User'" 
    />
    <normalButton class="button--secondary "
      :hasIcon="true"
      :hasLabel="false"
      label="Label"
    />
    <normalButton class="button--tertiary button__stroke"
      :hasIcon="true"
      :hasLabel="false"
      label="Label"
    />
    <normalButton class="button--disabled "
      :hasIcon="true"
      :hasLabel="false"
      label="Label"
    />

    <br><br>
    <transparentButton class="button--primary--transparent"
      :hasIcon="true"
      :hasLabel="false"
      label="Label"
    />
    <transparentButton class="button--secondary--transparent"
      :hasIcon="true"
      :hasLabel="false"
      label="Label"
    />
    <transparentButton class="button--tertiary--transparent"
      :hasIcon="true"
      :hasLabel="false"
      label="Label"
    />
    <transparentButton class="button--disabled--transparent"
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
import largeButton from './components/buttons/LargeButton.vue';
import transparentButton from './components/buttons/TransparentButton.vue';
import normalButton from './components/buttons/NormalButton.vue';
</script>

<style scoped>

</style>
