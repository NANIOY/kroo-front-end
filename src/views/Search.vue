<script setup>
import SearchJob from '../components/molecules/jobs/SearchJob.vue';
import JobPop from '../components/molecules/popups/JobPop.vue';
import Overlay from '../components/molecules/popups/Overlay.vue';
import { ref, onMounted } from 'vue';
import axios from 'axios';

const fetchedJobs = ref([]);
const selectedJob = ref(null);

const fetchJobs = async () => {
  try {
    const response = await axios.get('https://kroo-back-end.onrender.com/api/v1/crewjob/jobs');
    fetchedJobs.value = response.data.data.jobs;

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

    // batch processing for location data
    const batchSize = 9;
    for (let i = 0; i < fetchedJobs.value.length; i += batchSize) {
      const batchJobs = fetchedJobs.value.slice(i, i + batchSize);

      // fetch location data for each job based on city name
      await Promise.all(batchJobs.map(async (job) => {
        try {
          // use OpenStreetMap Nominatim API to fetch location data based on city name
          const locationResponse = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(job.location)}`);
          const locationData = locationResponse.data[0];

          // extract country from location data
          if (locationData) {
            job.location = {
              city: job.location,
              country: locationData.display_name.split(',').pop().trim()
            };
          } else {
            console.error('Location data not found for:', job.location);
          }
        } catch (error) {
          console.error('Error fetching location data:', error);
        }
      }));
    }
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
  fetchJobs();
});
</script>

<template>
  <div>
    <div class="flexcontainer">
      <SearchJob v-for="job in fetchedJobs" :key="job._id" :job="job" @jobClick="openJobPop" />
    </div>
    <Overlay v-if="selectedJob" @overlayClick="closeJobPop">
      <JobPop v-if="selectedJob" :job="selectedJob" />
    </Overlay>
  </div>
</template>

<style scoped>
.flexcontainer {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  max-width: 1392px;
  margin-left: auto;
  margin-bottom: 48px;
}
</style>