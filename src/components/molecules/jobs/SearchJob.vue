<script setup>
import NormalButton from '../../atoms/buttons/NormalButton.vue';
import { defineProps } from 'vue';

const props = defineProps({
    employer: String,
    job: String
});
</script>

<template>
    <div class="container">
        <div class="container__top">
            <img :src="employer.image" class="container__top__image" alt="Employer's Logo" />
            <span class="container__top__name">{{ employer.name }}</span>
        </div>

        <div class="container__mid">
            <h2 class="container__mid__title">{{ job.title }}</h2>
            <div class="container__mid__info">
                <span class="container__mid__info__date">{{ job.date }}</span>
                <span class="container__mid__info__location">{{ job.location }}</span>
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
.container {
    width: 448px;
    height: 282px;
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.container__top {
    display: flex;
    align-items: center;
}

.container__top__image {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 12px;
}

.container__mid {
    margin-bottom: 12px;
}

.container__mid__title {
    font-size: 18px;
    margin-bottom: 8px;
}

.container__mid__info {
    display: flex;
}

.container__mid__info__date {
    margin-right: 12px;
}

.container__bot {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.container__bot__rate {
    font-size: 16px;
}

.container__bot__buttons {
    display: flex;
}

.container__bot__buttons__apply,
.container__bot__buttons__save {
    margin-left: 8px;
}
</style>