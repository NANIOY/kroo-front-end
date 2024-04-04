<script setup>
import AppliedJob from '../components/molecules/jobs/AppliedJob.vue';
import OfferedJob from '../components/molecules/jobs/OfferedJob.vue';
import OngoingJob from '../components/molecules/jobs/OngoingJob.vue';
import SavedJob from '../components/molecules/jobs/SavedJob.vue';
import SearchJob from '../components/molecules/jobs/SearchJob.vue';
</script>

<template>
  <SearchJob :employer="{ name: 'Employer', image: 'https://fakeimg.pl/400x400/000000/ffffff?text=logo' }"
    :job="{ title: 'Job Title', date: '2024-04-04', location: 'Location', hourlyRate: '$20' }" />

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