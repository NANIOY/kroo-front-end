<script setup>
import { IconoirProvider } from '@iconoir/vue';
import IconLabel from '../../atoms/items/IconLabel.vue';
import TransparentButton from '../../atoms/buttons/TransparentButton.vue';
import { defineProps, defineEmits, ref, onMounted } from 'vue';

const props = defineProps({
    job: Object,
});

const loading = ref(true);

onMounted(() => {
    setTimeout(() => {
        loading.value = false;
    }, 200);
});

// format date string to day and month
const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const month = monthNames[date.getMonth()];
    return `${day} ${month}`;
};

// emit jobClick event when job is clicked
const emits = defineEmits(['jobClick']);

// open job popup when job is clicked
const openJobPop = () => {
    emits('jobClick', props.job);
};

</script>

<template>
    <!-- Skeleton loading -->
    <div v-if="loading || !job" class="jobSug skeleton"></div>

    <div v-else class="jobSug" @click="openJobPop">
        <div class="jobSug__top">
            <img v-if="job.employer" :src="job.employer.image" class="jobSug__top__img" alt="Business logo" width="56"
                height="56">
            <h4 class="jobSug__top__title">{{ job.title }}</h4>
            <IconoirProvider :icon-props="{ 'stroke-width': '2' }">
                <TransparentButton @click.stop class="jobSug__top__save no-label" :hasIcon="true" iconName="Bookmark"
                    color="var(--blurple)" :hasRequest="true" :endpoint="`/crewJobInt/${job.id}/save`"
                    :postData="{ jobId: job.id }" />
            </IconoirProvider>
        </div>
        <div class="jobSug__bot">
            <IconLabel :iconName="'MapPin'" :label="`${job.location.country}, ${job.location.city}`" size="small" />
            <span class="jobSug__bot__sep text-secondary text-reg-l">|</span>
            <IconLabel :iconName="'Calendar'" :label="formatDate(job.date)" size="small" />
            <span class="jobSug__bot__sep text-secondary text-reg-l">|</span>
            <IconLabel :iconName="'Clock'" :label="job.time" size="small" />
        </div>
    </div>
</template>

<style scoped>
/* GENERAL */
.jobSug {
    width: calc(568px - 48px);
    height: calc(160px - 64px);
    background-color: var(--neutral-20);
    padding: 32px 24px;
    border-radius: 4px;
    color: var(--black);
    display: flex;
    gap: 20px;
    flex-direction: column;
    cursor: pointer;
    transition: 0.3s;
}

.jobSug:hover {
    filter: brightness(92%);
}

/* TOP */
.jobSug__top {
    display: flex;
    align-items: center;
    gap: 16px;
}

.jobSug__top__img {
    width: 56px;
    height: 56px;
    border-radius: 4px;
}

.jobSug__top__title {
    max-width: 388px;
    height: 56px;
    margin: 0;
    font-weight: 100;
    line-height: 58px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.jobSug__top__save {
    margin-left: auto;
    width: 32px !important;
    height: 32px !important;
}

/* BOTTOM */
.jobSug__bot {
    display: flex;
    align-items: center;
    margin-top: auto;
}

.jobSug__bot__sep {
    margin: 0 12px;
    opacity: 50%;
}
</style>