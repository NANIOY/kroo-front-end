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
      <div class="schedule__top__left">
        <NormalButton label="Today" class="schedule__top__left__today button--primary" />
        <div class="schedule__top__left__arrows">
          <TransparentButton iconName="NavArrowLeft" class="schedule__top__left__arrows__arrow no-label" />
          <TransparentButton iconName="NavArrowRight" class="schedule__top__left__arrows__arrow no-label" />
        </div>
        <h5 class="schedule__top__left__date">{{ formattedDate }}</h5>
      </div>
      <NormalButton iconName="Plus" label="Add card" class="schedule__top__add button--secondary" />
    </div>

    <div class="schedule__calendar">
      <div class="schedule__days text-reg-s">
        <div class="schedule__days__abbr">Monday</div>
        <div class="schedule__days__abbr">Tuesday</div>
        <div class="schedule__days__abbr">Wednesday</div>
        <div class="schedule__days__abbr">Thursday</div>
        <div class="schedule__days__abbr">Friday</div>
        <div class="schedule__days__abbr">Saturday</div>
        <div class="schedule__days__abbr">Sunday</div>
      </div>

      <div class="schedule__columns">
        <div class="schedule__columns__hours text-reg-s">
          <div class="schedule__columns__hours__hour ">00:00</div>
          <div class="schedule__columns__hours__hour " v-for="hour in 23" :key="hour + 1">{{ hour < 10 ? '0' + hour :
            hour }}:00</div>
          </div>

          <template v-for="day in 7" :key="day">
            <div class="schedule__column">
              <div class="schedule__column__blocks">
                <div class="schedule__column__blocks__block" v-for="hour in 24" :key="hour"
                  :class="{ weekend: day > 5 }"></div>
              </div>
            </div>
          </template>
        </div>
      </div>
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