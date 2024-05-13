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

import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';

const router = useRouter();

// NAVIGATION FUNCTIONS
const goToTracker = () => {
    router.push('/tracker');
};
const goToSearch = () => {
    router.push('/search');
};
const goToUpgrade = () => {
    router.push('/upgrade');
};

const fetchedJobs = ref([]);
const selectedJob = ref(null);

// open job popup when job is clicked
const openJobPop = (job) => {
    selectedJob.value = job;
};

// close job popup
const closeJobPop = () => {
    selectedJob.value = null;
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
                    <JobCardBus cardType="highlight" applicants="12" status="Open" date="March 12" title="title"
                        func="gaffer" />
                    <JobCardBus cardType="default" applicants="12" status="Open" date="March 12" title="title"
                        func="gaffer" />
                    <JobCardBus cardType="default" applicants="12" status="Open" date="March 12" title="title"
                        func="gaffer" />
                </div>
            </div>

            <div class="dashboard__left__block">
                <div class="dashboard__left__header">
                    <h5>Crew Suggestions</h5>
                    <TransparentButton @click="goToSearch"
                        class="dashboard__left__header__button dashboard__left__header__button--sug" hasLabel="true"
                        label="Search more" iconName="NavArrowRight" iconPosition="right" />
                </div>
                <div class="dashboard__left__block--sug__jobs">
                    <CrewSug name="Test"
                        img="https://res.cloudinary.com/dqzaz6d2o/image/upload/v1715265202/user-images/jji0f5zxxzaop7kkihn7.png"
                        perc="00" jobtitle="job title" />
                    <CrewSug name="Test"
                        img="https://res.cloudinary.com/dqzaz6d2o/image/upload/v1715265202/user-images/jji0f5zxxzaop7kkihn7.png"
                        perc="00" jobtitle="job title" />
                    <CrewSug name="Test"
                        img="https://res.cloudinary.com/dqzaz6d2o/image/upload/v1715265202/user-images/jji0f5zxxzaop7kkihn7.png"
                        perc="00" jobtitle="job title" />
                    <CrewSug name="Test"
                        img="https://res.cloudinary.com/dqzaz6d2o/image/upload/v1715265202/user-images/jji0f5zxxzaop7kkihn7.png"
                        perc="00" jobtitle="job title" />
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
    max-height: 648px;
    overflow-y: scroll;
    overflow-x: hidden;
    scrollbar-width: none;
}

.schedulecard {
    min-height: 80px;
}
</style>