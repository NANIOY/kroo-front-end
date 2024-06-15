<script setup>
import { ref, onMounted, computed } from 'vue';
import setupAxios from '../../setupAxios';
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

const inputUrlProps = {
    label: 'Custom URL',
    hasLabel: true,
    placeholder: computed(() => `${username.value}`),
    isError: false,
    inputWidth: '100%',
    type: 'business',
};

const inputUrl = ref(inputUrlProps);

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
        <Form class="registerContainer__form" header="Connectivity" :hasSteps="true"
            steps="Set up business account: step 3/5" :dropdown="dropdown" :inputUrl="inputUrl" :hasBack="true"
            :hasText="true" text="Establish seamless connections to enhance your business network."
            :hasSocialInput="true" :hasLargeButton="true" buttonLabel="Next" redirect="/register/business/step-4" />
        <LoginImage class="registerContainer__image" />
    </div>
</template>

<style scoped></style>