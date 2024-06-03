<script setup>
import { ref, onMounted } from 'vue';
import PostedJob from '../../components/molecules/jobs/PostedJob.vue';
import Applicant from '../../components/molecules/crew/Applicant.vue';
import ActiveCrew from '../../components/molecules/crew/ActiveCrew.vue';
import NormalButton from '../../components/atoms/buttons/NormalButton.vue';
import CreateJobModal from '../../components/molecules/popups/CreateJob.vue';
import setupAxios from '../../setupAxios';

const isModalVisible = ref(false);
const activeCrewMembers = ref([]);
const jobCounts = ref({
    posted: 0,
    applied: 0,
    active: 0
});

const axiosInstance = setupAxios();

const openModal = () => {
    isModalVisible.value = true;
};

const closeModal = () => {
    isModalVisible.value = false;
};

const handleCreateJob = (jobData) => {
    console.log('Job created:', jobData);
    closeModal();
};

const navigateToProfile = (userUrl) => {
    window.open(`/#/user/${userUrl}`, '_blank');
};

const addActiveCrewMember = (member) => {
    activeCrewMembers.value.push(member);
};

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

const fetchJobCounts = async (businessId) => {
    const token = sessionStorage.getItem('sessionToken') || sessionStorage.getItem('rememberMeToken');
    if (!token) {
        console.error('Authentication token is missing');
        return;
    }

    try {
        const postedResponse = await axiosInstance.get(`/bussJob/${businessId}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        jobCounts.value.posted = postedResponse.data.linkedJobs.length;

        const appliedResponse = await axiosInstance.get(`/bussJobInt/${businessId}/applications`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        jobCounts.value.applied = appliedResponse.data.applications.length;

        const activeResponse = await axiosInstance.get(`/bussJobInt/${businessId}/activecrew`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        jobCounts.value.active = activeResponse.data.activeCrewMembers.length;


    } catch (error) {
        console.error('Failed to fetch job counts:', error);
    }
};

const fetchActiveCrewMembers = async () => {
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
        console.log(`Fetching active crew members for Business ID: ${businessId}`);
        const response = await axiosInstance.get(`/bussJobInt/${businessId}/activecrew`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const activeCrew = response.data.activeCrewMembers;
        console.log('Fetched Active Crew Members:', activeCrew);

        activeCrewMembers.value = activeCrew;
        console.log('Active Crew Members:', activeCrewMembers.value);
    } catch (error) {
        console.error('Failed to fetch active crew members:', error);
    }
};

onMounted(() => {
    fetchActiveCrewMembers();
    fetchBusinessId().then((businessId) => {
        if (businessId) {
            fetchJobCounts(businessId);
        }
    });
});
</script>

<template>
    <CreateJobModal :isVisible="isModalVisible" @close="closeModal" @submit="handleCreateJob" />

    <div id="tracker">
        <div class="tracker__container">
            <div class="tracker__container__top">
                <h6>POSTED JOBS &#8722; {{ jobCounts.posted }}</h6>
                <NormalButton label="Create Job" class="button--secondary" id="addButton" :hasIcon="true"
                    iconName="Plus" :hasLabel="true" :hasRequest="false" @click="openModal" />
            </div>
            <div class="tracker__container__column">
                <PostedJob />
            </div>
        </div>

        <div class="tracker__container">
            <div class="tracker__container__top">
                <h6>WHO APPLIED &#8722; {{ jobCounts.applied }}</h6>
                <NormalButton label="Search for crew" class="button--tertiary" id="addButton" :hasIcon="true"
                    iconName="Search" :hasLabel="true" :hasRequest="false" redirect="/search" />
            </div>
            <div class="tracker__container__column">
                <Applicant @navigateToProfile="navigateToProfile" @accepted="addActiveCrewMember"
                    @fetchActiveCrewMembers="fetchActiveCrewMembers" />
            </div>
        </div>

        <div class="tracker__container tracker__container--last">
            <h6>ACTIVE CREW &#8722; {{ jobCounts.active }}</h6>
            <div class="tracker__container__column">
                <ActiveCrew :members="activeCrewMembers" />
            </div>
        </div>
    </div>
</template>

<style scoped>
#tracker {
    display: flex;
    justify-content: space-between;
    gap: 40px;
    width: 100%;
}

.tracker__container {
    display: flex;
    flex-direction: column;
    gap: 8px;
    flex: 1;
}

.tracker__container--last h6 {
    height: 40px;
    display: flex;
    align-items: center;
}

.tracker__container__top {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

#addButton {
    width: 32%;
    min-width: 176px;
}

.tracker__container__column {
    padding: 8px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    max-height: 744px;
    overflow-y: auto;
}

.tracker__container__column::-webkit-scrollbar {
    display: none;
}

.tracker__container__column {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
</style>