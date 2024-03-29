<script setup>
import topNavDash from '../components/organisms/navigation/topNav/topNavDash.vue';
import JobCard from '../components/molecules/dashboard/JobCard.vue';
import JobSug from '../components/molecules/dashboard/JobSug.vue';
</script>

<template>
  <topNavDash />
  <div>
    <JobCard cardType="highlight" date="Month 00" time="00:00 - 00:00" jobFunction="Function" city="City"
      street="Street, Number" />
    <JobCard cardType="default" date="Month 00" time="00:00 - 00:00" jobFunction="Function" city="City"
      street="Street, Number" />
    <JobSug image="https://fakeimg.pl/400x400/ff0000/ffffff?text=image" title="Software Engineer" location="New York"
      date="2024-04-01" time="10:00 - 12:00" />
  </div>

</template>

<style scoped></style>