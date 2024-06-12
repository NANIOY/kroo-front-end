<script setup>
import { ref, computed, onMounted } from 'vue';
import moment from 'moment';
import setupAxios from '../../setupAxios';
import SearchJob from '../../components/molecules/jobs/SearchJob.vue';
import SearchFilter from '../../components/molecules/filter/SearchFilter.vue';

const axiosInstance = setupAxios();

const fetchedJobs = ref([]);
const loading = ref(true);
const allJobsLoaded = ref(false);
const searchTerm = ref('');

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

const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const toRadians = (degree) => degree * (Math.PI / 180);
  const R = 6371; // earth radius in km
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // distance in km
};

const fetchJobs = async () => {
  try {
    const user = await fetchUserData();
    if (!user) return;

    const userFunctions = user.crewData?.basicInfo?.functions || [];
    const userSkills = user.crewData?.profileDetails?.skills || [];
    const userCity = user.crewData?.profileDetails?.city || '';
    const userCountry = user.crewData?.profileDetails?.country || '';
    const userWorkRadius = user.crewData?.profileDetails?.workRadius || 0;

    const userCoords = await getCoordinates(userCity, userCountry);
    if (!userCoords) return;

    const response = await axiosInstance.get('/crewjob/jobs');
    const jobs = response.data.data.jobs.map(job => ({
      ...job,
      id: job._id
    }));

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

    const jobMatches = await Promise.all(jobs.map(async (job) => {
      const functionMatch = userFunctions.includes(job.jobFunction) ? 4 : 0;
      const skillMatchCount = functionMatch > 0 ? job.skills.reduce((count, skill) => {
        return count + (userSkills.includes(skill) ? 1 : 0);
      }, 0) : 0;

      const jobCoords = await getCoordinates(job.location.city, job.location.country);
      let locationMatch = 0;
      if (jobCoords) {
        const distance = calculateDistance(userCoords.lat, userCoords.lon, jobCoords.lat, jobCoords.lon);
        locationMatch = distance <= userWorkRadius ? (functionMatch > 0 ? 3 : 1) : 0;
      }

      let languageMatch = 0;
      if (functionMatch > 0) {
        try {
          const businessResponse = await axiosInstance.get(`/business/${job.businessId}`);
          const businessLanguages = businessResponse.data.data.business.businessInfo.languages || [];
          const userLanguages = user.crewData?.profileDetails?.languages || [];
          languageMatch = businessLanguages.some(lang => userLanguages.includes(lang)) ? 2 : 0;
        } catch (error) {
          console.error('Error fetching business details:', error);
        }
      }

      let availabilityMatch = 0;
      let overlaps = [];
      try {
        const userId = sessionStorage.getItem('userId');
        const eventsResponse = await axiosInstance.get(`/calendar/google/events?userId=${userId}`);
        const events = eventsResponse.data;

        const jobStart = moment(job.date);
        const jobEnd = moment(jobStart).add(2, 'hours');

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

        availabilityMatch = isAvailable ? 5 : (functionMatch > 0 ? 0 : 2);
      } catch (error) {
        console.error('Error fetching user events:', error);
      }

      const totalMatchScore = functionMatch + skillMatchCount + locationMatch + languageMatch + availabilityMatch;
      return { ...job, matchScore: totalMatchScore };
    }));

    fetchedJobs.value = jobMatches.sort((a, b) => b.matchScore - a.matchScore);
    if (fetchedJobs.value.length === 0) {
      allJobsLoaded.value = true;
    }
  } catch (error) {
    console.error('Error fetching jobs:', error);
  } finally {
    loading.value = false;
  }
};

const filteredJobs = computed(() => {
  return fetchedJobs.value.filter(job => job.title.toLowerCase().includes(searchTerm.value.toLowerCase()));
});

const handleSearch = (value) => {
  searchTerm.value = value;
};

onMounted(() => {
  fetchJobs();
});
</script>

<template>
  <div class="viewcontainer">
    <SearchFilter @search="handleSearch" />

    <div class="jobs-container">
      <div v-if="loading" class="viewcontainer__jobs">
        <!-- Skeleton Loader for each job placeholder -->
        <SearchJob v-for="n in 15" :key="n" :job="null" />
      </div>
      <div v-else>
        <div class="viewcontainer__jobs">
          <SearchJob v-for="job in filteredJobs" :key="job.id" :job="job" />
        </div>
        <div v-if="allJobsLoaded || filteredJobs.length === 0" class="end">No more jobs to display</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.viewcontainer {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 40px;
}

.jobs-container {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.viewcontainer__jobs {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 24px;
  margin-bottom: 48px;
}

.loading,
.end {
  text-align: center;
  font-size: 18px;
  margin-top: 20px;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 24px;
  gap: 12px;
}

.pagination__button {
  width: 40px;
  height: 40px;
  font-weight: 100;
}

.no-label {
  padding: 0;
}

.pagination__button--arrow {
  margin: 0 16px;
}

.pagination__button.active {
  font-weight: 900;
  color: var(--blurple) !important;
}

.pagination__button:disabled {
  opacity: 0;
}

/* SKELETON LOADER */
.container.skeleton {
  width: calc(33.333% - 16px);
  height: 282px;
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