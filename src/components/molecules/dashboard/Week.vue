<script setup>
import { ref } from 'vue';
import TransparentButton from '../../atoms/buttons/TransparentButton.vue';

const currentDate = ref(new Date());

const options = { month: 'long', year: 'numeric' };
const formattedDate = ref(getFormattedDate(currentDate.value));
const weekDays = ref(getWeekDays(currentDate.value));

// get formatted date (e.g. "April, 2024")
function getFormattedDate(date) {
    const monthYear = date.toLocaleDateString('en-GB', options);
    return `${monthYear.substr(0, monthYear.lastIndexOf(' '))}, ${monthYear.substr(monthYear.lastIndexOf(' ') + 1)}`;
}

// get week days (e.g. [{ abbr: "Mo", number: 1 }, { abbr: "Tu", number: 2 }, ...])
function getWeekDays(date) {
    const days = [];
    const firstDayOfWeek = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1); // get first day of week
    const monday = new Date(date.getTime()); // create a new Date object
    monday.setDate(firstDayOfWeek); // set start of week to monday
    for (let i = 0; i < 7; i++) {
        const day = new Date(monday.getTime() + i * 86400000); // 86400000 ms = 1 day
        const abbr = day.toLocaleDateString('en-GB', { weekday: 'short' }).substring(0, 2); // get first 2 letters of weekday
        days.push({ abbr: abbr, number: day.getDate() });
    }
    return days;
}

// go to next week 
function nextWeek() {
    const nextDate = new Date(currentDate.value.getTime()); // create a new Date object
    nextDate.setDate(nextDate.getDate() + 7);
    currentDate.value = nextDate;
    updateWeek();

}

// go to previous week
function previousWeek() {
    const prevDate = new Date(currentDate.value.getTime()); // create a new Date object
    prevDate.setDate(prevDate.getDate() - 7);
    currentDate.value = prevDate;
    updateWeek();
}

// update week
function updateWeek() {
    const currentWeekStartDate = getWeekStartDate(currentDate.value); // get start date of current week
    formattedDate.value = getFormattedDate(currentWeekStartDate); // use start date to get formatted date
    weekDays.value = getWeekDays(currentDate.value);
    markActiveDay();
}


// mark active day based on current date
function markActiveDay() {
    const today = new Date();
    const currentWeekStartDate = getWeekStartDate(today); // get start date of current week
    const currentWeekEndDate = new Date(currentWeekStartDate.getTime() + 6 * 24 * 60 * 60 * 1000); // get end date of current week

    // iterate through the week days and mark the current day as active if it falls within the current week
    weekDays.value.forEach((day) => {
        const dayDate = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth(), day.number);
        day.isActive = (dayDate >= currentWeekStartDate && dayDate <= currentWeekEndDate && dayDate.toDateString() === today.toDateString());
    });
}

markActiveDay();

// get start date of the week
function getWeekStartDate(date) {
    const firstDayOfWeek = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);
    return new Date(date.getFullYear(), date.getMonth(), firstDayOfWeek);
}


</script>


<template>
    <div class="container">
        <div class="container__top">
            <h5>{{ formattedDate }}</h5>
            <div class="container__top__buttons">
                <TransparentButton class="container__top__button no-label" hasLabel="false" iconName="NavArrowLeft"
                    @click="previousWeek" />
                <TransparentButton class="container__top__button no-label" hasLabel="false" iconName="NavArrowRight"
                    @click="nextWeek" />
            </div>
        </div>
        <div class="container__bot">
            <div v-for="(day, index) in weekDays" :key="index" class="container__bot__days">
                <div class="container__bot__days__abbr text-bold-normal text-secondary">{{ day.abbr }}</div>
                <div :class="['container__bot__days__number', { 'active-day': day.isActive }]">
                    {{ day.number }}
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* GENERAL */
.container,
.container__top,
.container__top__buttons,
.container__bot,
.container__bot__days {
    display: flex;
}

.container {
    width: 496px;
    flex-direction: column;
    gap: 24px;
    border-bottom: 1.5px solid var(--neutral-80);
    padding-bottom: 16px;
}

/* TOP */
.container__top {
    justify-content: space-between;
    align-items: center;
}

h5 {
    margin: 0;
    color: var(--black);
    font-weight: 100;
}

.container__top__button {
    width: 32px !important;
    height: 32px !important;
}

/* BOTTOM */
.container__bot {
    justify-content: space-between;
}

.container__bot__days {
    flex: 1;
    flex-direction: column;
    align-items: center;
}

.container__bot__days__number {
    margin-top: 6px;
    border-radius: 100%;
    width: 32px;
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.active-day {
    background-color: var(--green);
}
</style>