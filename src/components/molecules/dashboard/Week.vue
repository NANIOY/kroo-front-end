<script setup>
import { ref, defineEmits, watch } from 'vue';
import TransparentButton from '../../atoms/buttons/TransparentButton.vue';

const currentDate = ref(new Date());
const selectedDate = ref(new Date());
const emits = defineEmits(['daySelected']);

const options = { month: 'long', year: 'numeric' };
const formattedDate = ref(getFormattedDate(currentDate.value));
const weekDays = ref(getWeekDays(currentDate.value));

watch(selectedDate, markActiveDay);

function getFormattedDate(date) {
    const monthYear = date.toLocaleDateString('en-GB', options);
    return `${monthYear.substr(0, monthYear.lastIndexOf(' '))}, ${monthYear.substr(monthYear.lastIndexOf(' ') + 1)}`;
}

function getWeekDays(date) {
    const days = [];
    const firstDayOfWeek = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);
    const monday = new Date(date.getTime());
    monday.setDate(firstDayOfWeek);
    for (let i = 0; i < 7; i++) {
        const day = new Date(monday.getTime() + i * 86400000);
        const abbr = day.toLocaleDateString('en-GB', { weekday: 'short' }).substring(0, 2);
        days.push({ abbr: abbr, number: day.getDate(), fullDate: day });
    }
    return days;
}

function nextWeek() {
    const nextDate = new Date(currentDate.value.getTime());
    nextDate.setDate(nextDate.getDate() + 7);
    currentDate.value = nextDate;
    updateWeek();
}

function previousWeek() {
    const prevDate = new Date(currentDate.value.getTime());
    prevDate.setDate(prevDate.getDate() - 7);
    currentDate.value = prevDate;
    updateWeek();
}

function updateWeek() {
    const currentWeekStartDate = getWeekStartDate(currentDate.value);
    formattedDate.value = getFormattedDate(currentWeekStartDate);
    weekDays.value = getWeekDays(currentDate.value);
    markActiveDay();
}

function markActiveDay() {
    const selectedDay = selectedDate.value.getDate();
    const selectedMonth = selectedDate.value.getMonth();
    const selectedYear = selectedDate.value.getFullYear();

    weekDays.value.forEach((day) => {
        const dayDate = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth(), day.number);
        day.isActive = (dayDate.getDate() === selectedDay && dayDate.getMonth() === selectedMonth && dayDate.getFullYear() === selectedYear);
    });
}

function getWeekStartDate(date) {
    const firstDayOfWeek = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);
    return new Date(date.getFullYear(), date.getMonth(), firstDayOfWeek);
}

function selectDay(day) {
    selectedDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth(), day.number);
    emits('daySelected', selectedDate.value);
}

markActiveDay();
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
            <div v-for="(day, index) in weekDays" :key="index" class="container__bot__days" @click="selectDay(day)">
                <div class="container__bot__days__abbr text-bold-normal text-secondary">{{ day.abbr }}</div>
                <div :class="['container__bot__days__number text-reg-s', { 'active-day': day.isActive }]">
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
    text-transform: uppercase;
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
    cursor: pointer;
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