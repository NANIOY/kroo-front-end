<script setup>
import { useRouter } from 'vue-router';
import { ref, onMounted, computed } from 'vue';
import moment from 'moment';

// IMPORT DASHBOARD COMPONENTS
import JobCardBus from '../../components/molecules/dashboard/JobCardBus.vue';
import CrewSug from '../../components/molecules/dashboard/CrewSug.vue';
import Week from '../../components/molecules/dashboard/Week.vue';
import ScheduleCard from '../../components/molecules/dashboard/ScheduleCard.vue';

// IMPORT OTHER
import TransparentButton from '../../components/atoms/buttons/TransparentButton.vue';
import LargeButton from '../../components/atoms/buttons/LargeButton.vue';
import CreateJob from '../../components/molecules/popups/CreateJob.vue';
import setupAxios from '../../setupAxios';

const axiosInstance = setupAxios();
const router = useRouter();
const activeJobs = ref([]);
const crewSuggestions = ref([]);
const isModalVisible = ref(false);
const isJobPopVisible = ref(false);
const loading = ref(true);
const calendarEvents = ref([]);
const selectedDate = ref(new Date());
const filteredEvents = ref([]);

// NAVIGATION FUNCTIONS
const goToTracker = () => {
    router.push('/tracker');
};
const goToSearch = () => {
    router.push('/search');
};

const selectedJob = ref({
    title: '',
    description: '',
    wage: '',
    date: '',
    time: '',
    skills: [],
    jobFunction: '',
    location: {
        city: '',
        address: ''
    },
    production_type: '',
    union_status: '',
    attachments: []
});

// Fetch active jobs
const fetchActiveJobs = async () => {
    const userId = sessionStorage.getItem('userId');
    try {
        const userResponse = await axiosInstance.get(`/user/${userId}`);
        const businessId = userResponse.data.data.user.businessData;

        const jobResponse = await axiosInstance.get(`/bussjob/${businessId}`);
        const sortedJobs = jobResponse.data.linkedJobs.sort((a, b) => new Date(a.date) - new Date(b.date));
        activeJobs.value = sortedJobs.slice(0, 3);
        activeJobs.value.forEach(job => console.log('Job Function:', job.jobFunction));
    } catch (error) {
        console.error('Error fetching active jobs:', error);
    }
};

// Fetch crew suggestions
const fetchCrewSuggestions = async () => {
    try {
        const { data } = await axiosInstance.get('/user');
        const crewMembers = data.data.users.filter(user => user.crewData);

        // fetch crew data for each crew member
        const crewDataPromises = crewMembers.map(async member => {
            const crewDataResponse = await axiosInstance.get(`/crew/${member.crewData}`);
            const crewData = crewDataResponse.data.data;

            return {
                member,
                crewData
            };
        });

        const crewDataList = await Promise.all(crewDataPromises);

        // define base max points
        const baseMaxPoints = 4;

        crewSuggestions.value = crewDataList.map(({ member, crewData }) => {
            console.log('Functions', member.username, ':', crewData.basicInfo.functions);

            let points = 0;
            activeJobs.value.forEach(job => {
                console.log('Comparing Job Function:', job.jobFunction);
                const normalizedJobFunction = job.jobFunction.trim().toLowerCase();
                const hasMatchingFunction = crewData.basicInfo.functions.some(func => {
                    const normalizedFunc = func.trim().toLowerCase();
                    console.log(`Checking if '${normalizedFunc}' matches '${normalizedJobFunction}'`);
                    return normalizedFunc === normalizedJobFunction;
                });
                if (hasMatchingFunction) {
                    points += 4;
                }
            });

            // convert points to percentage
            const perc = (points / baseMaxPoints) * 100;

            // log points and percentage
            console.log(`Points for ${member.username}:`, points);
            console.log(`Percentage for ${member.username}:`, perc);

            return {
                img: crewData.basicInfo.profileImage,
                name: member.username,
                perc,
                jobtitle: 'Job title', // HARD CODED
                functions: crewData.basicInfo.functions,
                userUrl: member.userUrl
            };
        });

        // sort by percentage
        crewSuggestions.value.sort((a, b) => b.perc - a.perc);

    } catch (error) {
        console.error('Error fetching crew suggestions:', error);
    }
};


// Fetch calendar events
const fetchCalendarEvents = async () => {
    const userId = sessionStorage.getItem('userId');
    try {
        const response = await axiosInstance.get(`/calendar/google/events?userId=${userId}`);
        calendarEvents.value = response.data.map(event => {
            const startDate = event.start.dateTime ? new Date(event.start.dateTime) : new Date(event.start.date);
            const endDate = event.end.dateTime ? new Date(event.end.dateTime) : new Date(event.end.date);
            const startTime = event.start.dateTime ? event.start.dateTime.split('T')[1].substring(0, 5) : 'All Day';
            const endTime = event.end.dateTime ? event.end.dateTime.split('T')[1].substring(0, 5) : 'All Day';

            return {
                ...event,
                date: startDate,
                startDate: startDate,
                endDate: endDate,
                startTime: startTime,
                endTime: endTime,
                label: event.summary || 'No Title',
                type: event.type,
                description: event.description || 'No Description'
            };
        });
        filterEventsBySelectedDate();
    } catch (error) {
        console.error('Failed to fetch calendar events:', error);
    }
};

