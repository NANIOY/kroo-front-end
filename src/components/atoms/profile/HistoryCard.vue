<script setup>
import { defineProps, ref, onMounted } from 'vue';

const props = defineProps({
    job: Object,
});

const loading = ref(true);

onMounted(() => {
    setTimeout(() => {
        loading.value = false;
    }, 500);
});

// format date string to day
const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.getDate();
};

// format date string to month
const formatMonth = (dateString) => {
    const date = new Date(dateString);
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return monthNames[date.getMonth()];
};
</script>

<template>
    <!-- Skeleton loading -->
    <div v-if="loading" class="container skeleton"></div>

    <div v-else class="container">
        <div class="container__info">
            <div class="container__top" v-if="job.employer">
                <img :src="job.employer.image" class="container__top__image radius-full" alt="Employer's Logo" />
                <span class="container__top__name text-reg-s">{{ job.employer.name }}</span>
            </div>

            <div class="container__mid">
                <h4 class="container__mid__title">Function</h4>
                <div class="container__mid__data">
                    <div class="container__mid__data__date">
                        <span class="container__mid__data__date__day text-reg-s">{{ formatDate(job.date) }}</span>
                        <span class="container__mid__data__date__month text-reg-xs">{{ formatMonth(job.date) }}</span>
                    </div>
                    <div class="container__mid__data__location">
                        <span class="container__mid__data__location__city text-reg-s">{{ job.location.city }}</span>
                        <span class="container__mid__data__location__country text-reg-xs">{{ job.location.country }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* SKELETON */
.container.skeleton {
    animation: pulse 0.2s infinite alternate;
}

@keyframes pulse {
    0% {
        opacity: 0.8;
    }

    100% {
        opacity: 1;
    }
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
    width: 264px;
    height: 176px;
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
}

/* MIDDLE */
.container__mid {
    gap: 12px;
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
    height: 47px;
    word-break: break-word;
    align-items: flex-end;
    align-content: flex-end;
    -webkit-box-align: end;
}

.container__mid__data__location {
    text-align: right;
}
</style>
