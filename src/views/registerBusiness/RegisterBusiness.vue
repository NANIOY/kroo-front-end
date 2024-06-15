<script setup>
import setupAxios from '../../setupAxios';
import { ref, onMounted, watch } from 'vue';
import Form from '../../components/organisms/forms/Form.vue';
import LoginImage from '../../components/molecules/login/LoginImage.vue';

const localfields = ref([
    {
        hasLabel: true,
        label: 'Company',
        placeholder: 'Enter company name',
        localStorageKey: 'companyName',
        group: 'businessInfo',
        value: ''
    }
]);

const axiosInstance = setupAxios();
const username = ref('');
const companyNameInput = ref('');
const companyNameNotFound = ref(false);
const businessNames = ref([]);

onMounted(async () => {
    try {
        const userId = sessionStorage.getItem('userId');

        if (!userId) {
            throw new Error('User ID not found in session storage');
        }

        const userResponse = await axiosInstance.get(`/user/${userId}`);
        const userData = userResponse.data.data.user;

        username.value = userData.username;

        const businessResponse = await axiosInstance.get('/business');
        console.log('Full business response:', businessResponse);

        if (Array.isArray(businessResponse.data.data.businesses)) {
            businessNames.value = businessResponse.data.data.businesses.map(
                business => business.businessInfo.companyName.toLowerCase()
            );
        } else {
            console.error('Unexpected response structure:', businessResponse.data);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
});

watch(
    () => localfields.value.find(field => field.localStorageKey === 'companyName').value,
    (newValue) => {
        console.log('Company name input changed:', newValue);
        companyNameNotFound.value = !businessNames.value.includes(newValue.toLowerCase());
    }
);
</script>

<template>
    <div class="registerContainer">
        <Form class="registerContainer__form" :header="'Hello ' + username" :hasSteps="false" steps="" :hasBack="true"
            :hasSkip="false" :hasText="true"
            text="Create your business account below and enter the company name. If it exists, join your employer or create your business on kroo."
            :localfields="localfields" :hasLargeButton="true" buttonLabel="Next" redirect="/register/business/step-1"
            v-model:companyNameInput="companyNameInput"
            :inputNoteText="companyNameNotFound ? 'Company not found. Check the spelling or continue to create your company.' : ''" />
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