<template>
  <div>
    <!-- <NavBar />  -->
    <NavBarTop/>
    <LargeButton class="button--primary"
      :hasIcon="true"
      :hasLabel="false"
      label="Label"
    />
    <LargeButton class="button--secondary"
      :hasIcon="true"
      :hasLabel="false"
      label="Label"
    />
    <LargeButton class="button--tertiary button__stroke"
      :hasIcon="true"
      :hasLabel="false"
      label="Label"
    />
    <LargeButton class="button--primary"
      :hasIcon="true"
      :hasLabel="false"
      label="Label"
      :disabled="true"
    />

    <br><br>
    <NormalButton class="button--primary "
      :hasIcon="true"
      :hasLabel="false"
      label="Label"
    />
    <NormalButton class="button--secondary "
      :hasIcon="true"
      :hasLabel="false"
      label="Label"
    />
    <NormalButton class="button--tertiary button__stroke"
      :hasIcon="true"
      :hasLabel="false"
      label="Label"
    />
    <NormalButton class="button--primary "
      :hasIcon="true"
      :hasLabel="false"
      label="Label"
    />

    <br><br>
    <TransparentButton class="button--primary"
      :hasIcon="true"
      :hasLabel="false"
      label="Label"
    />
    <TransparentButton class="button--secondary"
      :hasIcon="true"
      :hasLabel="false"
      label="Label"
    />
    <TransparentButton class="button--tertiary "
      :hasIcon="true"
      :hasLabel="false"
      label="Label"
    />
    <TransparentButton class="button--tertiary "
      :hasIcon="true"
      :hasLabel="false"
      label="Label"
      :disabled="true"
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
import TransparentButton from './components/buttons/TransparentButton.vue';
import NormalButton from './components/buttons/NormalButton.vue';
</script>

<style scoped>

</style>
