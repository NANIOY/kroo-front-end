<script setup>
import Form from '../components/organisms/forms/Form.vue';
import { ref } from 'vue';
const inputFields = ref([
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
  }
]);

const checkbox = { label: 'Remember me' };
</script>

<template>
  <Form :hasText="false" header="Sign in" :inputFields="inputFields" :checkbox="checkbox" :forgotPassword="true"
    buttonLabel="Submit" noteText="Don’t have an account yet? Create an account" noteLink="register" />
</template>

<style scoped></style>