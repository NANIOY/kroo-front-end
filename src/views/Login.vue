<script setup>
import { ref } from 'vue';
import Form from '../components/organisms/forms/Form.vue';
import LoginImage from '../components/molecules/login/LoginImage.vue';

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
  <div class="loginContainer">
    <Form class="loginContainer__form" :hasText="false" header="Log in" :inputFields="inputFields"
      :checkbox="rememberMeCheckbox" :forgotPassword="true" buttonLabel="Log in" endpoint="/auth/login"
      :postData="getPostData()" :rememberMe="true" noteText="Don’t have an account yet? Create an account"
      noteLink="register" redirect="/dashboard" />
    <LoginImage class="loginContainer__image" />
  </div>
</template>

<style scoped>
.loginContainer {
  display: flex;
  justify-content: space-between;
  margin-left: 156px;
  margin-right: 244px;
}

.loginContainer__form {
  margin-top: 36px;
}
</style>