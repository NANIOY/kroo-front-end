<script setup>
import setupAxios from '../../setupAxios';
import { ref, onMounted, watch, computed } from 'vue';
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
const companyNameNotFound = ref(false);
const businessNames = ref([]);
const businessMap = ref(new Map());
const joinRequestSent = ref(false);
const buttonLabel = ref('Next');

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

        if (Array.isArray(businessResponse.data.data.businesses)) {
            businessResponse.data.data.businesses.forEach(business => {
                const name = business.businessInfo.companyName.toLowerCase();
                businessMap.value.set(name, business._id);
            });
            businessNames.value = Array.from(businessMap.value.keys());
        } else {
            console.error('Unexpected response structure:', businessResponse.data);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
});

const hasTyped = ref(false);

watch(
    () => localfields.value.find(field => field.localStorageKey === 'companyName').value,
    (newValue) => {
        if (newValue !== '') {
            hasTyped.value = true;
        }
        companyNameNotFound.value = !businessNames.value.includes(newValue.toLowerCase());
        joinRequestSent.value = false;
        buttonLabel.value = companyNameNotFound.value ? 'Next' : 'Join';
    }
);

const inputNoteText = computed(() => {
    if (!hasTyped.value) return '';
    if (joinRequestSent.value) return 'Join request sent successfully. Please check with your employer for an email.';
    return companyNameNotFound.value
        ? 'Company not found. Check the spelling or continue to create your company.'
        : 'Company found. Press Join to send a join request.';
});

const handleSubmit = async () => {
    const companyName = localfields.value.find(field => field.localStorageKey === 'companyName').value.toLowerCase();
    if (businessMap.value.has(companyName)) {
        const businessId = businessMap.value.get(companyName);
        try {
            await axiosInstance.post(`/business/join?businessId=${businessId}`);
            joinRequestSent.value = true;
        } catch (error) {
            console.error('Error sending join request:', error);
        }
    } else {
        window.location.href = '/#/register/business/step-1';
    }
};
</script>

<template>
    <div class="registerContainer">
        <Form class="registerContainer__form" :header="'Hello ' + username" :hasSteps="false" steps="" :hasBack="true"
            :hasSkip="false" :hasText="true"
            text="Create your business account below and enter the company name. If it exists, join your employer or create your business on kroo."
            :localfields="localfields" :hasLargeButton="true" :buttonLabel="buttonLabel" :inputNoteText="inputNoteText"
            @submit="handleSubmit" />
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