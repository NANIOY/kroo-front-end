<script setup>
import SearchJob from '../../components/molecules/jobs/SearchJob.vue';
import JobPop from '../../components/molecules/popups/JobPop.vue';
import Overlay from '../../components/molecules/popups/Overlay.vue';
import SearchFilter from '../../components/molecules/filter/SearchFilter.vue';
import { ref, computed, onMounted } from 'vue';
import setupAxios from '../../setupAxios';

const axiosInstance = setupAxios();

const fetchedJobs = ref([]);
const selectedJob = ref(null);
const loading = ref(true);
const allJobsLoaded = ref(false);
const searchTerm = ref('');

const fetchJobs = async () => {
  try {
    const response = await axiosInstance.get('/crewjob/jobs');
    fetchedJobs.value = response.data.data.jobs.map(job => ({
      ...job,
      id: job._id
    }));

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

    if (fetchedJobs.value.length === 0) {
      allJobsLoaded.value = true;
    }
  } catch (error) {
    console.error('Error fetching jobs:', error);
  } finally {
    loading.value = false;
  }
};

const openJobPop = (job) => {
  selectedJob.value = job;
};

const closeJobPop = () => {
  selectedJob.value = null;
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
      <div v-if="loading" class="loading">Loading...</div>
      <div v-else>
        <div class="viewcontainer__jobs">
          <SearchJob v-for="job in filteredJobs" :key="job.id" :job="job" @jobClick="openJobPop" />
        </div>
        <div v-if="allJobsLoaded || filteredJobs.length === 0" class="end">No more jobs to display</div>
      </div>
    </div>

    <Overlay v-if="selectedJob" @overlayClick="closeJobPop">
      <JobPop v-if="selectedJob" :job="selectedJob" jobType="search" />
    </Overlay>
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
</style>