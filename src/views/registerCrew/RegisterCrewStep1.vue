<script setup>
import setupAxios from '../../setupAxios';
import { ref, onMounted } from 'vue';
import Form from '../../components/organisms/forms/Form.vue';
import LoginImage from '../../components/molecules/login/LoginImage.vue';


const dropdownProps = {
    hasLabel: true,
    label: 'Agenda service',
    placeholder: 'Choose service',
    options: ['Google Calendar', 'Outlook Calendar', 'Apple Calendar']
};

const dropdown = ref(dropdownProps);

const axiosInstance = setupAxios();
const username = ref('');
const fetchUserData = async () => {
    try {
        const userId = sessionStorage.getItem('userId');

        if (!userId) {
            throw new Error('User ID not found in session storage');
        }

        const response = await axiosInstance.get(`/user/${userId}`);
        const userData = response.data.data.user;

        username.value = userData.username;
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
};

onMounted(fetchUserData);
</script>

<template>
    <div class="registerContainer">
        <Form class="registerContainer__form" :header="'Hello ' + username" :hasSteps="true"
            steps="Setup profile: Step 1/5" :hasBack="false" :hasSkip="true" :hasText="true"
            text="Let's get you started! For a swift and seamless job experience, we kindly request you to connect your calendar service."
            :dropdown="dropdown"
            inputNoteText="Your agenda service is secure. We respect your data and keep it confidential."
            :hasLargeButton="true" buttonLabel="Next" redirect="/register/crew/step-2" />
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