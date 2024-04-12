<script setup>
import { ref } from 'vue';
import Form from '../components/organisms/forms/Form.vue';
import LoginImage from '../components/molecules/login/LoginImage.vue';

const inputFields = ref([
  {
    label: 'username',
    hasLabel: true,
    placeholder: 'Enter your name',
    hasIconLeft: false,
    isPassword: false,
  },
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

const agreeCheckbox = { label: 'I agree to the Terms & Conditions and Privacy Policy' };

const selectedRole = ref(null);

const getPostData = () => {
  const data = {};

  for (const field of inputFields.value) {
    data[field.label] = field.value;
  }

  delete data['Repeat password'];

  data.role = selectedRole.value;

  return data;
};

const setRedirectPath = () => {
  if (selectedRole.value === 'crew') {
    return '/register/crew';
  } else if (selectedRole.value === 'business') {
    return '/register/business';
  } else {
    return '/register/crew';
  }
};
</script>

<template>
  <div class="registerContainer">
    <Form class="registerContainer__form" :hasSelectors="true" :hasText="true" header="Create account"
      text="Choose between Crew or Business account to tailor your experience, and remember, you can always switch or create the other later."
      :inputFields="inputFields" :checkbox="agreeCheckbox" buttonLabel="Create account"
      noteText="Already have an account? Log in" noteLink="/login" :hasAuthButton="true" :redirect="setRedirectPath()"
      endpoint="/user" :selectedRole="selectedRole" :postData="getPostData()" :isRegistration="true"
      @update:selectedRole="value => selectedRole = value" />
    <LoginImage class="registerContainer__image" />
  </div>
</template>

<style scoped>
.registerContainer {
  display: flex;
  justify-content: space-between;
  margin-left: 156px;
  margin-right: 244px;
}

.registerContainer__form {
  margin-top: 24px;
}
</style>