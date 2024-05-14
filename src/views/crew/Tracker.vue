<script setup>
  import AppliedJob from '../../components/molecules/jobs/AppliedJob.vue';
  import OfferedJob from '../../components/molecules/jobs/OfferedJob.vue';
  import OngoingJob from '../../components/molecules/jobs/OngoingJob.vue';
  import SavedJob from '../../components/molecules/jobs/SavedJob.vue';

  let jobCounts = {
    applied: 4,
    offered: 9,
    ongoing: 8,
    saved: 10
  };

</script>

<template>

  <div id="tracker__container">

    <div id="tracker__container--SavedJob"> 
      <h6 class="tracker__container__title">SAVED &#8722; {{ jobCounts.saved }}</h6>
      
      <div class="tracker__container__SavedJob">
        <SavedJob />
      </div>

    </div>

    <div id="tracker__container--AppliedJob">
      <h6 class="tracker__container__title">APPLIED &#8722; {{ jobCounts.applied }}</h6>

      <div class="tracker__container__AppliedJob">
        <AppliedJob />
      </div>
    </div>

    <div id="tracker__container--OngoingJob">
      <h6 class="tracker__container__title">ONGOING &#8722; {{ jobCounts.ongoing }}</h6>

      <div class="tracker__container__OngoingJob">
        <OngoingJob />
      </div>
    </div>


    <div id="tracker__container--OfferedJob">
      <h6 class="tracker__container__title">OFFERED &#8722; {{ jobCounts.offered }}</h6>

      <div class="tracker__container__OfferedJob">
        <OfferedJob />
      </div>
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

.tracker__container__title {
  margin-bottom: 8px;
}

</style>