<script setup>
  import AppliedJob from '../components/molecules/jobs/AppliedJob.vue';
  import OfferedJob from '../components/molecules/jobs/OfferedJob.vue';
  import OngoingJob from '../components/molecules/jobs/OngoingJob.vue';
  import SavedJob from '../components/molecules/jobs/SavedJob.vue';
</script>

<template>

  <div id="tracker__container">

    <div class="tracker__container__SavedJob">
      <SavedJob />
    </div>

    <div class="tracker__container__AppliedJob">
      <AppliedJob />
    </div>

    <div class="tracker__container__OngoingJob">
      <OngoingJob />
    </div>

    <div class="tracker__container__OfferedJob">
      <OfferedJob />
    </div>
  </div>

</template>

<style scoped>

#tracker__container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 0;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
}

.tracker__container__AppliedJob,
.tracker__container__OfferedJob,
.tracker__container__OngoingJob,
.tracker__container__SavedJob {
  padding: 8px;
}

.tracker__container__SavedJob { 
  grid-area: 1 / 1 / 2 / 2; 
}

.tracker__container__AppliedJob { 
  grid-area: 1 / 2 / 2 / 3; 
}

.tracker__container__OngoingJob { 
  grid-area: 1 / 3 / 2 / 4; 
}

.tracker__container__OfferedJob { 
  grid-area: 1 / 4 / 2 / 5; 
}

</style>