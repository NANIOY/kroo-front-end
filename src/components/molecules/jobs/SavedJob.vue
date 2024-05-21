<script setup>
import NormalButton from '../../atoms/buttons/NormalButton.vue';
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
        const response = await axiosInstance.get(`/crewJobInt/saved`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        const savedJobs = response.data.savedJobs;

        const businessDetailsPromises = savedJobs.map(job =>
            axiosInstance.get(`/business/${job.businessId}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            })
        );

        const businessDetailsResponses = await Promise.all(businessDetailsPromises);

        jobs.value = savedJobs.map((job, index) => {
            const businessResponse = businessDetailsResponses[index].data;
            return {
                ...job,
                businessImage: businessResponse.data.business.businessInfo.logo,
                businessName: businessResponse.data.business.businessInfo.companyName,
            };
        });
    } catch (error) {
        console.error('Failed to fetch saved jobs or business details:', error);
    }
};

onMounted(fetchJobs);
</script>

<template>
    <div v-for="job in jobs" :key="job._id" id="saved__job" class="surface-tertiary radius-xs">
        <div id="saved__job__top">
            <div id="saved__job__top__business">
                <div id="saved__job__top__business__image">
                    <img class="radius-full" :src="job.businessImage || 'https://placehold.co/56x56'"
                        alt="Business logo">
                </div>
                <div id="saved__job__top__business__name">
                    <p>{{ job.businessName || 'Unknown Company' }}</p>
                </div>

            </div>
        </div>

        <div id="saved__job__jobTitle">
            <p class="text-bold-l">{{ job.title }}</p>
        </div>

        <div id="saved__job__info">
            <div id="saved__job__info__date">
                <div id="saved__job__info__date__day">
                    <p>{{ new Date(job.date).toLocaleDateString() }}</p>
                </div>
            </div>
            <div id="saved__job__info__place">
                <div id="saved__job__info__place__city">
                    <p class="text-reg-normal">{{ job.location.city }}</p>
                </div>
                <div id="saved__job__info__place__country">
                    <p class="text-reg-s">{{ job.location.country }}</p>
                </div>
            </div>
        </div>

        <div id="saved__job__business" v-if="job.business">
            <p class="text-bold-s">Business Information</p>
            <p>{{ job.business.bio }}</p>
            <p><strong>Media Types:</strong> {{ job.business.mediaTypes.join(', ') }}</p>
            <p><strong>Languages:</strong> {{ job.business.languages.join(', ') }}</p>
        </div>

        <div id="saved__job__buttons">
            <NormalButton id="normalButton__cancel" class="button--tertiary button__stroke" :hasIcon="false"
                :hasLabel="true" label="Unsave" iconName="" />
            <NormalButton id="normalButton__details" class="button--primary" :hasIcon="false" :hasLabel="true"
                label="Details" iconName="" :hasRequest="false" />
        </div>
    </div>
</template>

<style scoped>
p {
    margin: 0;
}

img {
    max-width: 24px;
}

#saved__job {
    display: flex;
    flex-direction: column;
    width: 360px;
    padding: 20px;
    box-sizing: border-box;
    gap: 12px;
}

#saved__job__top {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

#saved__job__top__business {
    display: flex;
    align-items: center;
    gap: 8px;
}

#saved__job__jobTitle p {
    margin: 0;
    margin-top: 12px;
}

#saved__job__info {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

#saved__job__info__place {
    text-align: right;
}

#saved__job__buttons {
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