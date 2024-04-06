<script setup>
    import NormalButton from '../../atoms/buttons/NormalButton.vue';
    import TransparentButton from '../../atoms/buttons/TransparentButton.vue';
</script>

<template>
    <div class="schedule">
      <!-- Header -->
      <div class="header">
        <div class="day-header">Monday</div>
        <div class="day-header">Tuesday</div>
        <div class="day-header">Wednesday</div>
        <div class="day-header">Thursday</div>
        <div class="day-header">Friday</div>
        <div class="day-header">Saturday</div>
        <div class="day-header">Sunday</div>
      </div>
      
      <!-- schedule body -->
      <div class="schedule-body">
        <!-- Loop through each hour of the day -->
        <div class="hour" v-for="hour in 24" :key="hour">
          <!-- Loop through each day of the week -->
          <div v-for="day in 7" :key="day" class="day">
            <!-- Hour block -->
            <div class="hour-block"></div>
          </div>
        </div>
      </div>
    </div>
  </template>

<style scoped>
  .schedule {
    display: flex;
    flex-direction: column;
    border: 1px solid #ccc;
    border-radius: 5px;
    overflow: hidden;
    width: 1392px;
  }

  .header {
    display: flex;
    border-bottom: 1px solid #ccc;
  }

  .day-header {
    flex: 1;
    padding: 10px;
    text-align: center;
  }

  .schedule-body {
    display: flex;
    flex: 1;
  }

  .hour {
    flex: 1;
    border-right: 1px solid #ccc;
    overflow: hidden;
  }

  .day {
    height: 60px; /* Adjust height as needed */
    border-bottom: 1px solid #ccc;
    overflow: hidden;
  }

  .hour-block {
    height: 100%;
    background-color: #f0f0f0; /* Default color for an hour block */
  }
</style>