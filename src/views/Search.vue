<script setup>
import SearchJob from '../components/molecules/jobs/SearchJob.vue';
</script>

<template>
  <SearchJob :employer="{ name: 'Employer', image: 'https://fakeimg.pl/400x400/000000/ffffff?text=logo' }" :job="{
    title: 'Job Title',
    date: new Date('2024-04-04'),
    location: { city: 'Brussels', country: 'Belgium' },
    hourlyRate: '20'
  }" />
</template>

<style scoped></style>