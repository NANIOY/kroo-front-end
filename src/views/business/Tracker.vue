<script setup>
import { ref } from 'vue';
import PostedJob from '../../components/molecules/jobs/PostedJob.vue';
import Applicant from '../../components/molecules/crew/Applicant.vue';
import ActiveCrew from '../../components/molecules/crew/ActiveCrew.vue';
import NormalButton from '../../components/atoms/buttons/NormalButton.vue';
import CreateJobModal from '../../components/molecules/popups/CreateJob.vue';

const isModalVisible = ref(false);

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
                <Applicant />
            </div>
        </div>

        <div class="tracker__container tracker__container--last">
            <h6>ACTIVE CREW</h6>
            <div class="tracker__container__column">
                <ActiveCrew />
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