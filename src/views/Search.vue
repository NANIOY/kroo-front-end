<script setup>
import SearchJob from '../components/molecules/jobs/SearchJob.vue';
import JobPop from '../components/molecules/popups/JobPop.vue';
import Overlay from '../components/molecules/popups/Overlay.vue';
import SearchFilter from '../components/molecules/filter/SearchFilter.vue';
import { ref, onMounted } from 'vue';
import axios from 'axios';

const fetchedJobs = ref([]);
const selectedJob = ref(null);

// fetch all jobs
const fetchJobs = async () => {
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

    // batch processing for location data
    const batchSize = 9;
    for (let i = 0; i < fetchedJobs.value.length; i += batchSize) {
      const batchJobs = fetchedJobs.value.slice(i, i + batchSize);

      // fetch location data for each job based on city name
      await Promise.all(batchJobs.map(async (job) => {
        try {
          // use OpenStreetMap Nominatim API to fetch location data based on city name
          // const locationResponse = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(job.location)}`);
          // const locationData = locationResponse.data[0];

          // Extracting the country directly from job data assuming it's already available
          // Since the original API call is commented out, we use a placeholder here
          // Replace 'locationData' with the actual location data fetched from the API
          const locationData = {
            display_name: job.location + ', Country Name'
          };

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

// open job popup when job is clicked
const openJobPop = (job) => {
  selectedJob.value = job;
};

// close job popup
const closeJobPop = () => {
  selectedJob.value = null;
};

onMounted(() => {
  fetchJobs();
});
</script>

<template>
  <div class="viewcontainer">
    <SearchFilter />
    <div class="viewcontainer__jobs">
      <SearchJob v-for="job in fetchedJobs" :key="job._id" :job="job" @jobClick="openJobPop" />
    </div>
    <Overlay v-if="selectedJob" @overlayClick="closeJobPop">
      <JobPop v-if="selectedJob" :job="selectedJob" />
    </Overlay>
  </div>
</template>

<style scoped>
.viewcontainer {
  display: flex;
  flex-direction: row;
}

.viewcontainer__jobs {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  max-width: 1392px;
  margin-left: auto;
  margin-bottom: 48px;
}
</style>