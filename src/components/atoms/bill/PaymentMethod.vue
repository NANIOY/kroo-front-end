<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
    paymentMethod: String
});

const getPaymentMethodObject = (method) => {
    const paymentMethodImages = {
        'apple pay': { name: 'Apple Pay', imageUrl: '../../../assets/paymentMethod/ApplePay.webp' },
        'visa': { name: 'Visa', imageUrl: '../../../assets/paymentMethod/visa-logo.webp' },
        'mastercard': { name: 'Mastercard', imageUrl: '../../../assets/paymentMethod/mastercard.webp' },
        'paypal': { name: 'Paypal', imageUrl: '../../../assets/paymentMethod/paypal.webp' },
        'google pay': { name: 'Google Pay', imageUrl: '../../../assets/paymentMethod/googlepay.webp' },
        'bancontact': { name: 'Bancontact', imageUrl: '../../../assets/paymentMethod/bancontact.webp' },
    };

    const selectedMethod = paymentMethodImages[method.toLowerCase()] || { name: 'Unknown', imageUrl: '' };

    // Log the selected image URL
    console.log(`Selected payment method: ${selectedMethod.name}`);
    console.log(`Image URL: ${selectedMethod.imageUrl}`);

    return selectedMethod;
};

const paymentMethod = computed(() => {
    return props.paymentMethod ? getPaymentMethodObject(props.paymentMethod) : null;
});

function logImageDimensions(event) {
    console.log(`Image dimensions: ${event.target.width} x ${event.target.height}`);
}
</script>

<template>
    <div>
        <div class="payment-method-title">Payment method</div>
        <div class="payment-methods">
            <div v-if="paymentMethod" class="payment-method" @click="logImageDimensions">
                <div class="payment-image">
                    <img :src="paymentMethod.imageUrl" :alt="paymentMethod.name" @load="logImageDimensions" />
                </div>
            </div>
            <div v-else class="no-image">No Image</div>
        </div>
    </div>
</template>

<style scoped>
.payment-method-title {
    font-weight: bold;
    margin-bottom: 10px;
}

.payment-methods {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

.payment-method {
    cursor: pointer;
    flex-basis: calc(33.33% - 10px);
    /* 33.33% width with a gap of 10px */
    margin-bottom: 10px;
}

.selected {
    border: 2px solid blue;
}

.payment-image {
    background-color: #EBEBEB;
    border-radius: 10px;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.payment-image img {
    width: 100px;
    height: auto;
    border-radius: 8px;
    background-size: contain;
    background-image: url('../../..//assets/');
    background-color: red;
}

.no-image {
    font-size: 14px;
    color: #555;
}
</style>