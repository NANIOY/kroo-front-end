<script setup>
import NormalButton from '../../atoms/buttons/NormalButton.vue';
import { defineProps } from 'vue';

const props = defineProps({
    employer: Object,
    job: Object,
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
            <span class="container__bot__rate">€ {{ job.hourlyRate }}/hr</span>
            <div class="container__bot__buttons">
                <NormalButton label="Save Job" class="container__bot__buttons__save button--tertiary" />
                <NormalButton label="Apply Now" class="container__bot__buttons__apply button--primary" />
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
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-sizing: border-box;
    cursor: pointer;
    transition: 0.3s;
}

.container:hover {
    filter: brightness(0.92);
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
    gap: 16px;
}

.container__mid__title {
    margin: 0;
    font-weight: 100;
    display: flex;
    flex-direction: column-reverse;
    height: 64px;
}

.container__mid__data {
    display: flex;
    justify-content: space-between;
}

.container__mid__data div {
    display: flex;
    flex-direction: column;
}

.container__mid__data__location {
    text-align: right;
}

/* BOTTOM */
.container__bot {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 24px;
}

.container__bot__buttons {
    display: flex;
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