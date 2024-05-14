<script setup>
import TrackerJob from '../../components/molecules/jobs/TrackerJob.vue';

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
        <TrackerJob type="Saved" />
        <TrackerJob type="Saved" />
        <TrackerJob type="Saved" />
      </div>

    </div>

    <div class="tracker__container">
      <h6>APPLIED &#8722; {{ jobCounts.applied }}</h6>

      <div class="tracker__container__column">
        <TrackerJob type="Applied" />
        <TrackerJob type="Applied" />
        <TrackerJob type="Applied" />
      </div>
    </div>

    <div class="tracker__container">
      <h6>ONGOING &#8722; {{ jobCounts.ongoing }}</h6>

      <div class="tracker__container__column">
        <TrackerJob type="Ongoing" />
        <TrackerJob type="Ongoing" />
        <TrackerJob type="Ongoing" />
      </div>
    </div>


    <div class="tracker__container">
      <h6>OFFERED &#8722; {{ jobCounts.offered }}</h6>

      <div class="tracker__container__column">
        <TrackerJob type="Offered" />
        <TrackerJob type="Offered" />
        <TrackerJob type="Offered" />
      </div>
    </div>
  </div>

</template>

<style scoped>
#tracker {
  display: flex;
  justify-content: space-between;
}

.tracker__container {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.tracker__container__column {
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>