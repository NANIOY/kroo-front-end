<script setup>
import AddNewJob from '../../components/molecules/jobs/AddNewJob.vue';
import PostedJob from '../../components/molecules/jobs/PostedJob.vue';
import Applicant from '../../components/molecules/crew/Applicant.vue';
import ActiveCrew from '../../components/molecules/crew/ActiveCrew.vue';
</script>

<template>
    <div id="tracker">

        <div class="tracker__container">
            <h6>ADD NEW JOB</h6>

            <div class="tracker__container__column">
                <AddNewJob />
            </div>
        </div>

        <div class="tracker__container">
            <h6>POSTED JOBS</h6>

            <div class="tracker__container__column">
                <PostedJob />
                <PostedJob />
            </div>
        </div>

        <div class="tracker__container">
            <h6>WHO APPLIED</h6>

            <div class="tracker__container__column">
                <Applicant />
                <Applicant />
            </div>
        </div>

        <div class="tracker__container">
            <h6>ACTIVE CREW</h6>

            <div class="tracker__container__column">
                <ActiveCrew />
                <ActiveCrew />
            </div>
        </div>

    </div>
</template>


<style scoped>
#tracker {
    display: flex;
    justify-content: space-between;
    gap: 16px;
}

.tracker__container {
    display: flex;
    flex-direction: column;
    gap: 8px;
    flex: 1;
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