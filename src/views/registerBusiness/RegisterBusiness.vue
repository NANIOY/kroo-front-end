<script setup>
import setupAxios from '../../setupAxios';
import { ref, onMounted } from 'vue';
import Form from '../../components/organisms/forms/Form.vue';
import LoginImage from '../../components/molecules/login/LoginImage.vue';

const inputField = ref({
    hasLabel: true,
    label: 'Company',
    placeholder: 'Enter company name',
    group: 'basicInfo'
});

const axiosInstance = setupAxios();
const username = ref('');
const companyNameNotFound = ref(false);

onMounted(async () => {
    try {
        const userId = sessionStorage.getItem('userId');

        if (!userId) {
            throw new Error('User ID not found in session storage');
        }

        const response = await axiosInstance.get(`/user/${userId}`);
        const userData = response.data.data.user;

        username.value = userData.username;

        // Check if company name is not found
        companyNameNotFound.value = userData.companyName === undefined || userData.companyName === null;
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
});

const handleUpdateAgendaService = (service) => {
    console.log('Agenda service entered:', service);
    localStorage.setItem('agendaService', service);
};
</script>

<template>
    <div class="registerContainer">
        <Form class="registerContainer__form" :header="'Hello ' + username" :hasSteps="false" steps="" :hasBack="true"
            :hasSkip="false" :hasText="true"
            text="Create your business account below and enter the company name. If it exists, join your employer or create your business on kroo."
            :inputFields="[inputField]" :hasLargeButton="true" buttonLabel="Next"
            redirect="/register/business/step-1" :inputNoteText="companyNameNotFound ? 'Company not found. Check the spelling or continue to create your company.' : ''"/>
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