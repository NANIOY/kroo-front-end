<script setup>
import Month from '../components/molecules/calendar/Month.vue';
import CalendarFilter from '../components/molecules/calendar/CalendarFilter.vue';

</script>

<template>
  <div class="calendarFilter">
    <Month class="test"/>
    <CalendarFilter class="test"/>
  </div>
</template>

<style scoped>
.calendarFilter {
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 272px;
}
</style>