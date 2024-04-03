<script setup>
import Form from '../components/organisms/forms/Form.vue';
import { ref } from 'vue';
const inputFields = ref([
    {
        label: 'Email',
        hasLabel: true,
        placeholder: 'Enter your email',
        hasIconLeft: false,
        isError: false,
        isPassword: false,
    }
]);
</script>

<template>
    <Form :hasText="true" :hasBack="true" header="Reset password"
        text="No worries, we’ll send you a code so you can reset it." :inputFields="inputFields" buttonLabel="Next" />
</template>

<style scoped></style>