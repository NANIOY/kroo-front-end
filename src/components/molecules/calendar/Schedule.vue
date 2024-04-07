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
      <div class="schedule__days">
        <div class="schedule__days__abbr">Monday</div>
        <div class="schedule__days__abbr">Tuesday</div>
        <div class="schedule__days__abbr">Wednesday</div>
        <div class="schedule__days__abbr">Thursday</div>
        <div class="schedule__days__abbr">Friday</div>
        <div class="schedule__days__abbr">Saturday</div>
        <div class="schedule__days__abbr">Sunday</div>
      </div>

      <div class="schedule__columns">
        <template v-for="day in 7" :key="day">
          <div class="schedule__column">
            <div class="schedule__column__blocks">
              <div class="block" v-for="hour in 24" :key="hour"></div>
            </div>
          </div>
        </template>
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
  color: var(--black);
}

/* CALENDAR */
.schedule__calendar {
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  border-radius: 5px;
  overflow: hidden;
  width: 1344px;
}

/* DAYS */
.schedule__days {
  display: flex;
  border-bottom: 1px solid #ccc;
}

.schedule__days__abbr {
  flex: 1;
  padding: 10px;
  text-align: center;
}

/* COLUMNS */
.schedule__columns {
  display: flex;
  flex: 1;
}

.schedule__column {
  width: 192px;
  border-right: 1px solid #ccc;
  overflow: hidden;
}

.schedule__column__blocks {
  height: 2112px;
  overflow-y: hidden;
}

.block {
  height: 88px;
  border-bottom: 1px solid #ccc;
}

.schedule__column__block {
  height: 100%;
  background-color: #f0f0f0;
}
</style>