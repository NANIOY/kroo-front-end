<script setup>
import { ref } from 'vue';
import TransparentButton from '../../atoms/buttons/TransparentButton.vue';

const currentDate = ref(new Date());
const options = { month: 'long', year: 'numeric' };
const formattedDate = ref(getFormattedDate(currentDate.value));
const weeks = ref(getMonthWeeks(currentDate.value));

// format date as month and year
function getFormattedDate(date) {
    const monthYear = date.toLocaleDateString('en-GB', options);
    return `${monthYear.substr(0, monthYear.lastIndexOf(' '))}, ${monthYear.substr(monthYear.lastIndexOf(' ') + 1)}`;
}

// get the weeks of the month
function getMonthWeeks(date) {
    const weeks = [];
    // get first and last day of month
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const numDaysInMonth = lastDayOfMonth.getDate();
    let currentWeek = [];

    // get the first day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
    const firstDayOfWeek = firstDayOfMonth.getDay();

    // calculate the number of days from the previous month that need to be displayed
    const numDaysFromPrevMonth = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;

    // push empty days for days before the first day of the month
    for (let i = 0; i < numDaysFromPrevMonth; i++) {
        const prevDay = new Date(firstDayOfMonth.getTime() - (numDaysFromPrevMonth - i) * 24 * 60 * 60 * 1000); // calculate the previous day
        currentWeek.push({ abbr: prevDay.toLocaleDateString('en-GB', { weekday: 'short' }).substring(0, 2), number: prevDay.getDate(), isPrevMonth: true });
    }

    // iterate through the days of the month
    for (let i = 1; i <= numDaysInMonth; i++) {
        const day = new Date(date.getFullYear(), date.getMonth(), i);
        currentWeek.push({
            abbr: day.toLocaleDateString('en-GB', { weekday: 'short' }).substring(0, 2),
            number: day.getDate(),
            isActive: day.getDate() === currentDate.value.getDate(),
            isWeekend: day.getDay() === 0 || day.getDay() === 6
        });

        // check if it's the last day of the week or the last day of the month
        if (day.getDay() === 0 || i === numDaysInMonth) {
            weeks.push(currentWeek);
            currentWeek = [];
        }
    }
    return weeks;
}

// go to next month
function nextMonth() {
    const nextDate = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + 1, 1);
    currentDate.value = nextDate;
    updateMonth();
}

// go to previous month
function previousMonth() {
    const prevDate = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() - 1, 1);
    currentDate.value = prevDate;
    updateMonth();
}

// update month
function updateMonth() {
    formattedDate.value = getFormattedDate(currentDate.value);
    weeks.value = getMonthWeeks(currentDate.value);
    markActiveDay();
}

// mark active day based on current date
function markActiveDay() {
    const today = new Date();
    weeks.value.forEach(week => {
        week.forEach(day => {
            const dayDate = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth(), day.number);
            day.isActive = dayDate.toDateString() === today.toDateString();
        });
    });
}
</script>

<template>
    <div class="calendar">
        <div class="calendar__top">
            <h5>{{ formattedDate }}</h5>
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
                        :class="['day', { 'active-day': day.isActive, 'prev-month-day': day.isPrevMonth, 'weekend-day': day.isWeekend }]">
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
    width: 272px;
    flex-direction: column;
    gap: 16px;
    color: var(--black);
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
}

.active-day {
    background-color: var(--green);
    opacity: 1 !important;
}

.prev-month-day {
    opacity: 0.4;
}

.weekend-day {
    opacity: 0.7;
}
</style>