const filterEventsBySelectedDate = () => {
    const startOfDay = new Date(selectedDate.value);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(startOfDay);
    endOfDay.setHours(23, 59, 59, 999);
    filteredEvents.value = calendarEvents.value.filter(event => event.startDate >= startOfDay && event.startDate <= endOfDay);
};

const handleDaySelected = (date) => {
    selectedDate.value = date;
    filterEventsBySelectedDate();
};

// Initialize data on mount
onMounted(() => {
    fetchActiveJobs();
    fetchCrewSuggestions();
    fetchCalendarEvents();
});

const navigateToProfile = (userUrl) => {
    const userId = userUrl.split('/').pop();
    window.open(`/#/user/${userId}`, '_blank');
};
const createJobModalType = ref('create');
const openModal = (job = null) => {
    if (job) {
        selectedJob.value = { ...job };
        createJobModalType.value = 'create';
    } else {
        selectedJob.value = {
            title: '',
            description: '',
            wage: '',
            date: '',
            time: '',
            skills: [],
            jobFunction: '',
            location: {
                city: '',
                address: ''
            },
            production_type: '',
            union_status: '',
            attachments: []
        };
        createJobModalType.value = 'create';
    }
    isModalVisible.value = true;
};

const closeModal = () => {
    isModalVisible.value = false;
};

const handleCreateJob = (jobData) => {
    closeModal();
};

const handleDeleteJob = (jobId) => {
    closeModal();
};

onMounted(() => {
    fetchActiveJobs().then(fetchCrewSuggestions);
    fetchCalendarEvents();
});

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
                    <div v-if="activeJobs.length === 0"
                        class="dashboard__left__block--active__jobs dashboard__left__block--active__jobs--none">
                        <div class="placeholder text-reg-l">No active job postings.</div>
                        <LargeButton class="button--primary" @click="openModal" hasLabel="true" label="Create Job"
                            iconName="Plus" iconPosition="left" :hasRequest="false" />
                    </div>

                    <div v-else class="dashboard__left__block--active__jobs">
                        <JobCardBus v-for="(job, index) in activeJobs" :key="job._id"
                            :date="new Date(job.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })"
                            :title="job.title" :func="job.jobFunction" :applicants="job.applications.length.toString()"
                            :status="'Open'" :cardType="index === 0 ? 'highlight' : 'default'"
                            :class="{ 'single-job': activeJobs.length === 1, 'two-jobs': activeJobs.length === 2 }" />
                    </div>
                </div>
            </div>

            <div class="dashboard__left__block dashboard__left__block--sug">
                <div class="dashboard__left__header">
                    <h5>Applicant Suggestions</h5>
                    <TransparentButton @click="goToSearch"
                        class="dashboard__left__header__button dashboard__left__header__button--sug" hasLabel="true"
                        label="Search more" iconName="NavArrowRight" iconPosition="right" />
                </div>
                <div class="dashboard__left__block--sug__jobs">
                    <CrewSug v-if="activeJobs.length > 0" v-for="crew in crewSuggestions" :key="crew.name" v-bind="crew"
                        @navigateToProfile="navigateToProfile" />
                    <div v-else class="placeholder text-reg-l">No crew suggestions available until there are active job
                        postings.</div>
                </div>
            </div>
        </div>

        <div class="dashboard__right">
            <div class="dashboard__right__schedule">
                <Week @daySelected="handleDaySelected" />
                <div class="dashboard__right__schedule__cards">
                    <ScheduleCard v-for="(event, index) in filteredEvents" :key="index" :title="event.label"
                        :label="`${event.startTime} - ${event.endTime}`" :type="event.type" class="schedulecard" />
                    <div v-if="filteredEvents.length === 0" class="dashboard__right__placeholder">
                        <p class="text-reg-normal text-secondary">No events scheduled for this day.</p>
                    </div>
                </div>
            </div>
        </div>

        <CreateJob :isVisible="isModalVisible" :postData="selectedJob" :type="createJobModalType"
            :jobId="selectedJob._id" @close="closeModal" @submit="handleCreateJob" @delete="handleDeleteJob" />
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

.dashboard__left__block--active__jobs--none {
    justify-content: center;
    align-items: center;
    gap: 48px;
    width: 100%;
    height: 100%;
    margin-bottom: 128px;
}

.dashboard__left__block--active__jobs {
    width: 100%;
}

.single-job {
    width: 100% !important;
}

.single-job .jobCard {
    width: 100% !important;
}

.two-jobs {
    width: 100% !important;
}

.two-jobs .jobCard {
    width: 50% !important;
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

.placeholder {
    color: var(--neutral-80);
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