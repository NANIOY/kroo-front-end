<script setup>
import { ref } from 'vue';
import Form from '../components/organisms/forms/Form.vue';
import LoginImage from '../components/molecules/login/LoginImage.vue';
import { getSelectedRole } from '../components/organisms/forms/Form.vue';

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

const agreeCheckbox = { label: 'I agree to the Terms & Conditions and Privacy Policy' };

const getPostData = () => {
    const data = {};
    for (const field of inputFields.value) {
        data[field.label] = field.value;
    }
    data['role'] = getSelectedRole();
    return data;
};
</script>

<template>
    <div class="registerContainer">
        <Form class="registerContainer__form" :hasSelectors="true" :hasText="true" header="Create account"
            text="Choose between Crew or Business account to tailor your experience, and remember, you can always switch or create the other later."
            :inputFields="inputFields" :checkbox="agreeCheckbox" buttonLabel="Create account"
            noteText="Already have an account? Log in" noteLink="/login" endpoint="/user" :postData="getPostData()" />

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