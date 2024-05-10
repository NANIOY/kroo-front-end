<script setup>
import SearchJob from '../../components/molecules/jobs/SearchJob.vue';
import JobPop from '../../components/molecules/popups/JobPop.vue';
import Overlay from '../../components/molecules/popups/Overlay.vue';
import SearchFilter from '../../components/molecules/filter/SearchFilter.vue';
import TransparentButton from '../../components/atoms/buttons/TransparentButton.vue';
import NormalButton from '../../components/atoms/buttons/NormalButton.vue';
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';

const fetchedJobs = ref([]);
const selectedJob = ref(null);
const currentPage = ref(1);
const jobsPerPage = 12;

const paginatedJobs = computed(() => {
  const startIndex = (currentPage.value - 1) * jobsPerPage;
  const endIndex = startIndex + jobsPerPage;
  return fetchedJobs.value.slice(startIndex, endIndex);
});

const totalPages = computed(() => Math.ceil(fetchedJobs.value.length / jobsPerPage));

const visiblePages = computed(() => {
  const pages = [];
  let startPage = currentPage.value - 3;
  let endPage = currentPage.value + 3;
  if (startPage < 1) {
    startPage = 1;
    endPage = Math.min(totalPages.value, 7);
  }
  if (endPage > totalPages.value) {
    endPage = totalPages.value;
    startPage = Math.max(1, endPage - 6);
  }
  for (let page = startPage; page <= endPage; page++) {
    pages.push(page);
  }
  return pages;
});

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

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const goToPage = (page) => {
  currentPage.value = page;
};

onMounted(() => {
  fetchJobs();
});
</script>

<template>
  <div class="viewcontainer">
    <SearchFilter />

    <div class="jobs-container">
      <div class="viewcontainer__jobs">
        <SearchJob v-for="job in paginatedJobs" :key="job._id" :job="job" @jobClick="openJobPop" />
      </div>

      <div class="pagination">
        <NormalButton @click="previousPage" :disabled="currentPage === 1" iconName="NavArrowLeft"
          class="pagination__button pagination__button--arrow button--tertiary" />
        <template v-for="(page, index) in visiblePages" :key="index">
          <template v-if="index === 0">
            <TransparentButton @click="goToPage(1)" :class="{ active: 1 === currentPage }" :label="1"
              class="pagination__button" />
          </template>
          <template v-if="index === 1 && page !== 2">
            <span class="pagination__ellipsis">...</span>
          </template>
          <template v-if="index !== 0 && index !== visiblePages.length - 1">
            <TransparentButton @click="goToPage(page)" :class="{ active: page === currentPage }" :label="page"
              class="pagination__button" />
          </template>
          <template v-if="index === visiblePages.length - 1">
            <span class="pagination__ellipsis">...</span>
          </template>
          <template v-if="index === visiblePages.length - 1">
            <TransparentButton @click="goToPage(totalPages)" :class="{ active: totalPages === currentPage }"
              :label="totalPages" class="pagination__button" />
          </template>
        </template>
        <NormalButton @click="nextPage" :disabled="currentPage === totalPages" iconName="NavArrowRight"
          class="pagination__button pagination__button--arrow button--tertiary" />
      </div>
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

.jobs-container {
  display: flex;
  flex-direction: column;
}

.viewcontainer__jobs {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 24px;
  margin-bottom: 48px;
}

/* PAGINATION */
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
</style>