<script setup>
import NormalButton from '../../atoms/buttons/NormalButton.vue';
import { defineProps } from 'vue';

const props = defineProps({
    employer: String,
    job: String
});

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.getDate();
};

const formatMonth = (dateString) => {
    const date = new Date(dateString);
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return monthNames[date.getMonth()];
};
</script>

<template>
    <div class="container">
        <div class="container__info">
            <div class="container__top">
                <img :src="employer.image" class="container__top__image" alt="Employer's Logo" />
                <span class="container__top__name text-reg-s">{{ employer.name }}</span>
            </div>

            <div class="container__mid">
                <h4 class="container__mid__title">{{ job.title }}</h4>
                <div class="container__mid__data">
                    <div class="container__mid__data__date">
                        <span class="container__mid__data__date__day text-reg-l">{{ formatDate(job.date) }}</span>
                        <span class="container__mid__data__date__month text-reg-normal">{{ formatMonth(job.date)
                            }}</span>
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
            <span class="container__bot__rate">Hourly Rate: {{ job.hourlyRate }}</span>
            <div class="container__bot__buttons">
                <NormalButton label="Apply Now" class="container__bot__buttons__apply" />
                <NormalButton label="Save Job" class="container__bot__buttons__save" />
            </div>
        </div>
    </div>
</template>

<style scoped>
/* GENERAL */
.container {
    width: 448px;
    height: 282px;
    background-color: var(--neutral-20);
    color: var(--black);
    border-radius: 4px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.container__info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 20px;
}

/* TOP */
.container__top {
    display: flex;
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
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.container__mid__title {
    margin: 0;
    font-weight: 100;
}

.container__mid__data {
    display: flex;
    justify-content: space-between;
}

.container__mid__data div {
    display: flex;
    flex-direction: column;
}

.container__mid__data__date {}

/* BOTTOM */
.container__bot {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.container__bot__rate {}

.container__bot__buttons {
    display: flex;
}

.container__bot__buttons__apply,
.container__bot__buttons__save {}
</style>