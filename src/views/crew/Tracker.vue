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

  <div id="tracker">

    <div class="tracker__container">
      <h6>SAVED &#8722; {{ jobCounts.saved }}</h6>

      <div class="tracker__container__column">
        <SavedJob />
      </div>

    </div>

    <div class="tracker__container">
      <h6>APPLIED &#8722; {{ jobCounts.applied }}</h6>

      <div class="tracker__container__column">
        <AppliedJob />
      </div>
    </div>

    <div class="tracker__container">
      <h6>ONGOING &#8722; {{ jobCounts.ongoing }}</h6>

      <div class="tracker__container__column">
        <OngoingJob />
      </div>
    </div>


    <div class="tracker__container">
      <h6>OFFERED &#8722; {{ jobCounts.offered }}</h6>

      <div class="tracker__container__column">
        <OfferedJob />
      </div>
    </div>
  </div>

</template>

<style scoped>
#tracker {
  display: flex;
  justify-content: space-between;
  gap: 16px;
}

.tracker__container {
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
}

.tracker__container__column {
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-height: 768px;
  overflow-y: auto;
}

.tracker__container__column::-webkit-scrollbar {
  display: none;
}

.tracker__container__column {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>