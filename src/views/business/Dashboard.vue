<script setup>
// IMPORT DASHBOARD COMPONENTS
import JobCardBus from '../../components/molecules/dashboard/JobCardBus.vue';
import CrewSug from '../../components/molecules/dashboard/CrewSug.vue';
import Week from '../../components/molecules/dashboard/Week.vue';
import ScheduleCard from '../../components/molecules/dashboard/ScheduleCard.vue';

// IMPORT OTHER
import TransparentButton from '../../components/atoms/buttons/TransparentButton.vue';
import JobPop from '../../components/molecules/popups/JobPop.vue';
import Overlay from '../../components/molecules/popups/Overlay.vue';
import setupAxios from '../../setupAxios';

import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';

const axiosInstance = setupAxios();
const router = useRouter();
const activeJobs = ref([]);
const crewSuggestions = ref([]);
const selectedJob = ref(null);

// NAVIGATION FUNCTIONS
const goToTracker = () => {
    router.push('/tracker');
};
const goToSearch = () => {
    router.push('/search');
};

const fetchActiveJobs = async () => {
    const userId = sessionStorage.getItem('userId');
    try {
        const userResponse = await axiosInstance.get(`/user/${userId}`);
        const businessId = userResponse.data.data.user.businessData;

        const jobResponse = await axiosInstance.get(`/bussjob/${businessId}`);
        const sortedJobs = jobResponse.data.linkedJobs.sort((a, b) => new Date(a.date) - new Date(b.date));
        activeJobs.value = sortedJobs.slice(0, 3);
    } catch (error) {
        console.error('Error fetching active jobs:', error);
    }
};

const fetchCrewSuggestions = async () => {
    try {
        const { data } = await axiosInstance.get('/user');
        const crewMembers = data.data.users.filter(user => user.crewData).slice(0, 4);
        crewSuggestions.value = await Promise.all(crewMembers.map(async member => {
            const crewDataResponse = await axiosInstance.get(`/crew/${member.crewData}`);
            const crewData = crewDataResponse.data.data;
            return {
                img: crewData.basicInfo.profileImage,
                name: member.username,
                perc: '85', // HARD CODED
                jobtitle: 'Job title', // HARD CODED
                functions: crewData.basicInfo.functions,
                userUrl: member.userUrl
            };
        }));
    } catch (error) {
        console.error('Error fetching crew suggestions:', error);
    }
};

onMounted(() => {
    fetchActiveJobs();
    fetchCrewSuggestions();
});

const openJobPop = (job) => {
    selectedJob.value = job;
};

const closeJobPop = () => {
    selectedJob.value = null;
};

const handleNavigateToProfile = (userUrl) => {
    router.push(`/user/${userUrl}`);
};

</script>

<template>
    <div class="dashboard">

        <div class="dashboard__left">
            <div class="dashboard__left__block">
                <div class="dashboard__left__header">
                    <h5>Active Job Postings</h5>
                    <TransparentButton @click="goToTracker"
                        class="dashboard__left__header__button dashboard__left__header__button--active" hasLabel="true"
                        label="All jobs" iconName="NavArrowRight" iconPosition="right" />
                </div>
                <div class="dashboard__left__block--active__jobs">
                    <div class="dashboard__left__block--active__jobs">
                        <JobCardBus v-for="(job, index) in activeJobs" :key="job._id"
                            :date="new Date(job.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })"
                            :title="job.title" :func="job.jobFunction" :applicants="job.applications.length.toString()"
                            :status="'Open'" :cardType="index === 0 ? 'highlight' : 'default'" />
                    </div>
                </div>
            </div>

            <div class="dashboard__left__block">
                <div class="dashboard__left__header">
                    <h5>Applicant Suggestions</h5>
                    <TransparentButton @click="goToSearch"
                        class="dashboard__left__header__button dashboard__left__header__button--sug" hasLabel="true"
                        label="Search more" iconName="NavArrowRight" iconPosition="right" />
                </div>
                <div class="dashboard__left__block--sug__jobs">
                    <CrewSug v-for="crew in crewSuggestions" :key="crew.name" v-bind="crew"
                        @navigateToProfile="handleNavigateToProfile" />
                </div>
            </div>
        </div>

        <div class="dashboard__right">
            <div class="dashboard__right__schedule">
                <Week />
                <div class="dashboard__right__schedule__cards">
                    <ScheduleCard title="Meeting with John" label="10:00 - 11:00" class="schedulecard" />
                    <ScheduleCard title="Design review" label="13:00 - 14:00" type="personal" class="schedulecard" />
                    <ScheduleCard title="Team meeting" label="15:00 - 16:00" class="schedulecard" />
                    <ScheduleCard title="Meeting with John" label="10:00 - 11:00" class="schedulecard" />
                    <ScheduleCard title="Design review" label="13:00 - 14:00" type="personal" class="schedulecard" />
                    <ScheduleCard title="Meeting with John" label="10:00 - 11:00" class="schedulecard" />
                    <ScheduleCard title="Design review" label="13:00 - 14:00" type="personal" class="schedulecard" />
                    <ScheduleCard title="Meeting with John" label="10:00 - 11:00" class="schedulecard" />
                    <ScheduleCard title="Design review" label="13:00 - 14:00" type="personal" class="schedulecard" />
                    <ScheduleCard title="Team meeting" label="15:00 - 16:00" class="schedulecard" />
                </div>
            </div>
        </div>
        <Overlay v-if="selectedJob" @overlayClick="closeJobPop">
            <JobPop v-if="selectedJob" :job="selectedJob" />
        </Overlay>
    </div>
</template>

<style scoped>
.dashboard,
.dashboard__left,
.dashboard__left__block,
.dashboard__left__header,
.dashboard__left__block--active__jobs,
.dashboard__right,
.dashboard__right__schedule,
.dashboard__right__schedule__cards,
.schedulecard {
    display: flex;
}

.dashboard,
.dashboard__left__block--active__jobs {
    flex-direction: row;
}

.dashboard__left,
.dashboard__left__block,
.dashboard__right,
.dashboard__right__schedule,
.dashboard__right__schedule__cards {
    flex-direction: column;
}

.dashboard__left__block,
.dashboard__left__block--sug__jobs,
.dashboard__right,
.dashboard__right__schedule__cards {
    gap: 16px;
}

.dashboard__left__block--active__jobs,
.dashboard__right__schedule {
    gap: 24px;
}

/* GENERAL */
.dashboard {
    gap: 64px;
}

/* LEFT */
.dashboard__left {
    gap: 32px;
}

.dashboard__left__header {
    justify-content: space-between;
    align-items: center;
}

h5 {
    margin: 0;
    font-weight: 100;
    color: var(--black);
    text-transform: uppercase;
}

.dashboard__left__header__button {
    width: 136px;
    margin-right: -12px;
    margin-top: -8px;
}

.dashboard__left__header__button--active {
    margin-right: -32px;
}

.dashboard__left__block--sug__jobs {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
}

/* RIGHT */
.dashboard__right,
.dashboard__right__schedule {
    flex: 1;
}

.dashboard__right__schedule__cards {
    max-height: 612px;
    overflow-y: scroll;
    overflow-x: hidden;
    scrollbar-width: none;
}

.schedulecard {
    min-height: 80px;
}
</style>