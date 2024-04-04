<script setup>
import SearchJob from '../components/molecules/jobs/SearchJob.vue';
import { ref, onMounted } from 'vue';
import axios from 'axios';

const fetchedJobs = ref([]);

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

    // fetch location data for each job based on city name
    await Promise.all(fetchedJobs.value.map(async (job) => {
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
  } catch (error) {
    console.error('Error fetching jobs:', error);
  }
};

onMounted(() => {
  fetchJobs();
});
</script>

<template>
  <div>
    <SearchJob v-for="job in fetchedJobs" :key="job._id" :job="job" />
  </div>
</template>

<style scoped></style>