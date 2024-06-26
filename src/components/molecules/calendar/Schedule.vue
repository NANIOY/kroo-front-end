<script setup>
import { ref, onMounted, computed, watch, defineProps } from 'vue';
import setupAxios from '../../../setupAxios';
import NormalButton from '../../atoms/buttons/NormalButton.vue';
import TransparentButton from '../../atoms/buttons/TransparentButton.vue';
import CalendarCard from './CalendarCard.vue';
import AgendaPop from '../popups/AgendaPop.vue';

// VARIABLES
const props = defineProps({
  weekRange: {
    type: Object,
    default: null
  }
});

const axiosInstance = setupAxios(null);
const currentTimePosition = ref('0px');
const currentDate = ref(new Date());
const formattedDate = ref('');
const weekDays = ref([]);
const calendarEvents = ref([]);
const isPopupVisible = ref(false);
const selectedEvent = ref(null);

// LIFECYCLE HOOKS
onMounted(() => {
  fetchCalendarEvents();
  updateCurrentTimePosition();
  updateWeek();
});

watch(() => props.weekRange, (newWeekRange) => {
  if (newWeekRange && newWeekRange.start) {
    currentDate.value = newWeekRange.start;
  }
});

watch(currentDate, updateWeek);

async function fetchCalendarEvents() {
  const userId = sessionStorage.getItem('userId');
  try {
    const response = await axiosInstance.get(`/calendar/google/events?userId=${userId}`);
    calendarEvents.value = response.data.map(event => {
      const startDate = event.start.dateTime ? new Date(event.start.dateTime) : new Date(event.start.date);
      const endDate = event.end.dateTime ? new Date(event.end.dateTime) : new Date(event.end.date);
      const startTime = event.start.dateTime ? event.start.dateTime.split('T')[1].substring(0, 5) : 'All Day';
      const endTime = event.end.dateTime ? event.end.dateTime.split('T')[1].substring(0, 5) : 'All Day';

      return {
        ...event,
        date: startDate,
        startDate: startDate,
        endDate: endDate,
        startTime: startTime,
        endTime: endTime,
        emoji: '📅',
        label: event.summary || 'No Title',
        type: event.type,
        description: event.description || 'No Description'
      };
    });
  } catch (error) {
    console.error('Failed to fetch calendar events:', error);
  }
}

function updateCurrentTimePosition() {
  currentTimePosition.value = calculateTimeIndicatorPosition();
  setTimeout(updateCurrentTimePosition, 60000);
}

function calculateTimeIndicatorPosition() {
  const now = new Date();
  const startOfDay = new Date(now);
  startOfDay.setHours(0, 0, 0, 0);
  const timeDiff = now.getTime() - startOfDay.getTime();
  return `${(timeDiff / (1000 * 60 * 60)) * 88}px`;
}

function updateWeek() {
  formattedDate.value = getFormattedDate(currentDate.value);
  weekDays.value = getWeekDays(currentDate.value);
}

function getFormattedDate(date) {
  const options = { month: 'long', year: 'numeric' };
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
}

function previousWeek() {
  const prevDate = new Date(currentDate.value.getTime());
  prevDate.setDate(prevDate.getDate() - 7);
  currentDate.value = prevDate;
}

function goToToday() {
  currentDate.value = new Date();
}

function getCardPosition(event) {
  const [startHour, startMinute] = event.startTime.split(':').map(Number);
  const totalMinutes = startHour * 60 + startMinute;
  const top = `${totalMinutes * 1 / 60 * 88}px`;
  let dayIndex = event.date.getDay();
  dayIndex = (dayIndex + 6) % 7;
  const left = `${56 + dayIndex * 192}px`;
  return { top, left };
}

function isEventInCurrentWeek(event) {
  const startOfWeek = getStartOfWeek(currentDate.value);
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(endOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);

  return event.date >= startOfWeek && event.date <= endOfWeek;
}

function getStartOfWeek(date) {
  const startOfWeek = new Date(date);
  const dayOfWeek = date.getDay();
  const diff = date.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
  startOfWeek.setDate(diff);
  startOfWeek.setHours(0, 0, 0, 0);

  return startOfWeek;
}

function openPopup(event) {
  selectedEvent.value = event;
  isPopupVisible.value = true;
  console.log('Selected event:', JSON.stringify(event, null, 2));
}

function closePopup() {
  isPopupVisible.value = false;
  selectedEvent.value = null;
}

function isToday(date) {
  const today = new Date();
  return date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();
}

function addEventToSchedule(newEvent) {
  calendarEvents.value.push(newEvent);
}

</script>

<template>
  <div class="schedule">
    <div class="schedule__top">
      <div class="schedule__top__left">
        <NormalButton label="Today" class="schedule__top__left__today button--primary" :hasRequest=false
          @click="goToToday" />
        <div class="schedule__top__left__arrows">
          <TransparentButton iconName="NavArrowLeft" class="schedule__top__left__arrows__arrow no-label"
            @click="previousWeek" />
          <TransparentButton iconName="NavArrowRight" class="schedule__top__left__arrows__arrow no-label"
            @click="nextWeek" />
        </div>
        <h5 class="schedule__top__left__date">{{ formattedDate }}</h5>
      </div>
      <NormalButton iconName="Plus" label="Add card" class="schedule__top__add button--secondary" :hasRequest=false
        @click="openPopup" />
    </div>

    <div class="schedule__calendar">
      <div class="schedule__days text-reg-s">
        <div class="schedule__days__abbr" v-for="(day, index) in weekDays" :key="index"
          :class="{ 'current-day': isToday(day.fullDate) }">
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
                <template v-for="(event, index) in calendarEvents" :key="index">
                  <div v-if="isEventInCurrentWeek(event) && event.date.getDay() === day - 1"
                    :style="getCardPosition(event)" class="schedule__calendar__card">
                    <CalendarCard :emoji="event.emoji" :label="event.label" :startTime="event.startTime"
                      :endTime="event.endTime" :type="event.type" :description="event.description"
                      @open="openPopup(event)" />
                  </div>
                </template>
              </div>
            </div>
          </template>

          <div class="schedule__calendar__time-indicator" :style="{ top: currentTimePosition }"></div>
        </div>
      </div>

      <AgendaPop :isVisible="isPopupVisible" @close="closePopup" @submit="addEventToSchedule" :event="selectedEvent" />
    </div>
</template>

<style scoped>
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

.current-day {
  font-weight: bolder;
  color: var(--blurple);
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

.schedule__calendar__card {
  position: absolute;
}

.weekend {
  background-color: rgba(188, 188, 188, 0.2);
}

/* TIME INDICATOR */
.schedule__calendar__time-indicator {
  position: absolute;
  left: 56px;
  width: calc(100% - 56px);
  height: 2px;
  background-color: var(--blurple);
}

.schedule__calendar__time-indicator::before {
  content: "";
  position: absolute;
  width: 8px;
  height: 8px;
  background-color: var(--blurple);
  border-radius: 50%;
  left: -4px;
  top: -3px;
}
</style>