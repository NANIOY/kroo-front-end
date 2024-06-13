<script setup>
import { ref, onMounted } from 'vue';
import moment from 'moment';
import JobCard from '../../components/molecules/dashboard/JobCard.vue';
import JobSug from '../../components/molecules/dashboard/JobSug.vue';
import Week from '../../components/molecules/dashboard/Week.vue';
import ScheduleCard from '../../components/molecules/dashboard/ScheduleCard.vue';
import Upgrade from '../../components/molecules/dashboard/Upgrade.vue';
import TransparentButton from '../../components/atoms/buttons/TransparentButton.vue';
import JobPop from '../../components/molecules/popups/JobPop.vue';
import setupAxios from '../../setupAxios';

import { useRouter } from 'vue-router';

const axiosInstance = setupAxios();
const router = useRouter();

const fetchedJobs = ref([]);
const activeJobs = ref([]);
const selectedJob = ref(null);
const isJobPopVisible = ref(false);
const loading = ref(true);

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

// fetch user data
const fetchUserData = async () => {
  const token = sessionStorage.getItem('sessionToken') || sessionStorage.getItem('rememberMeToken');
  const userId = sessionStorage.getItem('userId');
  if (!token || !userId) {
    console.error('Authentication token or user ID is missing');
    return null;
  }

  try {
    const userResponse = await axiosInstance.get(`/user/${userId}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const userData = userResponse.data.data.user;
    if (!userData) {
      console.error('User data is missing');
      return null;
    }

    const crewDataId = userData.crewData?._id;
    if (crewDataId) {
      const crewResponse = await axiosInstance.get(`/crew/${crewDataId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const crewData = crewResponse.data.data;
      if (crewData && crewData.basicInfo) {
        userData.crewData = crewData;
      } else {
        console.error('Crew data is missing');
      }
    }

    return userData;
  } catch (error) {
    console.error('Failed to fetch user data:', error);
    return null;
  }
};

// fetch active jobs
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

    // sort active jobs based on their dates
    activeJobs.value = activeJobsResponse.data.activeJobs
      .map(job => ({
        ...job,
        id: job._id,
        date: new Date(job.date)
      }))
      .sort((a, b) => a.date - b.date)
      .slice(0, 3)
      .map((job, index) => ({
        ...job,
        cardType: index === 0 ? 'highlight' : 'default'
      }));
  } catch (error) {
    console.error('Error fetching active jobs:', error);
  }
};

