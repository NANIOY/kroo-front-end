<script setup>
  import topNavDash from '../components/organisms/navigation/topNav/topNavDash.vue';
  import JobCard from '../components/molecules/dashboard/JobCard.vue';
</script>

<template>
  <topNavDash />
  <div>
    <JobCard cardType="highlight" date="Month 00" time="00:00 - 00:00" jobFunction="Function" city="City" street="Street, Number" />
    <JobCard cardType="default" date="Month 00" time="00:00 - 00:00" jobFunction="Function" city="City" street="Street, Number" />
  </div>

</template>

<style scoped></style>