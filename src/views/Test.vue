<script setup>
    import PaymentMethodSelector  from '../components/atoms/bill/PaymentMethod.vue';
</script>

<template>
    <PaymentMethodSelector paymentMethod="apple pay" />
    <PaymentMethodSelector paymentMethod="Visa" />
    <PaymentMethodSelector paymentMethod="mastercard" />
    <PaymentMethodSelector paymentMethod="paypal" />
    <PaymentMethodSelector paymentMethod="google pay" />
    <PaymentMethodSelector paymentMethod="bancontact" />
</template>

<style scoped></style>