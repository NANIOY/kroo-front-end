<script setup>
import PaymentMethodSelector from '../components/atoms/bill/PaymentMethod.vue';

const paymentMethodOptions = [
    { imageUrl: "/assets/paymentMethod/ApplePay.webp", altText: "Apple Pay" },
    { imageUrl: "/assets/paymentMethod/Bancontact.webp", altText: "Bancontact" },
    { imageUrl: "/assets/paymentMethod/GooglePay.webp", altText: "Google Pay" },
    { imageUrl: "/assets/paymentMethod/mastercard.webp", altText: "Mastercard" },
    { imageUrl: "/assets/paymentMethod/PayPal.webp", altText: "PayPal" },
    { imageUrl: "/assets/paymentMethod/visa-logo.webp", altText: "Visa" }
];

</script>

<template>
    <div class="container">
        <label class="payment-method-label">Payment methods</label>

        <div class="payment-methods">
            <PaymentMethodSelector v-for="(method, index) in paymentMethodOptions" :key="index"
                :imageUrl="method.imageUrl" :altText="method.altText" @click="handlePaymentMethodSelected"
                class="margin-bottom-16" />
        </div>
    </div>
</template>

<style scoped>
.container {
    margin-bottom: 16px;
}

.payment-methods {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

.payment-method-label {
    margin-top: 20px;
    font-size: 16px;
    font-family: var(--font-body);
}
</style>