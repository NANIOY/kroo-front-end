<script setup>
import BillType from '../components/atoms/bill/BillType.vue';
import PaymentMethodSelector from '../components/atoms/bill/PaymentMethod.vue';
import Dropdown from '../components/atoms/inputs/DropDown.vue';
import LargeButton from '../components/atoms/buttons/LargeButton.vue'; // Import LargeButton

const dropdownOptions = [
  '2', '3', '4', '5+', '10+'
];

// Payment method options
const paymentMethodOptions = [
  { imageUrl: "/assets/paymentMethod/ApplePay.webp", altText: "Apple Pay" },
  { imageUrl: "/assets/paymentMethod/Bancontact.webp", altText: "Bancontact" },
  { imageUrl: "/assets/paymentMethod/GooglePay.webp", altText: "Google Pay" },
  { imageUrl: "/assets/paymentMethod/mastercard.webp", altText: "Mastercard" },
  { imageUrl: "/assets/paymentMethod/PayPal.webp", altText: "PayPal" },
  { imageUrl: "/assets/paymentMethod/visa-logo.webp", altText: "Visa" }
];

const selectedOption = '1'; // Default placeholder value
</script>

<template>
  <div class="container">
    <Dropdown 
      :options="dropdownOptions" 
      @optionSelected="handleDropdownOptionSelected" 
      hasLabel
      label="Number of users"
      :placeholder="'1'"
      class="dropdown-width"
    />

    <BillType class="margin-bottom-16" />

    <label class="payment-method-label">Payment methods</label>

    <div class="payment-methods">
      <PaymentMethodSelector 
        v-for="(method, index) in paymentMethodOptions" 
        :key="index" 
        :imageUrl="method.imageUrl" 
        :altText="method.altText"
        @click="handlePaymentMethodSelected"
        class="margin-bottom-16"
      />
    </div>

    <LargeButton
      hasLabel
      label="Next"
      :hasIcon="true"
      :hasLargeButton="true"
    />
  </div>
</template>

<style scoped>
.container {
  margin-bottom: 16px;
}

.margin-bottom-16 {
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

.dropdown-width {
  width: 100%;
}
</style>
