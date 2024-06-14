<script setup>
import { onMounted, ref, defineEmits } from 'vue';
import { IconoirProvider, Calendar } from '@iconoir/vue';
import NormalButton from '../../atoms/buttons/NormalButton.vue';
import Tag from '../../atoms/items/Tag.vue';
import setupAxios from '../../../setupAxios';
import Alert from '../../atoms/alerts/alert.vue';

const jobs = ref([]);
const axiosInstance = setupAxios();

const alertVisible = ref(false);
const alertMessage = ref('');
const alertType = ref('good');

const emit = defineEmits(['jobAccepted', 'jobDeclined']);

const offeredJobCount = ref(0);
const ongoingJobCount = ref(0);

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
            const businessResponse = businessDetailsResponses[index].data;
            return {
                ...job,
                businessImage: businessResponse.data.business.businessInfo.logo,
                businessName: businessResponse.data.business.businessInfo.companyName,
                city: job.location.city,
                country: job.location.country,
                wage: job.wage,
                title: job.title,
                daysLeft: calculateDaysLeft(job.date)
            };
        });

        offeredJobCount.value = offeredJobs.length;

    } catch (error) {
        console.error('Failed to fetch offered jobs or business details:', error);
    }
};

const handleJobOffer = async (jobId, action) => {
    const token = sessionStorage.getItem('sessionToken') || sessionStorage.getItem('rememberMeToken');
    if (!token) {
        console.error('Authentication token is missing');
        showAlert(`Job cannot be ${action}ed.`, 'bad');
        return;
    }

    try {
        await axiosInstance.post(`/crewJobInt/offers/${jobId}/${action}`, null, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (action === 'accept') {
            emit('jobAccepted', jobId);
            showAlert('Job accepted successfully!', 'good');
        } else if (action === 'cancel') {
            emit('jobDeclined', jobId);
            showAlert('Job declined successfully!', 'good');
        }
    } catch (error) {
        console.error(`Failed to ${action} job offer:`, error);
        showAlert(`Job cannot be ${action}ed.`, 'bad');
    }
};

const showAlert = (message, type) => {
    alertMessage.value = message;
    alertType.value = type;
    alertVisible.value = true;
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

onMounted(fetchJobs);
</script>

<template>
    <Alert v-if="alertVisible" :type="alertType" :label="alertMessage" />

    <IconoirProvider :icon-props="{
        'color': 'var(--black)',
        'width': '20',
        'height': '20',
        'stroke-width': '1.8'
    }">
        <div v-for="job in jobs" :key="job._id" id="offered__job" class="surface-tertiary radius-xs">
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
                        <Calendar />
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
                <div>
                    <p class="text-bold-normal">€ {{ job.wage }}/hr</p>
                </div>
                <div id="offered__job__bottom__buttons">
                    <NormalButton id="normalButton__decline"
                        class="button--tertiary offered__job__bottom__buttons_decline" :hasLabel="true" label="Decline"
                        :hasRequest="false" @click="handleJobOffer(job._id, 'cancel')" />
                    <NormalButton id="normalButton__accept" class="button--primary offered__job__bottom__buttons_accept"
                        :hasLabel="true" label="Accept" :hasRequest="false"
                        @click="handleJobOffer(job._id, 'accept')" />
                </div>
            </div>
        </div>
    </IconoirProvider>
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

.offered__job__bottom__buttons_details,
.offered__job__bottom__buttons_accept,
.offered__job__bottom__buttons_decline {
    flex: 1;
}
</style>