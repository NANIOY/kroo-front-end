<script setup>
import setupAxios from '../../setupAxios';
import { ref, onMounted, computed } from 'vue';
import Form from '../../components/organisms/forms/Form.vue';
import LoginImage from '../../components/molecules/login/LoginImage.vue';

// const inputComboProps = {
//     label: 'Extra websites',
//     showDropdown: false,
//     input1Placeholder: 'Title',
//     input2Placeholder: 'URL',
//     buttonLabel: 'Add',
// };

const inputUrlProps = {
    label: 'Custom URL',
    hasLabel: true,
    placeholder: computed(() => `${username.value}`),
    isError: false,
    inputWidth: '100%',
    type: 'user',
    localStorageKey: 'userUrl',
};

// const inputCombo = ref(inputComboProps);
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
        <Form class="registerContainer__form" header="Show projects" :hasSteps="true"
            steps="Set up business account: step 3/5" :hasBack="true" :hasText="true"
            text="Highlight your company's projects." :hasSocialInput="false" :inputUrl="inputUrl"
            :hasLargeButton="true" buttonLabel="Next" redirect="/register/business/step-4" />
        <LoginImage class="registerContainer__image" />
    </div>
</template>

<style scoped></style>
