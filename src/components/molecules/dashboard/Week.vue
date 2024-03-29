<script setup>
import { ref } from 'vue';
import TransparentButton from '../../atoms/buttons/TransparentButton.vue';

const currentDate = ref(new Date());

const options = { month: 'long', year: 'numeric' };
const formattedDate = ref(getFormattedDate(currentDate.value));
const weekDays = ref(getWeekDays(currentDate.value));

function getFormattedDate(date) {
    const monthYear = date.toLocaleDateString('en-GB', options);
    return `${monthYear.substr(0, monthYear.lastIndexOf(' '))}, ${monthYear.substr(monthYear.lastIndexOf(' ') + 1)}`;
}

function getWeekDays(date) {
    const days = [];
    const firstDayOfWeek = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1); // get first day of week
    const monday = new Date(date.setDate(firstDayOfWeek)); // set start of week to monday
    for (let i = 0; i < 7; i++) {
        const day = new Date(monday.getTime() + i * 86400000); // 86400000 ms = 1 day
        const abbr = day.toLocaleDateString('en-GB', { weekday: 'short' }).substring(0, 2); // get first 2 letters of weekday
        days.push({ abbr: abbr, number: day.getDate() });
    }
    return days;
}

// go to next week
function nextWeek() {
    currentDate.value.setDate(currentDate.value.getDate() + 7);
    updateWeek();
}

// go to previous week
function previousWeek() {
    currentDate.value.setDate(currentDate.value.getDate() - 7);
    updateWeek();
}

// update week
function updateWeek() {
    formattedDate.value = getFormattedDate(currentDate.value);
    weekDays.value = getWeekDays(currentDate.value);
}
</script>

<template>
    <div class="container">
        <div class="container__top">
            <h5>{{ formattedDate }}</h5>
            <div class="container__top__buttons">
                <TransparentButton class="no-label" hasLabel="false" iconName="NavArrowLeft" @click="previousWeek" />
                <TransparentButton class="no-label" hasLabel="false" iconName="NavArrowRight" @click="nextWeek" />
            </div>
        </div>
        <div class="container__bot">
            <div v-for="(day, index) in weekDays" :key="index" class="container__bot__days">
                <div class="container__bot__days__abbr">{{ day.abbr }}</div>
                <div class="container__bot__days__abbr__number">{{ day.number }}</div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.container {
    width: 496px;
    display: flex;
    flex-direction: column;
}

.container__top {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.container__top__buttons {
    display: flex;
}

.container__bot {
    display: flex;
}

.container__bot__days {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.container__bot__days__abbr {
    font-weight: bold;
}

.container__bot__days__abbr__number {
    margin-top: 4px;
}
</style>