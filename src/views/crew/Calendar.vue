<script setup>
import { ref } from 'vue';
import Month from '../../components/molecules/calendar/Month.vue';
import CalendarFilter from '../../components/molecules/calendar/CalendarFilter.vue';
import Schedule from '../../components/molecules/calendar/Schedule.vue';

const selectedWeekRange = ref(null);

function handleDayClicked({ date, weekRange }) {
  selectedWeekRange.value = weekRange;
}
</script>

<template>
  <div class="calendarContainer">
    <div class="schedule__monthfilter">
      <Month class="test" @day-clicked="handleDayClicked" />
      <CalendarFilter class="test" />
    </div>
    <Schedule :weekRange="selectedWeekRange" />
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