<script setup>
import { ref } from 'vue';
import NormalButton from '../../atoms/buttons/NormalButton.vue';
import TransparentButton from '../../atoms/buttons/TransparentButton.vue';

const currentDate = ref(new Date());
const options = { month: 'long', year: 'numeric' };
const formattedDate = ref(getFormattedDate(currentDate.value));

function getFormattedDate(date) {
  const monthYear = date.toLocaleDateString('en-GB', options);
  return `${monthYear.substr(0, monthYear.lastIndexOf(' '))}, ${monthYear.substr(monthYear.lastIndexOf(' ') + 1)}`;
}

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
</script>

<template>
  <div class="schedule">
    <div class="schedule__top">
      <NormalButton label="Today" class="schedule__top__today button--primary" />
      <div class="schedule__top__arrows">
        <TransparentButton iconName="NavArrowLeft" class="schedule__top__arrows__arrow no-label" />
        <TransparentButton iconName="NavArrowRight" class="schedule__top__arrows__arrow no-label" />
      </div>
      <h5 class="schedule__top__date">{{ formattedDate }}</h5>
    </div>

    <div class="schedule__calendar">
      <div class="schedule__calendar__grid">
        <div class="schedule__calendar__grid__column">
          <div class="schedule__calendar__grid__column__time" v-for="hour in 23" :key="hour">{{ hour < 10 ? '0' + hour :
            hour }}:00</div>
          </div>

          <div class="schedule__calendar__grid__column__day">
            <div class="schedule__calendar__grid__column__day__column" v-for="day in days" :key="day">
              <div class="schedule__calendar__grid__column__day__column__header">{{ day }}</div>
              <div class="schedule__calendar__grid__column__day__column__block" v-for="hour in 24" :key="hour"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<style scoped>
/* TOP */
.schedule__top {
  display: flex;
  align-items: center;
  gap: 20px;
}

.schedule__top__today {
  width: 112px;
}

.schedule__top__arrows {
  display: flex;
  gap: 4px;
}

.schedule__top__arrows__arrow {
  padding: 0;
}

h5 {
  font-weight: 100;
}

/* CALENDAR */
.schedule__calendar {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 1392px;
  height: 80vh;
}

/* Grid */
.schedule__calendar__grid {
  display: flex;
  overflow-x: auto;
}

.schedule__calendar__grid__column {
  min-width: 80px;
  border-right: 1px solid #ccc;
}

.schedule__calendar__grid__column__time {
  padding: 10px;
  border-bottom: 1px solid #ccc;
}

.schedule__calendar__grid__column__day {
  flex: 1;
  display: flex;
}

.schedule__calendar__grid__column__day__column {
  flex: 1;
  border-right: 1px solid #ccc;
}

.schedule__calendar__grid__column__day__column__header {
  padding: 10px;
  font-weight: bold;
  border-bottom: 1px solid #ccc;
}

.schedule__calendar__grid__column__day__column__block {
  padding: 10px;
  border-bottom: 1px solid #ccc;
}
</style>