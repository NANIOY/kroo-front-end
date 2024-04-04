<script setup>
import SearchJob from '../components/molecules/jobs/SearchJob.vue';
import { ref, onMounted } from 'vue';
import axios from 'axios';

// Define a reactive variable to store the fetched jobs
const fetchedJobs = ref([]);

// Function to fetch jobs from the backend
const fetchJobs = async () => {
  try {
    const response = await axios.get('https://kroo-back-end.onrender.com/api/v1/crewjob/jobs');
    fetchedJobs.value = response.data.data.jobs;

    // Fetch business details for each job
    // await Promise.all(fetchedJobs.value.map(async (job) => {
    //   const businessResponse = await axios.get(`https://kroo-back-end.onrender.com/api/v1/business/${job.businessId}`);
    //   job.employer = {
    //     name: businessResponse.data.data.business.name,
    //     image: businessResponse.data.data.business.businessInfo.logo
    //   };
    // }));
  } catch (error) {
    console.error('Error fetching jobs:', error);
  }
};

// Fetch jobs when the component is mounted
onMounted(() => {
  fetchJobs();
});
</script>

<template>
  <div>
    <!-- Loop through fetched jobs and render SearchJob component for each job -->
    <SearchJob v-for="job in fetchedJobs" :key="job._id" :job="job" />
    <!-- <SearchJob v-for="job in fetchedJobs" :key="job._id" :employer="job.employer" :job="job" /> -->
  </div>
</template>

<style scoped></style>