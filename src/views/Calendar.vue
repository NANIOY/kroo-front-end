<script setup>
import { ref } from 'vue';
import Month from '../components/molecules/calendar/Month.vue';
import CalendarFilter from '../components/molecules/calendar/CalendarFilter.vue';
import Schedule from '../components/molecules/calendar/Schedule.vue';

const calendarEvents = ref([
  {
    emoji: "📅",
    label: "Meeting",
    startTime: "09:00",
    endTime: "10:00",
    type: "interview",
    date: new Date(2024, 3, 9)
  },
]);
</script>

<template>
  <div class="calendarContainer">
    <div class="schedule__monthfilter">
      <Month class="test" />
      <CalendarFilter class="test" />
    </div>
    <Schedule :calendarEvents="calendarEvents" />
  </div>
</template>

<style scoped>
.calendarContainer {
  display: flex;
  flex-direction: row;
  gap: 24px;
}

.schedule__monthfilter {
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 272px;
}
</style>