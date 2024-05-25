<script setup>
import { ref, onMounted } from 'vue';
import AppliedJob from '../../components/molecules/jobs/AppliedJob.vue';
import OfferedJob from '../../components/molecules/jobs/OfferedJob.vue';
import OngoingJob from '../../components/molecules/jobs/OngoingJob.vue';
import SavedJob from '../../components/molecules/jobs/SavedJob.vue';
import setupAxios from '../../setupAxios';
import { useRouter } from 'vue-router';

const jobCounts = ref({
  ongoing: 0,
  saved: 0,
  applied: 0,
  offered: 0
});

const router = useRouter();
const axiosInstance = setupAxios(router);

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
    jobCounts.value.applied = appliedResponse.data.applications.length;

    const offeredResponse = await axiosInstance.get('/crewJobInt/offers', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    jobCounts.value.offered = offeredResponse.data.offeredJobs.length;

    const savedResponse = await axiosInstance.get('/crewJobInt/saved', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    jobCounts.value.saved = savedResponse.data.savedJobs.length;

    // Uncomment if you need ongoing jobs count
    // const ongoingResponse = await axiosInstance.get('/crewJobInt/ongoing', {
    //   headers: { 'Authorization': `Bearer ${token}` }
    // });
    // jobCounts.value.ongoing = ongoingResponse.data.ongoingJobs.length;
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
        <SavedJob />
      </div>
    </div>

    <div class="tracker__container">
      <h6>APPLIED &#8722; {{ jobCounts.applied }}</h6>
      <div class="tracker__container__column">
        <AppliedJob />
      </div>
    </div>

    <div class="tracker__container">
      <h6>ONGOING &#8722; {{ jobCounts.ongoing }}</h6>
      <div class="tracker__container__column">
        <OngoingJob />
      </div>
    </div>

    <div class="tracker__container">
      <h6>OFFERED &#8722; {{ jobCounts.offered }}</h6>
      <div class="tracker__container__column">
        <OfferedJob />
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