<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import NormalButton from '../../atoms/buttons/NormalButton.vue';
import TransparentButton from '../../atoms/buttons/TransparentButton.vue';

const currentTimePosition = ref('0px');

// calculate position of current time indicator
function calculateTimeIndicatorPosition() {
  const now = new Date();
  console.log("Current Time:", now.toLocaleString());

  // get start of day
  const startOfDay = new Date(now);
  startOfDay.setHours(0, 0, 0, 0); // set hours, minutes, seconds, and milliseconds to 0
  console.log("Start of Day:", startOfDay.toLocaleString());

  // calculate time difference in milliseconds between now and start of day
  const timeDiff = now.getTime() - startOfDay.getTime();
  console.log("Time Difference (milliseconds):", timeDiff);

  // calculate current position of time indicator
  const currentPosition = (timeDiff / (1000 * 60 * 60)) * 88;
  console.log("Current Position:", currentPosition);

  return `${currentPosition}px`;
}

// update current time position every minute
function updateCurrentTimePosition() {
  currentTimePosition.value = calculateTimeIndicatorPosition();
  setTimeout(updateCurrentTimePosition, 60000);
}

// go to today's date
function goToToday() {
  currentDate.value = new Date();
  updateWeek();
}

updateCurrentTimePosition();

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
  const monday = new Date(date.getTime()); // create a new Date object
  monday.setDate(firstDayOfWeek); // set start of week to monday
  for (let i = 0; i < 7; i++) {
    const day = new Date(monday.getTime() + i * 86400000); // 86400000 ms = 1 day
    const abbr = day.toLocaleDateString('en-GB', { weekday: 'short' }).substring(0, 2); // get first 2 letters of weekday
    days.push({ abbr: abbr, number: day.getDate() });
  }
  return days;
}

function nextWeek() {
  const nextDate = new Date(currentDate.value.getTime()); // create a new Date object
  nextDate.setDate(nextDate.getDate() + 7);
  currentDate.value = nextDate;
  updateWeek();
}

function previousWeek() {
  const prevDate = new Date(currentDate.value.getTime()); // create a new Date object
  prevDate.setDate(prevDate.getDate() - 7);
  currentDate.value = prevDate;
  updateWeek();
}

function updateWeek() {
  const currentWeekStartDate = getWeekStartDate(currentDate.value); // get start date of current week
  formattedDate.value = getFormattedDate(currentWeekStartDate); // use start date to get formatted date
  weekDays.value = getWeekDays(currentDate.value);
}

function getWeekStartDate(date) {
  const firstDayOfWeek = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);
  return new Date(date.getFullYear(), date.getMonth(), firstDayOfWeek);
}

updateWeek();
</script>

<template>
  <div class="schedule">
    <div class="schedule__top">
      <div class="schedule__top__left">
        <NormalButton label="Today" class="schedule__top__left__today button--primary" @click="goToToday" />
        <div class="schedule__top__left__arrows">
          <TransparentButton iconName="NavArrowLeft" class="schedule__top__left__arrows__arrow no-label"
            @click="previousWeek" />
          <TransparentButton iconName="NavArrowRight" class="schedule__top__left__arrows__arrow no-label"
            @click="nextWeek" />
        </div>
        <h5 class="schedule__top__left__date">{{ formattedDate }}</h5>
      </div>
      <NormalButton iconName="Plus" label="Add card" class="schedule__top__add button--secondary" />
    </div>

    <div class="schedule__calendar">
      <div class="schedule__days text-reg-s">
        <div class="schedule__days__abbr" v-for="(day, index) in weekDays" :key="index">
          {{ day.abbr }} {{ day.number }}
        </div>
      </div>

      <div class="schedule__columns" style="position: relative;">
        <div class="schedule__columns__hours text-reg-s">
          <div class="schedule__columns__hours__hour">00:00</div>
          <div class="schedule__columns__hours__hour" v-for="hour in 23" :key="hour + 1">
            {{ hour < 10 ? '0' + hour : hour }}:00 </div>
          </div>

          <template v-for="day in 7" :key="day">
            <div class="schedule__column">
              <div class="schedule__column__blocks">
                <div class="schedule__column__blocks__block" v-for="hour in 24" :key="hour"
                  :class="{ weekend: day > 5 }"></div>
              </div>
            </div>
          </template>

          <div class="time-indicator" :style="{ top: currentTimePosition }"></div>
        </div>


      </div>
    </div>
</template>

<style scoped>
.time-indicator {
  position: absolute;
  left: 56px;
  width: calc(100% - 56px);
  height: 2px;
  background-color: var(--blurple);
}

/* GENERAL */
.schedule {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* TOP */
.schedule__top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.schedule__top__left {
  display: flex;
  align-items: center;
  gap: 20px;
}

.schedule__top__left__today {
  width: 112px;
}

.schedule__top__left__arrows {
  display: flex;
  gap: 4px;
}

.schedule__top__left__arrows__arrow {
  padding: 0;
}

h5 {
  font-weight: 100;
  color: var(--black);
}

.schedule__top__add {
  width: 128px;
}

/* CALENDAR */
.schedule__calendar {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 79.3vh;
}

/* DAYS */
.schedule__days {
  display: flex;
  margin-left: 56px;
  border-bottom: 0.1px solid var(--neutral-30);
  box-shadow: 12px 0px 12px rgba(0, 0, 0, 0.1);
}

.schedule__days__abbr {
  width: 190.5px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* HOURS */
.schedule__columns__hours__hour {
  height: 88px;
  width: 48px;
  text-align: right;
  padding-right: 8px;
}

/* COLUMNS */
.schedule__columns {
  display: flex;
  overflow-x: auto;
}

.schedule__column {
  width: 192px;
}

.schedule__column__blocks {
  overflow-y: auto;
}

.schedule__column__blocks__block {
  height: 88px;
  border: 0.5px solid var(--neutral-30);
  box-sizing: border-box;
}

.schedule__column__block {
  height: 100%;
}

.weekend {
  background-color: rgba(188, 188, 188, 0.2);
}
</style>