// fetch coordinates for a city and country
const getCoordinates = async (city, country) => {
  try {
    const response = await axiosInstance.get('/geo/coordinates', {
      params: {
        city: city,
        country: country,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching coordinates:', error);
    return null;
  }
};

// distance calculation between two coordinates
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const toRadians = (degree) => degree * (Math.PI / 180);
  const R = 6371; // earth radius in km
  const dLat = toRadians(lat2 - lat1); // lat2 - lat1
  const dLon = toRadians(lon2 - lon1); // lon2 - lon1
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // distance in km
};

// fetch job suggestions based on user data
const fetchJobSuggestions = async () => {
  try {
    const user = await fetchUserData();
    if (!user) return;

    const userFunctions = user.crewData?.basicInfo?.functions || [];
    const userSkills = user.crewData?.profileDetails?.skills || [];
    const userCity = user.crewData?.profileDetails?.city || '';
    const userCountry = user.crewData?.profileDetails?.country || '';
    const userWorkRadius = user.crewData?.profileDetails?.workRadius || 0;

    // get user coordinates based on city and country
    const userCoords = await getCoordinates(userCity, userCountry);
    if (!userCoords) return;

    const response = await axiosInstance.get('/crewjob/jobs');
    const jobs = response.data.data.jobs.map(job => ({
      ...job,
      id: job._id
    }));

    // fetch employer details for each job
    await Promise.all(jobs.map(async (job) => {
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

    // process job matches
    const jobMatches = await Promise.all(jobs.map(async (job) => {
      const functionMatch = userFunctions.includes(job.jobFunction) ? 4 : 0; // 4 points for function match
      const skillMatchCount = functionMatch > 0 ? job.skills.reduce((count, skill) => {
        return count + (userSkills.includes(skill) ? 1 : 0); // 1 point for each skill match
      }, 0) : 0; // 0 skill points if function doesn't match

      // calculate location match
      const jobCoords = await getCoordinates(job.location.city, job.location.country);
      let locationMatch = 0;
      if (jobCoords) {
        const distance = calculateDistance(userCoords.lat, userCoords.lon, jobCoords.lat, jobCoords.lon);
        locationMatch = distance <= userWorkRadius ? (functionMatch > 0 ? 3 : 1) : 0; // 3 points if within work radius and function matches, 1 point if function doesn't match
      }

      // fetch business details to get languages
      let languageMatch = 0;
      if (functionMatch > 0) { // only consider language match if function matches
        try {
          const businessResponse = await axiosInstance.get(`/business/${job.businessId}`);
          const businessLanguages = businessResponse.data.data.business.businessInfo.languages || [];
          const userLanguages = user.crewData?.profileDetails?.languages || [];
          languageMatch = businessLanguages.some(lang => userLanguages.includes(lang)) ? 2 : 0; // 2 points if at least one language matches
        } catch (error) {
          console.error('Error fetching business details:', error);
        }
      }

      // fetch user events to check availability
      let availabilityMatch = 0;
      let overlaps = [];
      try {
        const userId = sessionStorage.getItem('userId');
        const eventsResponse = await axiosInstance.get(`/calendar/google/events?userId=${userId}`);
        const events = eventsResponse.data;

        const jobStart = moment(job.date);
        const jobEnd = moment(jobStart).add(2, 'hours'); // assuming each job is 2 hours long, adjust as necessary

        const isAvailable = !events.some(event => {
          const eventStartStr = event.start.dateTime || event.start.date;
          const eventEndStr = event.end.dateTime || event.end.date;

          const eventStart = moment(eventStartStr);
          const eventEnd = moment(eventEndStr);

          if (!eventStart.isValid() || !eventEnd.isValid()) {
            console.error('Invalid event dates:', event);
            return false;
          }

          const overlap = (jobStart.isBefore(eventEnd) && jobEnd.isAfter(eventStart));
          if (overlap) {
            overlaps.push({ eventStart: eventStart.toISOString(), eventEnd: eventEnd.toISOString() });
          }
          return overlap;
        });

        // calculate availability match points
        if (isAvailable) {
          availabilityMatch = 5; // 5 points if no overlap
        } else {
          availabilityMatch = functionMatch > 0 ? 0 : 2; // 2 points if overlap and no function match
        }

      } catch (error) {
        console.error('Error fetching user events:', error);
      }

      const totalMatchScore = functionMatch + skillMatchCount + locationMatch + languageMatch + availabilityMatch;
      return { ...job, matchScore: totalMatchScore };
    }));

    // sort job matches based on match score
    fetchedJobs.value = jobMatches.sort((a, b) => b.matchScore - a.matchScore);

  } catch (error) {
    console.error('Error fetching jobs:', error);
  } finally {
    loading.value = false;
  }
};


// open job popup when job is clicked
const openJobPop = (job) => {
  selectedJob.value = job;
  isJobPopVisible.value = true;
};

const closeJobPop = () => {
  isJobPopVisible.value = false;
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
      <div class="dashboard__left__block" v-if="activeJobs.length">
        <div class="dashboard__left__header">
          <h5>Active Jobs</h5>
          <TransparentButton @click="goToTracker"
            class="dashboard__left__header__button dashboard__left__header__button--active" hasLabel="true"
            label="All jobs" iconName="NavArrowRight" iconPosition="right" />
        </div>
        <div class="dashboard__left__block--active__jobs">
          <JobCard v-for="(job, index) in activeJobs" :key="index" :date="job.date" :time="job.time"
            :jobFunction="job.jobFunction" :city="job.location.city"
            :street="job.location.address || job.location.street" :cardType="index === 0 ? 'highlight' : 'default'" />
        </div>
      </div>

      <div class="dashboard__left__block">
        <div class="dashboard__left__header">
          <h5>Job Suggestions</h5>
          <TransparentButton @click="goToSearch"
            class="dashboard__left__header__button dashboard__left__header__button--sug" hasLabel="true"
            label="Search more" iconName="NavArrowRight" iconPosition="right" />
        </div>
        <div>
          <div v-if="loading" class="skeleton-container">
            <JobSug class="container" v-for="n in (activeJobs.length ? 4 : 8)" :key="n" :job="null" />
          </div>
          <div v-else
            :class="{ 'dashboard__left__block--sug__jobs': true, 'dashboard__left__block--sug__jobs--wide': !activeJobs.length }">
            <JobSug v-for="(job, index) in fetchedJobs.slice(0, activeJobs.length ? 4 : 8)" :key="index" :job="job"
              @jobClick="openJobPop(job)" />
          </div>
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
    <JobPop v-if="isJobPopVisible" :job="selectedJob" jobType="search" :isVisible="isJobPopVisible"
      @close="closeJobPop" />
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

.dashboard__left__block--sug__jobs--wide {
  gap: 28px;
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

.no-active-jobs {
  width: 100%;
  height: 304px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--black);
  border: 1px dashed var(--light-gray);
  border-radius: 8px;
  text-align: center;
  font-size: 1.2em;
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

/* Skeleton Loader */
.skeleton-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 28px;
}

.skeleton-container .container {
  background-color: var(--neutral-20);
  border-radius: 4px;
  animation: pulse 0.2s infinite alternate;
}

@keyframes pulse {
  0% {
    opacity: 0.8;
  }

  100% {
    opacity: 1;
  }
}
</style>