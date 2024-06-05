<script setup>
import setupAxios from '../../setupAxios';
import { ref, onMounted } from 'vue';
import Form from '../../components/organisms/forms/Form.vue';
import LoginImage from '../../components/molecules/login/LoginImage.vue';

const dropdown = ref({
    hasLabel: true,
    label: 'Agenda service',
    placeholder: 'Choose service',
    options: ['Google Calendar', 'Outlook Calendar', 'Apple Calendar'],
    localStorageKey: 'agendaService',
    group: 'basicInfo'
});

const axiosInstance = setupAxios();
const username = ref('');

onMounted(async () => {
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
});

const handleUpdateAgendaService = async (agendaService) => {
    console.log('Agenda service selected:', agendaService);
    localStorage.setItem('agendaService', agendaService);

    if (agendaService === 'Google Calendar') {
        try {
            const userId = sessionStorage.getItem('userId');
            if (!userId) {
                throw new Error('User ID not found in session storage');
            }
            const response = await axiosInstance.get(`/calendar/google/auth?userId=${userId}`);
            const authUrl = response.data.authUrl;
            window.location.href = authUrl;
        } catch (error) {
            console.error('Error redirecting to Google authorization:', error);
        }
    }
};
</script>

<template>
    <div class="registerContainer">
        <Form class="registerContainer__form" :header="'Hello ' + username" :hasSteps="true"
            steps="Setup profile: Step 1/5" :hasBack="false" :hasSkip="true" :hasText="true"
            text="Let's get you started! For a swift and seamless job experience, we kindly request you to connect your calendar service."
            :dropdown="dropdown"
            inputNoteText="Your agenda service is secure. We respect your data and keep it confidential."
            :hasLargeButton="true" buttonLabel="Next" redirect="/register/crew/step-2"
            @updateAgendaService="handleUpdateAgendaService" />
        <LoginImage class="registerContainer__image" />
    </div>
</template>

<style>
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