<script setup>
import HistoryCard from '../components/atoms/profile/HistoryCard'; 
</script>

<template>
  <div>
    <!-- Example of using HistoryCard component -->
    <HistoryCard :job="{
      employer: {
        name: 'Example Employer',
        image: 'example-image-url.jpg'
      },
      title: 'Example Job Title',
      date: '2024-05-24T12:00:00Z', // Example date string
      location: {
        city: 'Example City',
        country: 'Example Country'
      },
      hourlyRate: 20, // Example hourly rate
      id: 'example-job-id' // Example job ID
    }" />
  </div>
</template>

<style scoped>

</style>