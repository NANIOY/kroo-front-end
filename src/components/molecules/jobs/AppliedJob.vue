<script setup>
import { ref, onMounted } from 'vue';
import setupAxios from '../../../setupAxios';
import NormalButton from '../../atoms/buttons/NormalButton.vue';
import Tag from '../../atoms/items/Tag.vue';
import JobPop from '../popups/JobPop.vue';

const jobs = ref([]);
const selectedJob = ref(null);
const isJobPopVisible = ref(false);
const axiosInstance = setupAxios();

const fetchJobs = async () => {
    const token = sessionStorage.getItem('sessionToken') || sessionStorage.getItem('rememberMeToken');
    if (!token) {
        console.error('Authentication token is missing');
        return;
    }

    try {
        const applicationsResponse = await axiosInstance.get(`/crewJobInt/applications`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        const applications = applicationsResponse.data.applications;

        const businessDetailsPromises = applications.map(application =>
            axiosInstance.get(`/business/${application.job.businessId}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            }).catch(error => {
                console.error(`Failed to fetch business details for business ID: ${application.job.businessId}`, error);
                return null;
            })
        );

        const businessDetailsResponses = await Promise.all(businessDetailsPromises);

        jobs.value = applications.map((application, index) => {
            const businessResponse = businessDetailsResponses[index]?.data;
            return {
                ...application.job,
                applicationId: application.application._id,
                status: application.application.status,
                dateApplied: application.application.date,
                businessImage: businessResponse?.data.business.businessInfo.logo || 'https://placehold.co/56x56',
                businessName: businessResponse?.data.business.businessInfo.companyName || 'Unknown Company',
            };
        });

    } catch (error) {
        console.error('Failed to fetch applications or business details:', error);
    }
};

const showJobDetails = (job) => {
    selectedJob.value = job;
    isJobPopVisible.value = true;
};

const closeJobDetails = () => {
    isJobPopVisible.value = false;
    selectedJob.value = null;
};

onMounted(fetchJobs);
</script>

<template>
    <div v-for="job in jobs" :key="job._id" id="applied__job" class="surface-tertiary radius-xs"
        @click="showJobDetails(job)">
        <div id="applied__job__top">
            <div id="applied__job__top__business">
                <div>
                    <img class="radius-full" :src="job.businessImage || 'https://placehold.co/56x56'"
                        alt="Business logo">
                </div>
                <div id="applied__job__top__business__name">
                    <p>{{ job.businessName }}</p>
                </div>
            </div>
        </div>

        <div id="applied__job__jobTitle">
            <p class="text-bold-l">{{ job.title }}</p>
        </div>

        <div id="applied__job__buttons">
            <NormalButton id="normalButton__cancel" class="button--tertiary button__stroke" :hasIcon="false"
                :hasLabel="true" label="Cancel" iconName="" />
            <NormalButton id="normalButton__details" class="button--primary" :hasIcon="false" :hasLabel="true"
                label="Details" iconName="" :hasRequest="false" @click.stop="showJobDetails(job)" />
        </div>
    </div>

    <JobPop v-if="isJobPopVisible" :job="selectedJob" :isVisible="isJobPopVisible" @close="closeJobDetails"
        jobType="applied" />
</template>

<style scoped>
p {
    margin: 0;
}

img {
    max-width: 24px;
}

#applied__job {
    display: flex;
    flex-direction: column;
    width: 360px;
    padding: 20px;
    box-sizing: border-box;
    gap: 12px;
    cursor: pointer;
    transition: 0.3s;
}

#applied__job:hover {
    filter: brightness(92%);
}

#applied__job__top {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

#applied__job__top__business {
    display: flex;
    align-items: center;
    gap: 8px;
}

#applied__job__jobTitle p {
    margin: 0;
    margin-top: 12px;
}

#applied__job__buttons {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-top: 12px;
    gap: 16px;
}

#normalButton__cancel,
#normalButton__details {
    flex: 1;
}

#applied__job__top__business img {
    object-fit: cover;
    height: 24px;
    width: 24px;
}
</style>
