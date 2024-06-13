<script setup>
import NormalButton from '../../atoms/buttons/NormalButton.vue';
import Tag from '../../atoms/items/Tag.vue';
import { onMounted, ref } from 'vue';
import setupAxios from '../../../setupAxios';

const jobs = ref([]);
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
        });

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
        await axiosInstance.delete(`/crewJobInt/cancelOngoing/${jobId}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        // Refresh the job list
        await fetchJobs();
    } catch (error) {
        console.error('Failed to cancel the job:', error);
    }
};

const getFormattedDate = (dateString, options) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
};

onMounted(fetchJobs);
</script>

<template>
    <div>
        <div v-for="job in jobs" :key="job._id" id="ongoing__job" class="surface-tertiary radius-xs">
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
                            month:
                                'long'
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
                    :hasLabel="true" label="Cancel" iconName="" :hasRequest="false" @click="cancelJob(job._id)" />
                <NormalButton id="normalButton__details" class="button--primary" :hasIcon="false" :hasLabel="true"
                    label="Details" iconName="" :hasRequest="false" />
            </div>
        </div>
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