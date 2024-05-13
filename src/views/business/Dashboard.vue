<script setup>
import JobCardBus from '../../components/molecules/dashboard/JobCardBus.vue';

</script>

<template>
    <JobCardBus cardType="highlight" applicants="12" status="Open" date="March 12" title="title"
        func="gaffer" />
    <JobCardBus cardType="default" applicants="12" status="Open" date="March 12" title="title"
        func="gaffer" />
    <JobCardBus cardType="default" applicants="12" status="Open" date="March 12" title="title"
        func="gaffer" />
</template>

<style scoped></style>