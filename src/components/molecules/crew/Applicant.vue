<script setup>
import { ref, onMounted } from 'vue';
import NormalButton from '../../atoms/buttons/NormalButton.vue';
import setupAxios from '../../../setupAxios';

const applicants = ref([]);
const loading = ref(true);

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
        console.log(`Fetched Business ID: ${businessId}`);
        return businessId;
    } catch (error) {
        console.error('Failed to fetch user data:', error);
        return null;
    }
};

const fetchApplicants = async () => {
    const businessId = await fetchBusinessId();
    if (!businessId) {
        console.error('Business ID is missing');
        return;
    }

    const token = sessionStorage.getItem('sessionToken') || sessionStorage.getItem('rememberMeToken');

    if (!token) {
        console.error('Authentication token is missing');
        return;
    }

    try {
        console.log(`Fetching applications for Business ID: ${businessId}`);
        const response = await axiosInstance.get(`/bussJobInt/${businessId}/applications`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const applications = response.data.applications;
        console.log('Fetched Applications:', applications);

        const applicantPromises = applications.map(async (application) => {
            console.log(`Fetching user data for application ID: ${application._id || application.applicationId}, User ID: ${application.userId}`);
            const userResponse = await axiosInstance.get(`/user/${application.userId}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const user = userResponse.data.data.user;
            console.log(`Fetched User Data for User ID: ${application.userId}`, user);

            return {
                ...application,
                user,
                applicationId: application._id || application.applicationId // Ensure the application ID is assigned correctly
            };
        });

        applicants.value = await Promise.all(applicantPromises);
        console.log('Applicants:', applicants.value);
    } catch (error) {
        console.error('Failed to fetch applications:', error);
    } finally {
        loading.value = false;
    }
};

const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
};

onMounted(() => {
    fetchApplicants();
});
</script>

<template>
    <div v-if="loading" class="loading">Loading...</div>
    <div v-for="applicant in applicants" :key="applicant.applicationId" class="applicant surface-tertiary radius-xs">
        <div class="applicant__top">
            <img :src="applicant.user.crewData?.basicInfo?.profileImage || 'https://via.placeholder.com/64'"
                class="applicant__top__image" alt="Crew image" />
            <h4 class="applicant__top__name">{{ applicant.user.username }}</h4>
        </div>

        <div id="applicant__info">
            <div class="applicant__info__left">
                <p class="text-reg-normal">{{ applicant.jobTitle }}</p>
            </div>
            <div id="applicant__info__right">
                <p>{{ formatDate(applicant.Date) }}</p>
            </div>
        </div>

        <div class="applicant__bot">
            <NormalButton label="Reject" class="applicant__bot__button button--tertiary" :endpoint="``" :postData="{}"
                @click.stop />
            <NormalButton label="Accept" class="applicant__bot__button button--primary"
                :endpoint="`/bussJobInt/applications/${applicant.applicationId}/accept`"
                :postData="{ status: 'accepted' }" @click.stop />
        </div>
    </div>
</template>

<style scoped>
/* GENERAL */
p {
    margin: 0;
}

.applicant {
    flex-direction: column;
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
    gap: 12px;
}

.applicant,
.applicant__info,
.applicant__top,
.applicant__mid,
.applicant__bot,
#applicant__info {
    display: flex;
}

.applicant__top {
    align-items: center;
    gap: 16px;
}

.applicant__top__image {
    width: 64px;
    height: 64px;
    border-radius: 4px;
}

/* INFO */
#applicant__info {
    align-items: flex-start;
    margin-top: 4px;
    justify-content: space-between;
    color: var(--neutral-70);
}

/* BOTTOM */
.applicant__bot {
    align-items: center;
    gap: 16px;
}

.applicant__bot__button {
    flex: 1;
}
</style>