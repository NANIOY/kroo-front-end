<script setup>
import { defineProps, defineEmits, ref, onMounted } from 'vue';
import setupAxios from '../../../setupAxios';
import NormalButton from '../../atoms/buttons/NormalButton.vue';
import Tag from '../../atoms/items/Tag.vue';
import JobPop from '../popups/JobPop.vue';

const props = defineProps({
    jobs: Array
});

const emit = defineEmits(['jobCancelled']);

const jobs = ref(props.jobs);
const selectedJob = ref(null);
const selectedJobId = ref(null);
const isJobPopVisible = ref(false);
const axiosInstance = setupAxios();

const fetchJobs = async () => {
    const token = sessionStorage.getItem('sessionToken') || sessionStorage.getItem('rememberMeToken');
    if (!token) {
        console.error('Authentication token is missing');
        return;
    }

    try {
        const activeJobsResponse = await axiosInstance.get(`/crewJob/activejobs`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        const activeJobs = activeJobsResponse.data.activeJobs;

        const businessDetailsPromises = activeJobs.map(job =>
            axiosInstance.get(`/business/${job.businessId}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            })
        );

        const businessDetailsResponses = await Promise.all(businessDetailsPromises);

        jobs.value = activeJobs.map((job, index) => {
            const businessResponse = businessDetailsResponses[index];
            if (businessResponse && businessResponse.data && businessResponse.data.data) {
                const businessInfo = businessResponse.data.data.business.businessInfo;

                if (businessInfo) {
                    return {
                        ...job,
                        businessImage: businessInfo.logo || 'https://placehold.co/56x56',
                        companyName: businessInfo.companyName || 'Unknown Company',
                    };
                }
            }
        }).filter(job => job); // Filter out any undefined jobs

    } catch (error) {
        console.error('Failed to fetch active jobs or business details:', error);
    }
};

const cancelJob = async (jobId) => {
    const token = sessionStorage.getItem('sessionToken') || sessionStorage.getItem('rememberMeToken');
    if (!token) {
        console.error('Authentication token is missing');
        return;
    }

    try {
        await axiosInstance.post(`/crewJobInt/ongoing/${jobId}/cancel`, {}, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        await fetchJobs();
        emit('jobCancelled'); // Emit event to inform parent component
    } catch (error) {
        console.error('Failed to cancel the job:', error);
    }
};

const getFormattedDate = (dateString, options) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
};

const showJobDetails = (job) => {
    selectedJob.value = job;
    selectedJobId.value = job._id;
    isJobPopVisible.value = true;
};

const closeJobDetails = () => {
    isJobPopVisible.value = false;
    selectedJob.value = null;
    selectedJobId.value = null;
};

onMounted(fetchJobs);
</script>

<template>
    <div>
        <div v-for="job in jobs" :key="job._id" id="ongoing__job" class="surface-tertiary radius-xs"
            @click="showJobDetails(job)">
            <div id="ongoing__job__top">
                <div id="ongoing__job__top__business">
                    <div>
                        <img class="radius-full" :src="job.businessImage || 'https://placehold.co/56x56'"
                            alt="Business Logo">
                    </div>
                    <div id="ongoing__job__top__business__name">
                        <p>{{ job.companyName || 'Unknown Company' }}</p>
                    </div>
                </div>
            </div>

            <div id="ongoing__job__jobTitle">
                <p class="text-bold-l">{{ job.title }}</p>
            </div>

            <div id="ongoing__job__info">
                <div id="ongoing__job__info__date">
                    <Tag type="big">
                        <p>{{ getFormattedDate(job.date, { day: 'numeric' }) }} {{ getFormattedDate(job.date, {
                            month: 'long'
                            }) }}</p>
                    </Tag>
                </div>
                <div id="ongoing__job__info__place">
                    <div id="ongoing__job__info__place__city">
                        <p class="text-reg-normal">{{ job.location.city }}</p>
                    </div>
                    <div id="ongoing__job__info__place__country">
                        <p class="text-reg-s">{{ job.location.country }}</p>
                    </div>
                </div>
            </div>

            <div id="ongoing__job__buttons">
                <NormalButton id="normalButton__cancel" class="button--tertiary button__stroke" :hasIcon="false"
                    :hasLabel="true" label="Cancel" iconName="" :hasRequest="false" @click.stop="cancelJob(job._id)" />
                <NormalButton id="normalButton__details" class="button--primary" :hasIcon="false" :hasLabel="true"
                    label="Details" iconName="" :hasRequest="false" @click.stop="showJobDetails(job)" />
            </div>
        </div>

        <JobPop v-if="isJobPopVisible" :job="selectedJob" :jobId="selectedJobId" :isVisible="isJobPopVisible"
            @close="closeJobDetails" jobType="ongoing" />
    </div>
</template>

<style scoped>
p {
    margin: 0;
}

img {
    object-fit: cover;
    max-width: 24px;
    height: 24px;
}

#ongoing__job {
    display: flex;
    flex-direction: column;
    width: 360px;
    padding: 20px;
    box-sizing: border-box;
    gap: 12px;
    margin-bottom: 16px;
    cursor: pointer;
    transition: 0.3s;
}

#ongoing__job:hover {
    filter: brightness(92%);
}

#ongoing__job__top {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

#ongoing__job__top__business {
    display: flex;
    align-items: center;
    gap: 8px;
}

#ongoing__job__jobTitle p {
    margin: 0;
    margin-top: 12px;
}

#ongoing__job__info {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

#ongoing__job__info__place {
    text-align: right;
}

#ongoing__job__buttons {
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
</style>