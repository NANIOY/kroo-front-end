<template>
  <div>
    <!--<NavBar />-->
    <!--<topNavDash/>-->
    <topNav
    pageName="Dashboard"
    />
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
    <appliedJobs/>
  
    <div>
      Fake Dashboard
    </div>
  </div>
</template>

<script setup>
import NavBar from './components/NavBar.vue';
import topNavDash from './components/topNav/topNavDash.vue';
import topNav from './components/topNav/topNav.vue';
import largeButton from './components/buttons/LargeButton.vue';
import transparentButton from './components/buttons/TransparentButton.vue';
import normalButton from './components/buttons/NormalButton.vue';
import appliedJobs from './components/jobs/appliedJobs.vue';
</script>

<style scoped>

</style>
