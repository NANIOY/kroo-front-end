<script setup>
import { ref } from 'vue';
import Form from '../components/organisms/forms/Form.vue';

const inputFields = ref([
  {
    label: 'email',
    hasLabel: true,
    placeholder: 'Enter your email address',
    hasIconLeft: false,
    hasIconRight: false,
    isPassword: false,
  },
  {
    label: 'password',
    hasLabel: true,
    placeholder: 'Enter your password',
    hasIconLeft: false,
    hasIconRight: true,
    iconRightName: 'Eye',
    isPassword: true,
  }
]);

const rememberMeCheckbox = ref({ label: 'Remember me', checked: false });

const getPostData = () => {
  const data = {};

  for (const field of inputFields.value) {
    data[field.label] = field.value;
  }

  data['rememberMe'] = rememberMeCheckbox.value.checked;

  return data;
};
</script>

<template>
  <Form :hasText="false" header="Sign in" :inputFields="inputFields" :checkbox="rememberMeCheckbox"
    :forgotPassword="true" buttonLabel="Sign in" endpoint="/auth/login" :postData="getPostData()" :rememberMe="true"
    noteText="Don’t have an account yet? Create an account" noteLink="register" redirect="/dashboard" />
</template>

<style scoped></style>