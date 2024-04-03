<script setup>
import Form from '../components/organisms/forms/Form.vue';
import { ref } from 'vue';
const inputFields = ref([
  {
    label: 'Name',
    hasLabel: true,
    placeholder: 'Enter your name',
    hasIconLeft: false,
    isError: false,
    isPassword: false,
  },
  {
    label: 'Email',
    hasLabel: true,
    placeholder: 'Enter your email address',
    hasIconLeft: false,
    hasIconRight: false,
    isPassword: false,
  },
  {
    label: 'Password',
    hasLabel: true,
    placeholder: 'Enter your password',
    hasIconLeft: false,
    hasIconRight: true,
    iconRightName: 'Eye',
    isPassword: true,
  },
  {
    label: 'Repeat password',
    hasLabel: true,
    placeholder: 'Repeat your password',
    hasIconLeft: false,
    hasIconRight: true,
    iconRightName: 'Eye',
    isPassword: true,
  },
]);

const checkbox = { label: 'I agree to the Terms & Conditions and Privacy Policy' };
</script>

<template>
  <Form :hasBack="true" :hasText="true" :hasSteps="true" :hasSkip="true" header="Form Header" steps="Step 1: Step Name"
    text="Choose between Crew or Business account to tailor your experience, and remember, you can always switch or create the other later."
    :inputFields="inputFields" :dropdown="dropdown" :checkbox="checkbox" :forgotPassword="true"
    buttonLabel="Submit" noteText="Test" noteLink="test" />
</template>

<style scoped></style>