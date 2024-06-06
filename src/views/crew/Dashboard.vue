<script setup>
import { ref, onMounted } from 'vue';
import JobCard from '../../components/molecules/dashboard/JobCard.vue';
import JobSug from '../../components/molecules/dashboard/JobSug.vue';
import Week from '../../components/molecules/dashboard/Week.vue';
import ScheduleCard from '../../components/molecules/dashboard/ScheduleCard.vue';
import Upgrade from '../../components/molecules/dashboard/Upgrade.vue';
import TransparentButton from '../../components/atoms/buttons/TransparentButton.vue';
import JobPop from '../../components/molecules/popups/JobPop.vue';
import Overlay from '../../components/molecules/popups/Overlay.vue';
import setupAxios from '../../setupAxios';

import { useRouter } from 'vue-router';

const axiosInstance = setupAxios();
const router = useRouter();

const fetchedJobs = ref([]);
const activeJobs = ref([]);
const selectedJob = ref(null);

// NAVIGATION FUNCTIONS
const goToTracker = () => {
  router.push('/tracker');
};
const goToSearch = () => {
  router.push('/search');
};
const goToUpgrade = () => {
  router.push('/upgrade');
};

// Fetch active jobs
const fetchActiveJobs = async () => {
  const token = sessionStorage.getItem('sessionToken') || sessionStorage.getItem('rememberMeToken');
  if (!token) {
    console.error('Authentication token is missing');
    return;
  }

  try {
    const activeJobsResponse = await axiosInstance.get('/crewJob/activejobs', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    activeJobs.value = activeJobsResponse.data.activeJobs.map(job => ({
      ...job,
      id: job._id
    }));
  } catch (error) {
    console.error('Error fetching active jobs:', error);
  }
};

// Fetch job suggestions
const fetchJobSuggestions = async () => {
  try {
    const response = await axiosInstance.get('/crewjob/jobs');
    fetchedJobs.value = response.data.data.jobs.map(job => ({
      ...job,
      id: job._id
    }));

    // Fetch employer details for each job based on businessId
    await Promise.all(fetchedJobs.value.map(async (job) => {
      try {
        const businessResponse = await axiosInstance.get(`/business/${job.businessId}`);
        job.employer = {
          name: businessResponse.data.data.business.businessInfo.companyName,
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

// Open job popup when job is clicked
const openJobPop = (job) => {
  selectedJob.value = job;
};

// Close job popup
const closeJobPop = () => {
  selectedJob.value = null;
};

onMounted(() => {
  fetchActiveJobs();
  fetchJobSuggestions();
});
</script>

<template>
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
          <template v-if="activeJobs.length">
            <JobCard v-for="(job, index) in activeJobs" :key="index" :cardType="'default'" :date="job.date"
              :time="job.time" :jobFunction="job.jobFunction" :city="job.location.city" :street="job.location.street" />
          </template>
          <template v-else>
            <div class="no-active-jobs">
              <p>You dont have any active jobs at the moment.</p>
            </div>
          </template>
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
          <JobSug v-for="(job, index) in fetchedJobs.slice(0, 4)" :key="index" :job="job" @jobClick="openJobPop" />
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
      <JobPop v-if="selectedJob" :job="selectedJob" jobType="search" />
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

.dashboard {
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

/* Placeholder for no active jobs */
.no-active-jobs {
  min-height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--black);
  border: 1px dashed var(--light-gray);
  border-radius: 8px;
  padding: 16px;
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