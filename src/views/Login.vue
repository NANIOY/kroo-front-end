<script setup>
import Form from '../components/organisms/forms/Form.vue';
import { ref } from 'vue';
const inputFields = ref([
  {
    label: 'Username',
    hasLabel: true,
    placeholder: 'Enter your username',
    hasIconLeft: false,
    isError: false,
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
]);

const dropdown = {
  label: 'Select Option',
  placeholder: 'Choose an option',
  items: [
    { value: 'option1', text: 'Option 1' },
    { value: 'option2', text: 'Option 2' },
    { value: 'option3', text: 'Option 3' }
  ]
};

const checkbox = { label: 'Remember me' };
</script>

<template>
  <Form :hasBack="true" :hasText="true" :hasSteps="true" :hasSkip="true" header="Form Header" steps="Step 1: Step Name"
    text="Choose between Crew or Business account to tailor your experience, and remember, you can always switch or create the other later."
    :inputFields="inputFields" :dropdown="dropdown" :checkbox="checkbox" buttonLabel="Submit" />
</template>

<style scoped></style>