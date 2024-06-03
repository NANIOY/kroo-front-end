<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import PostedJob from '../../components/molecules/jobs/PostedJob.vue';
import Applicant from '../../components/molecules/crew/Applicant.vue';
import ActiveCrew from '../../components/molecules/crew/ActiveCrew.vue';
import NormalButton from '../../components/atoms/buttons/NormalButton.vue';
import CreateJobModal from '../../components/molecules/popups/CreateJob.vue';

const isModalVisible = ref(false);
const activeCrewMembers = ref([]);
const applicants = ref([]);
const router = useRouter();

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
    applicants.value = applicants.value.filter(applicant => applicant.jobTitle !== member.jobTitle);
};
</script>

<template>
    <CreateJobModal :isVisible="isModalVisible" @close="closeModal" @submit="handleCreateJob" />

    <div id="tracker">
        <div class="tracker__container">
            <div class="tracker__container__top">
                <h6>POSTED JOBS</h6>
                <NormalButton label="Create Job" class="button--secondary" id="addButton" :hasIcon="true"
                    iconName="Plus" :hasLabel="true" :hasRequest="false" @click="openModal" />
            </div>
            <div class="tracker__container__column">
                <PostedJob />
            </div>
        </div>

        <div class="tracker__container">
            <div class="tracker__container__top">
                <h6>WHO APPLIED</h6>
                <NormalButton label="Search for crew" class="button--tertiary" id="addButton" :hasIcon="true"
                    iconName="Search" :hasLabel="true" :hasRequest="false" redirect="/search" />
            </div>
            <div class="tracker__container__column">
                <Applicant @navigateToProfile="navigateToProfile" @accepted="addActiveCrewMember" :applicants="applicants" />
            </div>
        </div>

        <div class="tracker__container tracker__container--last">
            <h6>ACTIVE CREW</h6>
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