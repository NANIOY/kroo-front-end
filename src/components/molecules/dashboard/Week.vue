<script setup>
import TransparentButton from '../../atoms/buttons/TransparentButton.vue';

const currentDate = new Date();
const options = { month: 'long', year: 'numeric' };
const monthYear = currentDate.toLocaleDateString('en-GB', options);
const formattedDate = `${monthYear.substr(0, monthYear.lastIndexOf(' '))}, ${monthYear.substr(monthYear.lastIndexOf(' ') + 1)}`;

const weekDays = [
    { abbr: 'Mo', number: currentDate.getDate() },
    { abbr: 'Tu', number: new Date(currentDate.getTime() + 86400000).getDate() },
    { abbr: 'We', number: new Date(currentDate.getTime() + 2 * 86400000).getDate() },
    { abbr: 'Th', number: new Date(currentDate.getTime() + 3 * 86400000).getDate() },
    { abbr: 'Fr', number: new Date(currentDate.getTime() + 4 * 86400000).getDate() },
    { abbr: 'Sa', number: new Date(currentDate.getTime() + 5 * 86400000).getDate() },
    { abbr: 'Su', number: new Date(currentDate.getTime() + 6 * 86400000).getDate() }
];
</script>

<template>
    <div class="week">
        <div class="top-section">
            <h5>{{ formattedDate }}</h5>
            <div class="button-group">
                <TransparentButton class="no-label" hasLabel="false" iconName="NavArrowLeft" @click="previousWeek" />
                <TransparentButton class="no-label" hasLabel="false" iconName="NavArrowRight" @click="nextWeek" />
            </div>
        </div>
        <div class="bottom-section">
            <div v-for="(day, index) in weekDays" :key="index" class="day">
                <div class="day-abbr">{{ day.abbr }}</div>
                <div class="day-number">{{ day.number }}</div>
            </div>
        </div>
    </div>
</template>


<style scoped>
.week {
    width: 496px;
    display: flex;
    flex-direction: column;
}

.top-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.button-group {
    display: flex;
}

.bottom-section {
    display: flex;
}

.day {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.day-abbr {
    font-weight: bold;
}

.day-number {
    margin-top: 4px;
}
</style>