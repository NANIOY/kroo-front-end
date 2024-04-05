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
import JobPop from '../components/molecules/popups/JobPop.vue';
import Overlay from '../components/molecules/popups/Overlay.vue';

import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import axios from 'axios';

const router = useRouter();

const goToTracker = () => {
  router.push('/tracker');
};

const goToSearch = () => {
  router.push('/search');
};

const goToUpgrade = () => {
  router.push('/upgrade');
};

const fetchedJobs = ref([]);
const selectedJob = ref(null);

// fetch job suggestions
const fetchJobSuggestions = async () => {
  try {
    const response = await axios.get('https://kroo-back-end.onrender.com/api/v1/crewjob/jobs');
    fetchedJobs.value = response.data.data.jobs.map(job => ({
      ...job,
      id: job._id
    }));

    // fetch employer details for each job based on businessId
    await Promise.all(fetchedJobs.value.map(async (job) => {
      try {
        const businessResponse = await axios.get(`https://kroo-back-end.onrender.com/api/v1/business/${job.businessId}`);
        job.employer = {
          name: businessResponse.data.data.business.name,
          image: businessResponse.data.data.business.businessInfo.logo
        };
      } catch (error) {
        console.error('Error fetching employer details:', error);
      }
    }));
  } catch (error) {
    console.error('Error fetching jobs:', error);
  }
};

const openJobPop = (job) => {
  selectedJob.value = job;
};

const closeJobPop = () => {
  selectedJob.value = null;
};

onMounted(() => {
  fetchJobSuggestions();
});
</script>

<template>
  <topNavDash name="John Smith" func="Gaffer" :profileImage="'https://placehold.co/56x56'" />

  <div class="dashboard">

    <div class="dashboard__left">
      <div class="dashboard__left__block">
        <div class="dashboard__left__header">
          <h5>Active Jobs</h5>
          <TransparentButton @click="goToTracker"
            class="dashboard__left__header__button dashboard__left__header__button--active" hasLabel="true"
            label="All jobs" iconName="NavArrowRight" iconPosition="right" />
        </div>
        <div class="dashboard__left__block--active__jobs">
          <JobCard cardType="highlight" date="Month 00" time="00:00 - 00:00" jobFunction="Function" city="City"
            street="Street, Number" />
          <JobCard cardType="default" date="Month 00" time="00:00 - 00:00" jobFunction="Function" city="City"
            street="Street, Number" />
          <JobCard cardType="default" date="Month 00" time="00:00 - 00:00" jobFunction="Function" city="City"
            street="Street, Number" />
        </div>
      </div>

      <div class="dashboard__left__block">
        <div class="dashboard__left__header">
          <h5>Job Suggestions</h5>
          <TransparentButton @click="goToSearch"
            class="dashboard__left__header__button dashboard__left__header__button--sug" hasLabel="true"
            label="Search more" iconName="NavArrowRight" iconPosition="right" />
        </div>
        <div class="dashboard__left__block--sug__jobs">
          <JobSug v-for="job in fetchedJobs" :key="job.title" :job="job" @jobClick="openJobPop" />
        </div>
      </div>
    </div>

    <div class="dashboard__right">
      <div class="dashboard__right__schedule">
        <Week />
        <div class="dashboard__right__schedule__cards">
          <ScheduleCard title="Meeting with John" label="10:00 - 11:00" class="schedulecard" />
          <ScheduleCard title="Design review" label="13:00 - 14:00" type="personal" class="schedulecard" />
          <ScheduleCard title="Team meeting" label="15:00 - 16:00" class="schedulecard" />
          <ScheduleCard title="Meeting with John" label="10:00 - 11:00" class="schedulecard" />
          <ScheduleCard title="Design review" label="13:00 - 14:00" type="personal" class="schedulecard" />
          <ScheduleCard title="Team meeting" label="15:00 - 16:00" class="schedulecard" />
        </div>
      </div>
      <Upgrade @click="goToUpgrade" />
    </div>
    <Overlay v-if="selectedJob" @overlayClick="closeJobPop">
      <JobPop v-if="selectedJob" :job="selectedJob" />
    </Overlay>
  </div>
</template>

<style scoped>
.dashboard,
.dashboard__left,
.dashboard__left__block,
.dashboard__left__header,
.dashboard__left__block--active__jobs,
.dashboard__right,
.dashboard__right__schedule,
.dashboard__right__schedule__cards,
.schedulecard {
  display: flex;
}

.dashboard,
.dashboard__left__block--active__jobs {
  flex-direction: row;
}

.dashboard__left,
.dashboard__left__block,
.dashboard__right,
.dashboard__right__schedule,
.dashboard__right__schedule__cards {
  flex-direction: column;
}

.dashboard__left__block,
.dashboard__left__block--sug__jobs,
.dashboard__right,
.dashboard__right__schedule__cards {
  gap: 16px;
}

.dashboard__left__block--active__jobs,
.dashboard__right__schedule {
  gap: 24px;
}

/* GENERAL */
.dashboard {
  gap: 64px;
}

/* LEFT */
.dashboard__left {
  gap: 32px;
}

.dashboard__left__header {
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
  width: 136px;
  margin-right: -12px;
  margin-top: -8px;
}

.dashboard__left__header__button--active {
  margin-right: -32px;
}

.dashboard__left__block--sug__jobs {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}

/* RIGHT */
.dashboard__right,
.dashboard__right__schedule {
  flex: 1;
}

.dashboard__right__schedule__cards {
  max-height: 392px;
  overflow-y: scroll;
  overflow-x: hidden;
  scrollbar-width: none;
}

.schedulecard {
  min-height: 80px;
}
</style>