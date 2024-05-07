<script setup>
import { ref } from 'vue';
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
</script>

<template>
    <div class="registerContainer">
        <Form class="registerContainer__form" header="Connectivity" :hasSteps="true"
            steps="Set up business account: step 2/5" :dropdown="dropdown" :hasBack="true" :hasText="true"
            text="Establish seamless connections to enhance your business network." :hasSocialInput="true"
            :hasLargeButton="true" buttonLabel="Next" redirect="/register/business/step-3" />
        <LoginImage class="registerContainer__image" />
    </div>
</template>

<style scoped></style>