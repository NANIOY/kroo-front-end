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
        const offeredJobsResponse = await axiosInstance.get(`/crewJobInt/offers`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        const offeredJobs = offeredJobsResponse.data.offeredJobs;

        const businessDetailsPromises = offeredJobs.map(job =>
            axiosInstance.get(`/business/${job.businessId}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            }).catch(error => {
                console.error(`Failed to fetch business details for business ID: ${job.businessId}`, error);
                return null;
            })
        );

        const businessDetailsResponses = await Promise.all(businessDetailsPromises);

        jobs.value = offeredJobs.map((job, index) => {
            const businessResponse = businessDetailsResponses[index]?.data;
            return {
                ...job,
                businessImage: businessResponse?.data?.business?.businessInfo?.logo || 'https://placehold.co/56x56',
                businessName: businessResponse?.data?.business?.businessInfo?.companyName || 'Unknown Company',
                city: job.location.city,
                country: job.location.country,
                wage: job.wage,
                title: job.title,
                daysLeft: calculateDaysLeft(job.date)
            };
        });

    } catch (error) {
        console.error('Failed to fetch offered jobs or business details:', error);
    }
};

const getFormattedDate = (dateString, options) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
};

const calculateDaysLeft = (dateString) => {
    const offerDate = new Date(dateString);
    const currentDate = new Date();
    const timeDifference = offerDate.getTime() - currentDate.getTime();
    const daysLeft = Math.ceil(timeDifference / (1000 * 3600 * 24));
    return daysLeft > 0 ? daysLeft : 0;
};

const showJobDetails = (job) => {
    selectedJob.value = job;
    isJobPopVisible.value = true;
};

const closeJobDetails = () => {
    isJobPopVisible.value = false;
    selectedJob.value = null;
};

const acceptOffer = (job) => {
    console.log('Accepted job offer:', job);
    // Additional logic to handle accepting the job offer can be added here
};

const declineOffer = (job) => {
    console.log('Declined job offer:', job);
    // Additional logic to handle declining the job offer can be added here
};

onMounted(fetchJobs);
</script>

<template>
    <div v-for="job in jobs" :key="job._id" id="offered__job" class="surface-tertiary radius-xs"
        @click="showJobDetails(job)">
        <div id="offered__job__top">
            <div id="offered__job__top__business">
                <div>
                    <img class="radius-full" :src="job.businessImage || 'https://placehold.co/56x56'"
                        alt="Business logo">
                </div>
                <div id="offered__job__top__business__name">
                    <p>{{ job.businessName }}</p>
                </div>
            </div>

            <div id="offered__job__top__right">
                <div id="offered__job__top__right__days">
                    <p>{{ job.daysLeft }}</p>
                </div>
                <div id="offered__job__top__right__calendar">
                    <calendar-icon />
                </div>
            </div>
        </div>

        <div id="offered__job__jobTitle">
            <p class="text-bold-l">{{ job.title }}</p>
        </div>

        <div id="offered__job__info">
            <div id="offered__job__info__date">
                <Tag type="big">
                    <p>{{ getFormattedDate(job.date, { day: 'numeric' }) }} {{ getFormattedDate(job.date, {
                        month: 'long'
                    }) }}</p>
                </Tag>
            </div>
            <div id="offered__job__info__place">
                <div id="offered__job__info__place__city">
                    <p class="text-reg-normal">{{ job.city }}</p>
                </div>
                <div id="offered__job__info__place__country">
                    <p class="text-reg-s">{{ job.country }}</p>
                </div>
            </div>
        </div>

        <div id="offered__job__bottom">
            <div id="offered__job__bottom__buttons">
                <NormalButton id="normalButton__accept" class="button--primary offered__job__bottom__buttons_accept"
                    :hasIcon="false" :hasLabel="true" label="Accept" iconName="" @click.stop="acceptOffer(job)" />
                <NormalButton id="normalButton__decline" class="button--tertiary offered__job__bottom__buttons_decline"
                    :hasIcon="false" :hasLabel="true" label="Decline" iconName="" @click.stop="declineOffer(job)" />
            </div>
        </div>
    </div>

    <JobPop v-if="isJobPopVisible" :job="selectedJob" :isVisible="isJobPopVisible" @close="closeJobDetails"
        jobType="offered" />
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

#offered__job {
    display: flex;
    flex-direction: column;
    width: 360px;
    padding: 20px;
    box-sizing: border-box;
    gap: 12px;
    cursor: pointer;
    transition: 0.3s;
}

#offered__job:hover {
    filter: brightness(92%);
}

#offered__job__top {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

#offered__job__top__business {
    display: flex;
    align-items: center;
    gap: 8px;
}

#offered__job__jobTitle p {
    margin: 0;
    margin-top: 12px;
}

#offered__job__info {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

#offered__job__top__right {
    display: flex;
    align-items: center;
    gap: 8px;
}

#offered__job__bottom {
    display: flex;
    align-items: center;
    gap: 24px;
    margin-top: 12px;
}

#offered__job__info__place {
    text-align: right;
}

#offered__job__bottom__buttons {
    display: flex;
    flex: 1;
    gap: 16px;
}

.offered__job__bottom__buttons_accept,
.offered__job__bottom__buttons_decline {
    flex: 1;
}
</style>