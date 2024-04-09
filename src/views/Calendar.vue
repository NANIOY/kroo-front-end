<script setup>
import Month from '../components/molecules/calendar/Month.vue';
import CalendarFilter from '../components/molecules/calendar/CalendarFilter.vue';
import Schedule from '../components/molecules/calendar/Schedule.vue';
import CalendarCard from '../components/molecules/calendar/CalendarCard.vue';
</script>

<template>
  <!-- <div class="calendarContainer">
    <div class="schedule__monthfilter">
      <Month class="test" />
      <CalendarFilter class="test" />
    </div>
    <Schedule />
  </div> -->

  <CalendarCard
      emoji="📅"
      label="Meeting"
      startTime="09:00"
      endTime="10:30"
      type="personal"
    />
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