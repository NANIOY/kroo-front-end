<script setup>
import { ref, watch, defineEmits } from 'vue';
import TransparentButton from '../../atoms/buttons/TransparentButton.vue';

const emit = defineEmits(['day-clicked']);

const currentDate = ref(new Date());
const options = { month: 'long', year: 'numeric' };
const formattedDate = ref(getFormattedDate(currentDate.value));
const weeks = ref(getMonthWeeks(currentDate.value));
const selectedDay = ref(null);

watch(selectedDay, (newVal) => {
    if (newVal) {
        const weekRange = getWeekRange(newVal);
        emit('day-clicked', { date: newVal, weekRange });
    }
});

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
    const firstDayOfWeek = firstDayOfMonth.getDay();
    const numDaysFromPrevMonth = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;

    for (let i = 0; i < numDaysFromPrevMonth; i++) {
        const prevDay = new Date(firstDayOfMonth.getTime() - (numDaysFromPrevMonth - i) * 24 * 60 * 60 * 1000);
        currentWeek.push({
            abbr: prevDay.toLocaleDateString('en-GB', { weekday: 'short' }).substring(0, 2),
            number: prevDay.getDate(),
            isPrevMonth: true
        });
    }

    for (let i = 1; i <= numDaysInMonth; i++) {
        const day = new Date(date.getFullYear(), date.getMonth(), i);
        currentWeek.push({
            abbr: day.toLocaleDateString('en-GB', { weekday: 'short' }).substring(0, 2),
            number: day.getDate(),
            isActive: day.getDate() === currentDate.value.getDate(),
            isWeekend: day.getDay() === 0 || day.getDay() === 6
        });

        if (day.getDay() === 0 || i === numDaysInMonth) {
            weeks.push(currentWeek);
            currentWeek = [];
        }
    }

    if (weeks.length > 0 && weeks[weeks.length - 1].length < 7) {
        const lastWeek = weeks[weeks.length - 1];
        let dayIndex = 1;
        while (lastWeek.length < 7) {
            const nextDay = new Date(lastDayOfMonth.getFullYear(), lastDayOfMonth.getMonth() + 1, dayIndex++);
            lastWeek.push({
                abbr: nextDay.toLocaleDateString('en-GB', { weekday: 'short' }).substring(0, 2),
                number: nextDay.getDate(),
                isNextMonth: true
            });
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

function getWeekRange(date) {
    const firstDayOfWeek = new Date(date);
    const lastDayOfWeek = new Date(date);
    const dayOfWeek = date.getDay();
    firstDayOfWeek.setDate(date.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1));
    lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6);
    return {
        start: firstDayOfWeek,
        end: lastDayOfWeek
    };
}
</script>

<template>
    <div class="calendar radius-m">
        <div class="calendar__top">
            <h6 class="calendar__month">{{ formattedDate }}</h6>
            <div class="calendar__top__buttons">
                <TransparentButton class="calendar__top__button no-label" hasLabel="false" iconName="NavArrowLeft"
                    @click="previousMonth" />
                <TransparentButton class="calendar__top__button no-label" hasLabel="false" iconName="NavArrowRight"
                    @click="nextMonth" />
            </div>
        </div>
        <div class="calendar__bot">
            <div class="calendar__bot__days text-bold-normal">
                <div v-for="day in weeks[0]" :key="day.abbr" :class="{ 'calendar__bot__days__abbr': true }">
                    {{ day.abbr }}
                </div>
            </div>
            <div class="calendar__bot__numbers text-reg-normal">
                <template v-for="(week) in weeks">
                    <div v-for="(day, dayIndex) in week" :key="dayIndex" class="calendar__bot__numbers__number"
                        :class="['day', { 'prev-month-day': day.isPrevMonth, 'next-month-day': day.isNextMonth, 'weekend-day': day.isWeekend }]">
                        {{ day.number }}
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<style scoped>
.calendar,
.calendar__top,
.calendar__top__buttons,
.calendar__bot,
.calendar__bot__week,
.calendar__bot__days,
.calendar__bot__days__abbr {
    display: flex;
}

.calendar {
    flex-direction: column;
    gap: 16px;
    color: var(--black);
    background-color: var(--white);
    padding: 24px;
    width: fit-content;
}

.calendar__month {
    text-transform: uppercase;
}

.calendar__top {
    justify-content: space-between;
    align-items: center;
}

h5 {
    color: var(--black);
    font-weight: 100;
    text-transform: uppercase;
}

.calendar__top__button {
    width: 32px !important;
    height: 32px !important;
}

.calendar__bot {
    justify-content: space-between;
    flex-direction: column;
}

.calendar__bot__days {
    display: grid;
    grid-template-columns: repeat(7, auto);
    border-bottom: 1.5px solid var(--neutral-80);
    gap: 12px;
    padding: 0px 4px 8px 4px;
}

.calendar__bot__days__abbr {
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
}

.calendar__bot__numbers {
    display: grid;
    grid-template-columns: repeat(7, auto);
    gap: 12px;
    padding: 12px 4px 0px 4px;
}

.calendar__bot__numbers__number {
    border-radius: 100%;
    width: 24px;
    height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.5rem
}

.prev-month-day  {
    opacity: 0.4;
}

.next-month-day {
    opacity: 0.2;
}

.weekend-day {
    opacity: 0.7;
}
</style>