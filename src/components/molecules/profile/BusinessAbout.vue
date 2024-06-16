<script setup>
import { ref, watch } from 'vue';
import JobList from '../../organisms/list/JobList.vue';
import setupAxios from '../../../setupAxios';

const props = defineProps({
    business: {
        type: Object,
        required: true
    },
    currentUser: {
        type: Object,
        required: true
    }
});

const jobs = ref([]);
const axiosInstance = setupAxios();

const fetchLinkedJobs = async () => {
    if (!props.business || !props.business._id) {
        console.error('No business ID found');
        return;
    }
    try {
        const response = await axiosInstance.get(`/bussJob/${props.business._id}`);
        console.log('Fetched linked jobs response:', response.data);
        if (response.data && response.data.linkedJobs) {
            jobs.value = response.data.linkedJobs;
        }
    } catch (error) {
        console.error('Error fetching linked jobs:', error);
    }
};

watch(() => props.business, fetchLinkedJobs, { immediate: true });
</script>

<template>
    <div class="about">
        <div class="about__top">
            <div class="about__top__bio surface-tertiary radius-s">
                <p>{{ business.businessInfo.bio }}</p>
            </div>
            <div class="about__top__banner">
                <img class="radius-s banner" :src="business.businessInfo.bannerImage" alt="banner">
            </div>
        </div>
        <JobList :data="jobs" :currentUser="props.currentUser" :business="props.business" />
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
    overflow-y: auto;
}

.about__top__bio {
    max-width: 794px;
}

.about__jobs {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
}

.banner {
    object-fit: cover;
    height: 300px;
    width: 560px;
}


</style>