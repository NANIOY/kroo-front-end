<script setup>
  import AppliedJob from '../components/molecules/jobs/AppliedJob.vue';
  import OfferedJob from '../components/molecules/jobs/OfferedJob.vue';
  import OngoingJob from '../components/molecules/jobs/OngoingJob.vue';
  import SavedJob from '../components/molecules/jobs/SavedJob.vue';
</script>

<template>
  <div>
    <!-- <AppliedJob />
    <OfferedJob />
    <OngoingJob />
    <SavedJob /> -->
  </div>

</template>

<style scoped>
  div {
    display: flex;
    flex-direction: row;
    gap: 24px;
  }
</style>