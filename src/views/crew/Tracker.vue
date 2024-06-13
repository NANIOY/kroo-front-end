<script setup>
import { ref, onMounted } from 'vue';
import AppliedJob from '../../components/molecules/jobs/AppliedJob.vue';
import OfferedJob from '../../components/molecules/jobs/OfferedJob.vue';
import OngoingJob from '../../components/molecules/jobs/OngoingJob.vue';
import SavedJob from '../../components/molecules/jobs/SavedJob.vue';
import setupAxios from '../../setupAxios';

const jobCounts = ref({
  ongoing: 0,
  saved: 0,
  applied: 0,
  offered: 0
});

const appliedJobs = ref([]);
const offeredJobs = ref([]);
const savedJobs = ref([]);
const ongoingJobs = ref([]);

const axiosInstance = setupAxios();

const fetchJobCounts = async () => {
  const token = sessionStorage.getItem('sessionToken') || sessionStorage.getItem('rememberMeToken');
  if (!token) {
    console.error('Authentication token is missing');
    return;
  }

  try {
    const appliedResponse = await axiosInstance.get('/crewJobInt/applications', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    jobCounts.value.applied = appliedResponse.data?.applications?.length || 0;
    appliedJobs.value = appliedResponse.data?.applications?.map(application => ({
      ...application?.application,
      title: application?.job?.title || 'Unknown Job Title',
      businessImage: application?.job?.business?.logo,
      businessName: application?.job?.business?.companyName
    })) || [];

    const offeredResponse = await axiosInstance.get('/crewJobInt/offers', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    jobCounts.value.offered = offeredResponse.data?.offeredJobs?.length || 0;
    offeredJobs.value = offeredResponse.data?.offeredJobs || [];

    const savedResponse = await axiosInstance.get('/crewJobInt/saved', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    jobCounts.value.saved = savedResponse.data?.savedJobs?.length || 0;
    savedJobs.value = savedResponse.data?.savedJobs || [];

    const activeJobsResponse = await axiosInstance.get('/crewJob/activejobs', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    ongoingJobs.value = activeJobsResponse.data?.activeJobs || [];
    jobCounts.value.ongoing = ongoingJobs.value.length;
  } catch (error) {
    console.error('Failed to fetch job counts:', error);
  }
};

onMounted(fetchJobCounts);
</script>

<template>
  <div id="tracker">
    <div class="tracker__container">
      <h6>SAVED &#8722; {{ jobCounts.saved }}</h6>
      <div class="tracker__container__column">
        <SavedJob :jobs="savedJobs" />
      </div>
    </div>

    <div class="tracker__container">
      <h6>APPLIED &#8722; {{ jobCounts.applied }}</h6>
      <div class="tracker__container__column">
        <AppliedJob :jobs="appliedJobs" />
      </div>
    </div>

    <div class="tracker__container">
      <h6>ONGOING &#8722; {{ jobCounts.ongoing }}</h6>
      <div class="tracker__container__column">
        <OngoingJob :jobs="ongoingJobs" @jobCancelled="fetchJobCounts" />
      </div>
    </div>

    <div class="tracker__container">
      <h6>OFFERED &#8722; {{ jobCounts.offered }}</h6>
      <div class="tracker__container__column">
        <OfferedJob :jobs="offeredJobs" />
      </div>
    </div>
  </div>
</template>

<style scoped>
#tracker {
  display: flex;
  justify-content: space-between;
  gap: 16px;
}

.tracker__container {
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
}

.tracker__container__column {
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-height: 768px;
  overflow-y: auto;
}

.tracker__container__column::-webkit-scrollbar {
  display: none;
}

.tracker__container__column {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>