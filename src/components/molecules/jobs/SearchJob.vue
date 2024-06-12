<script setup>
import { ref, defineProps, defineEmits, onMounted } from 'vue';
import NormalButton from '../../atoms/buttons/NormalButton.vue';
import Tag from '../../atoms/items/Tag.vue';
import JobPop from '../popups/JobPop.vue';

const props = defineProps({
    job: Object,
});

const loading = ref(true);
const isJobPopVisible = ref(false);
const selectedJob = ref(null);

onMounted(() => {
    setTimeout(() => {
        loading.value = false;
    }, 0);
});

// format date string to day
const getFormattedDate = (dateString, options) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
};

// open job popup when job is clicked
const openJobPop = () => {
    selectedJob.value = props.job;
    isJobPopVisible.value = true;
};

const closeJobPop = () => {
    isJobPopVisible.value = false;
    selectedJob.value = null;
};
</script>

<template>
    <div v-if="loading || !job" class="container skeleton"></div>
    <div v-else class="container" @click="openJobPop">
        <div class="container__info">
            <div class="container__top" v-if="job.employer">
                <img :src="job.employer.image" class="container__top__image" alt="Employer's Logo" />
                <span class="container__top__name text-reg-s">{{ job.employer.name }}</span>
            </div>
            <div class="container__mid">
                <h4 class="container__mid__title">{{ job.title }}</h4>
                <div class="container__mid__data">
                    <div class="container__mid__data__date">
                        <Tag class="date" type="big">
                            <p>{{ getFormattedDate(job.date, { day: 'numeric' }) }} {{ getFormattedDate(job.date, {
                                month: 'long'
                            }) }}</p>
                        </Tag>
                    </div>
                    <div class="container__mid__data__location">
                        <span class="container__mid__data__location__city text-reg-l">{{ job.location.city }}</span>
                        <span class="container__mid__data__location__country text-reg-normal">{{ job.location.country
                            }}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="container__bot">
            <span class="container__bot__rate">€ {{ job.wage }}/hr</span>
            <div class="container__bot__buttons">
                <NormalButton label="Save Job" class="container__bot__buttons__save button--tertiary"
                    :endpoint="`/crewJobInt/${job.id}/save`" :postData="{}" @click.stop />
                <NormalButton label="Apply Now" class="container__bot__buttons__apply button--primary"
                    :endpoint="`/crewJobInt/${job.id}/apply`" :postData="{}" @click.stop />
            </div>
        </div>
    </div>
    <JobPop v-if="isJobPopVisible" :job="selectedJob" jobType="search" :isVisible="isJobPopVisible"
        @close="closeJobPop" />
</template>

<style scoped>
p {
    margin: 0
}

/* date */
.date {
    height: 24px !important;
}

/* GENERAL */
.container,
.container__info,
.container__top,
.container__mid,
.container__mid__title,
.container__mid__data,
.container__mid__data div,
.container__bot,
.container__bot__buttons {
    display: flex;
}

.container,
.container__info,
.container__mid,
.container__mid__data div {
    flex-direction: column;
}

.container,
.container__info,
.container__mid__data,
.container__bot {
    justify-content: space-between;
}

.container {
    width: 448px;
    height: 282px;
    background-color: var(--neutral-20);
    color: var(--black);
    border-radius: 4px;
    padding: 20px;
    box-sizing: border-box;
    cursor: pointer;
    transition: 0.3s;
}

.container:hover {
    filter: brightness(0.92);
}

.container__info {
    gap: 20px;
}

/* TOP */
.container__top {
    align-items: center;
    gap: 8px;
}

.container__top__image {
    width: 28px;
    height: 28px;
    border-radius: 50%;
}

/* MIDDLE */
.container__mid {
    gap: 16px;
}

.container__mid__title {
    margin: 0;
    font-weight: 100;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
    align-items: center;
    height: 64px;
    word-break: break-word;
}

.container__mid__data__location {
    text-align: right;
}

/* BOTTOM */
.container__bot {
    align-items: center;
    gap: 24px;
}

.container__bot__buttons {
    flex: 1;
    gap: 16px;
}

.container__bot__buttons__save {
    outline: 2px solid var(--blurple);
}

.container__bot__buttons__save,
.container__bot__buttons__apply {
    width: 50%;
}
</style>