<script setup>
import { onMounted, ref, defineEmits } from 'vue';
import { IconoirProvider, User } from '@iconoir/vue';
import NormalButton from '../../atoms/buttons/NormalButton.vue';
import setupAxios from '../../../setupAxios';

const jobs = ref([]);
const jobCount = ref(0); // Added job count variable
const emit = defineEmits(['jobClick']);
const axiosInstance = setupAxios();

const fetchBusinessId = async () => {
    const token = sessionStorage.getItem('sessionToken') || sessionStorage.getItem('rememberMeToken');
    const userId = sessionStorage.getItem('userId');

    if (!token || !userId) {
        console.error('Authentication token or user ID is missing');
        return null;
    }

    try {
        const userResponse = await axiosInstance.get(`/user/${userId}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const businessId = userResponse.data.data.user.businessData;
        return businessId;
    } catch (error) {
        console.error('Failed to fetch user data:', error);
        return null;
    }
};

const fetchJobs = async (businessId) => {
    const token = sessionStorage.getItem('sessionToken') || sessionStorage.getItem('rememberMeToken');
    if (!token) {
        console.error('Authentication token is missing');
        return;
    }

    try {
        const response = await axiosInstance.get(`/bussJob/${businessId}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        jobs.value = response.data.linkedJobs;
        jobCount.value = response.data.linkedJobs.length; // Update job count
    } catch (error) {
        console.error('Failed to fetch jobs:', error);
    }
};

const handleJobClick = (job) => {
    emit('jobClick', job);
};

onMounted(async () => {
    const businessId = await fetchBusinessId();
    if (businessId) {
        await fetchJobs(businessId);
        // Fetch jobs periodically
        setInterval(async () => {
            await fetchJobs(businessId);
        }, 1000); // Fetch jobs every minute (adjust the interval as needed)
    }
});
</script>

<template>
    <IconoirProvider :icon-props="{
        'color': 'var(--black)',
        'width': '20',
        'height': '20',
        'stroke-width': '1.8'
    }">
        <div v-for="job in jobs" :key="job._id" id="posted__job" class="surface-tertiary radius-xs"
            @click="handleJobClick(job)">
            <div id="posted__job__top">
                <div id="posted__job__top__left">
                    <div id="posted__job__top__left__title">
                        <p class="text-bold-l">{{ job.title }}</p>
                    </div>
                    <div id="posted__job__top__left__function">
                        <p class="text-reg-s">{{ job.jobFunction }}</p>
                    </div>
                </div>

                <div id="posted__job__top__right">
                    <div id="posted__job__top__right__count">
                        <p>{{ job.applications.length }}</p>
                    </div>
                    <div id="posted__job__top__right__applicants">
                        <User />
                    </div>
                </div>
            </div>

            <div id="posted__job__info">
                <div id="posted__job__info__date">
                    <div id="posted__job__info__date__day">
                        <p>{{ new Date(job.date).getDate() }}</p>
                    </div>
                    <div id="posted__job__info__date__month">
                        <p class="text-reg-s">{{ new Date(job.date).toLocaleString('default', { month: 'long' }) }}</p>
                    </div>
                </div>
                <div id="posted__job__info__place">
                    <div id="posted__job__info__place__city">
                        <p class="text-reg-normal">{{ job.location.city }}</p>
                    </div>
                    <div id="posted__job__info__place__country">
                        <p class="text-reg-s">{{ job.location.country }}</p>
                    </div>
                </div>
            </div>

            <div id="posted__job__buttons">
                <NormalButton id="normalButton__details" class="button--primary" :hasIcon="false" :hasLabel="true"
                    label="Details" :hasRequest="false" @click.stop="handleJobClick(job)" />
            </div>
        </div>
    </IconoirProvider>
</template>

<style scoped>
/* GENERAL */
p {
    margin: 0;
}

#posted__job {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
    gap: 12px;
    cursor: pointer;
    transition: 0.3s;
}

#posted__job:hover {
    filter: brightness(92%);
}

/* TOP */
#posted__job__top {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

#posted__job__top__left {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

#posted__job__top__left__function {
    color: var(--neutral-70);
}

#posted__job__top__right {
    display: flex;
    align-items: center;
    gap: 8px;
}

/* INFO */
#posted__job__info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 4px;
}

#posted__job__info__place {
    text-align: right;
}

/* BUTTONS */
#posted__job__buttons {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-top: 12px;
    gap: 16px;
}

#normalButton__details {
    flex: 1;
}
</style>