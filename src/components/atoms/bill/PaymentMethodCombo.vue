<script setup>
import PaymentMethodSelector from './PaymentMethod.vue';

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
    <div class="paymentmethodcombo">
        <label class="paymentmethodcombo__label text-reg-normal">Payment methods</label>

        <div class="paymentmethodcombo__methods">
            <PaymentMethodSelector v-for="(method, index) in paymentMethodOptions" :key="index"
                :imageUrl="method.imageUrl" :altText="method.altText" @click="handlePaymentMethodSelected"
                class="margin-bottom-16" />
        </div>
    </div>
</template>

<style scoped>
.paymentmethodcombo {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-top: 16px;
}

.paymentmethodcombo__methods {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 12px;
}
</style>