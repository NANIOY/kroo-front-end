<script setup>
import { ref } from 'vue';
import PostedJob from '../../components/molecules/jobs/PostedJob.vue';
import Applicant from '../../components/molecules/crew/Applicant.vue';
import ActiveCrew from '../../components/molecules/crew/ActiveCrew.vue';
import NormalButton from '../../components/atoms/buttons/NormalButton.vue';

const applicants = ref([
    {
        name: 'John Doe',
        image: 'https://res.cloudinary.com/dqzaz6d2o/image/upload/v1715265202/user-images/jji0f5zxxzaop7kkihn7.png',
        jobTitle: 'Lighting Technician',
        applicationDate: '2024-07-01T00:00:00.000Z',
    },
    {
        name: 'Jane Smith',
        image: 'https://res.cloudinary.com/dqzaz6d2o/image/upload/v1715265202/user-images/jji0f5zxxzaop7kkihn7.png',
        jobTitle: 'Sound Engineer',
        applicationDate: '2024-07-02T00:00:00.000Z',
    },
]);

const activeCrew = ref([
    {
        name: 'John Doe',
        image: 'https://res.cloudinary.com/dqzaz6d2o/image/upload/v1715265202/user-images/jji0f5zxxzaop7kkihn7.png',
        role: 'Lighting Technician',
        jobTitle: 'Job title',
    },
    {
        name: 'Jane Smith',
        image: 'https://res.cloudinary.com/dqzaz6d2o/image/upload/v1715265202/user-images/jji0f5zxxzaop7kkihn7.png',
        role: 'Sound Engineer',
        jobTitle: 'Job title',
    },
]);
</script>

<template>
    <div id="tracker">
        <div class="tracker__container">
            <div class="tracker__container__top">
                <h6>POSTED JOBS</h6>
                <NormalButton label="Create Job" class="button--secondary" id="addButton" :hasIcon="true"
                    iconName="Plus" :hasLabel="true" :hasRequest="false" />
            </div>
            <div class="tracker__container__column">
                <PostedJob />
            </div>
        </div>

        <div class="tracker__container">
            <div class="tracker__container__top">
                <h6>WHO APPLIED</h6>
                <NormalButton label="Search for crew" class="button--tertiary" id="addButton" :hasIcon="true"
                    iconName="Search" :hasLabel="true" :hasRequest="false" />
            </div>
            <div class="tracker__container__column">
                <Applicant v-for="applicant in applicants" :key="applicant.name" :applicant="applicant" />
            </div>
        </div>

        <div class="tracker__container tracker__container--last">
            <h6>ACTIVE CREW</h6>
            <div class="tracker__container__column">
                <ActiveCrew v-for="crewMember in activeCrew" :key="crewMember.name" :crewMember="crewMember" />
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
    max-height: 768px;
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