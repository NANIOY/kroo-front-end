<script setup>
// IMPORT DASHBOARD COMPONENTS
import topNavDash from '../components/organisms/navigation/topNav/topNavDash.vue';
import JobCard from '../components/molecules/dashboard/JobCard.vue';
import JobSug from '../components/molecules/dashboard/JobSug.vue';
import Week from '../components/molecules/dashboard/Week.vue';
import ScheduleCard from '../components/molecules/dashboard/ScheduleCard.vue';
import Upgrade from '../components/molecules/dashboard/Upgrade.vue';

// IMPORT OTHER
import TransparentButton from '../components/atoms/buttons/TransparentButton.vue';
</script>

<template>
  <topNavDash />

  <div class="dashboard">

    <div class="dashboard__left">
      <div class="dashboard__left__active">
        <div class="dashboard__left__header">
          <h5>Active Jobs</h5>
          <TransparentButton class="dashboard__left__header__button" hasLabel="true" label="All jobs"
            iconName="NavArrowRight" iconPosition="right" />
        </div>
        <div class="dashboard__left__active__jobs">
          <JobCard cardType="highlight" date="Month 00" time="00:00 - 00:00" jobFunction="Function" city="City"
            street="Street, Number" />
          <JobCard cardType="default" date="Month 00" time="00:00 - 00:00" jobFunction="Function" city="City"
            street="Street, Number" />
          <JobCard cardType="default" date="Month 00" time="00:00 - 00:00" jobFunction="Function" city="City"
            street="Street, Number" />
        </div>
      </div>
      <!-- <div class="dashboard__left__sug">
        <JobSug />
      </div> -->
    </div>

    <!-- <div class="dashboard__right">
      <Week />
      <ScheduleCard title="Meeting with John" label="10:00 - 11:00" />
      <ScheduleCard title="Design review" label="13:00 - 14:00" type="personal" />
      <ScheduleCard title="Team meeting" label="15:00 - 16:00" />
      <Upgrade />
    </div> -->
  </div>
</template>

<style scoped>
/* GENERAL */
.dashboard {
  display: flex;
  flex-direction: row;
  gap: 64px;
}

/* LEFT */
.dashboard__left {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.dashboard__left__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

h5 {
  margin: 0;
  font-weight: 100;
  color: var(--black);
  text-transform: uppercase;
}

.dashboard__left__header__button {
  width: 100px;
  margin-right: -8px;
}

/* LEFT TOP */
.dashboard__left__active {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.dashboard__left__active__jobs {
  display: flex;
  flex-direction: row;
  gap: 24px;
}

/* LEFT BOTTOM */
</style>