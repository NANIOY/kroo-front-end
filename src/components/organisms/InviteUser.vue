<script setup>
import { onMounted } from 'vue';
import NormalButton from '../atoms/buttons/NormalButton.vue';
import InputField from '../atoms/inputs/InputField.vue';
import setupAxios from '../../setupAxios';


// const axiosInstance = setupAxios();

// onMounted(async () => {
//     try {
//         const userId = sessionStorage.getItem('userId');

//         if (!userId) {
//             throw new Error('User ID not found in session storage');
//         }

//         const response = await axiosInstance.get(`/mail/userId/invite`);
//         const userData = response.data.data.user;

//         username.value = userData.username;

//         companyNameNotFound.value = userData.companyName === undefined || userData.companyName === null;
//     } catch (error) {
//         console.error('Error fetching user data:', error);
//     }
// });


</script>

<template>
        <div class="invite__container">
                <InputField class="invite__field" :hasLabel=true label="Invite a team member" :hasIconLeft=true iconLeftName="Mail" placeholder="Email" />
                <NormalButton class="button--primary invite__button" :hasIcon=true iconName="ShareAndroid" label="Send invite"></NormalButton>
        </div>
</template>

<style scoped>

.invite__container {
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    gap: 16px;
    width: 600px;
}

.invite__button {
    height: 48px !important;
    width: 200px;
}

.invite__field {
    width: 100%;
    border-radius: 8px;
}

</style>