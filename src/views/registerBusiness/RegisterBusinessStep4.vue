<script setup>
import Form from '../../components/organisms/forms/Form.vue';
import LoginImage from '../../components/molecules/login/LoginImage.vue';

import PaymentMethodCombo from '../../components/atoms/bill/PaymentMethodCombo.vue';
import DropBillCombo from '../../components/atoms/bill/DropBillCombo.vue';

</script>

<template>
    <div class="registerContainer">
        <Form class="registerContainer__form" header="Payment info" :hasSteps="true"
            steps="Set up business account: step 4/5" :hasBack="true" :hasText="true"
            text="Select the amount of users for your company for a tailored price." :paymentMethodCombo="true" :dropBillCombo="true" :hasLargeButton="true"
            buttonLabel="Next" redirect="/register/business/step-5" />
        <LoginImage class="registerContainer__image" />
    </div>
</template>

<style scoped></style>