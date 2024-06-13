<script setup>
import { ref, onMounted, watch } from 'vue';
import { defineProps } from 'vue';
import JobList from '../../organisms/list/JobList.vue';
import setupAxios from '../../../setupAxios'

const props = defineProps({
    business: {
        type: Object,
        required: true
    }
});

const jobs = ref([]);
const axiosInstance = setupAxios();

const fetchJobById = async (jobId) => {
  try {
    const jobResponse = await axiosInstance.get(`/bussJob/${jobId}`);
    return jobResponse.data.data.job;
  } catch (error) {
    console.error('Error fetching job data:', error);
    return null;
  }
};

const fetchLinkedJobs = async () => {
  if (props.business.businessJobs?.linkedJobs?.length) {
    const jobPromises = props.business.businessJobs.linkedJobs.map(fetchJobById);
    const fetchedJobs = await Promise.all(jobPromises);
    jobs.value = fetchedJobs.filter(job => job);
  }
};

watch(() => props.business, fetchLinkedJobs, { immediate: true });

onMounted(fetchLinkedJobs);

</script>

<template>
    <div class="about">
        <div class="about__top">
            <div class="about__top__bio surface-tertiary radius-s">
                <p>{{ business.businessInfo.bio }}</p>
            </div>
            <div class="about__top__work">
                <img class="radius-s work" :src="business.businessInfo.bannerImage" alt="portfolio work">
            </div>
        </div>
        <JobList :data="jobs" />
    </div>
</template>

<style scoped>
.about {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

p {
    margin: 0;
}

.about__top {
    display: flex;
    gap: 20px;
    flex-direction: row;
    max-height: 300px;
}

.about__top__bio {
    padding: 32px;
}

.about__top__bio {
    max-width: 794px;
}

.about__jobs {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
}

.work {
    object-fit: cover;
    max-height: 300px;

}
</style>