<script setup>
import { ref } from 'vue';
import TransparentButton from '../../atoms/buttons/TransparentButton.vue';

const currentDate = ref(new Date());

const options = { month: 'long', year: 'numeric' };
const formattedDate = ref(getFormattedDate(currentDate.value));
const weeks = ref(getMonthWeeks(currentDate.value));
const weekDays = ref(getWeekDays(currentDate.value));

function getFormattedDate(date) {
    const monthYear = date.toLocaleDateString('en-GB', options);
    return `${monthYear.substr(0, monthYear.lastIndexOf(' '))}, ${monthYear.substr(monthYear.lastIndexOf(' ') + 1)}`;
}

function getMonthWeeks(date) {
    const weeks = [];
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const numDaysInMonth = lastDayOfMonth.getDate();
    let currentWeek = [];
    for (let i = 1; i <= numDaysInMonth; i++) {
        const day = new Date(date.getFullYear(), date.getMonth(), i);
        currentWeek.push({
            abbr: day.toLocaleDateString('en-GB', { weekday: 'short' }).substring(0, 2),
            number: day.getDate(),
            isActive: day.toDateString() === currentDate.value.toDateString()
        });
        if (currentWeek.length === 7 || i === numDaysInMonth) {
            weeks.push(currentWeek);
            currentWeek = [];
        }
    }
    return weeks;
}

function nextMonth() {
    const nextDate = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + 1, 1);
    currentDate.value = nextDate;
    updateMonth();
}

function previousMonth() {
    const prevDate = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() - 1, 1);
    currentDate.value = prevDate;
    updateMonth();
}

function updateMonth() {
    formattedDate.value = getFormattedDate(currentDate.value);
    weeks.value = getMonthWeeks(currentDate.value);
}

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
</script>

<template>
    <div class="container">
        <div class="container__top">
            <h5>{{ formattedDate }}</h5>
            <div class="container__top__buttons">
                <TransparentButton class="container__top__button no-label" hasLabel="false" iconName="NavArrowLeft"
                    @click="previousMonth" />
                <TransparentButton class="container__top__button no-label" hasLabel="false" iconName="NavArrowRight"
                    @click="nextMonth" />
            </div>
        </div>
        <div class="container__bot">
            <!-- Day names row -->
            <div class="container__bot__days">
                <div v-for="day in weekDays" :key="day.abbr" class="container__bot__days__abbr">
                    {{ day.abbr }}
                </div>
            </div>
            <!-- Numbers grid -->
            <div class="container__bot__numbers">
                <template v-for="(week) in weeks">
                    <div v-for="(day, dayIndex) in week" :key="dayIndex" class="container__bot__numbers__number"
                        :class="['day', { 'active-day': day.isActive }]">
                        {{ day.number }}
                    </div>
                </template>
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
.container__bot__days__abbr {
    display: flex;
}

.container {
    width: 272px;
    flex-direction: column;
    gap: 16px;
    color: var(--black);
}

/* TOP */
.container__top {
    justify-content: space-between;
    align-items: center;
}

h5 {
    color: var(--black);
    font-weight: 100;
    text-transform: uppercase;
}

.container__top__button {
    width: 32px !important;
    height: 32px !important;
}

/* BOTTOM */
.container__bot {
    justify-content: space-between;
    flex-direction: column;
}

/* DAYS */
.container__bot__days {
    display: grid;
    grid-template-columns: repeat(7, auto);
    border-bottom: 1.5px solid var(--neutral-80);
    gap: 12px;
    padding: 0px 4px 8px 4px;
}

.container__bot__days__abbr {
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
}

/* NUMBERS */
.container__bot__numbers {
    display: grid;
    grid-template-columns: repeat(7, auto);
    gap: 12px;
    padding: 12px 4px 0px 4px;
}

.container__bot__numbers__number {
    border-radius: 100%;
    width: 24px;
    height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.active-day {
    background-color: var(--green);
}
</style>