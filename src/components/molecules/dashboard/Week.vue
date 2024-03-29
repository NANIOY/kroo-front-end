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
                <TransparentButton class="container__top__button no-label" hasLabel="false" iconName="NavArrowLeft"
                    @click="previousWeek" />
                <TransparentButton class="container__top__button no-label" hasLabel="false" iconName="NavArrowRight"
                    @click="nextWeek" />
            </div>
        </div>
        <div class="container__bot">
            <div v-for="(day, index) in weekDays" :key="index" class="container__bot__days">
                <div class="container__bot__days__abbr text-bold-normal text-secondary">{{ day.abbr }}</div>
                <div class="container__bot__days__number text-reg-l text-secondary">{{ day.number }}</div>
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
    margin-top: 10px;
}
</style>