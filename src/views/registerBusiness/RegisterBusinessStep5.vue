<script setup>
import setupAxios from '../../setupAxios';
import { ref, onMounted, computed } from 'vue';
import Form from '../../components/organisms/forms/Form.vue';
import LoginImage from '../../components/molecules/login/LoginImage.vue';

</script>

<template>
    <div class="registerContainer">
        <Form class="registerContainer__form" header="Add members" :hasSteps="true"
            steps="Set up business account: step 5/5" :hasBack="true" :hasText="true"
            text="Invite your employees and assign roles for permissions."
            :hasLocalStorageButton="true" buttonLabel="Finish" endpoint="/business" redirect="/dashboard" />
        <LoginImage class="registerContainer__image" />
    </div>
</template>

<style scoped></style>