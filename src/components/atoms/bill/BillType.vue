<script setup>
import { ref } from 'vue';

const BillingType = {
  MONTHLY: 'monthly',
  YEARLY: 'yearly',
};

// Define the reactive selectedBillingType using ref (already present)
const selectedBillingType = ref(BillingType.MONTHLY); // Set monthly as default

// Introduce a prop 'billingType' to receive the selected type
const props = defineProps({
  billingType: {
    type: String,
    required: true,
  },
});

const handleBillingTypeChange = (newType) => {
  selectedBillingType.value = newType;
};

</script>

<template>
  <div>
    <h2>Billing Type:</h2>
    <div class="radio-group">
      <radiobutton
        v-for="type in Object.values(BillingType)"
        :key="type"
        :label="type === BillingType.MONTHLY ? 'Monthly' : 'Yearly'"
        :checked="selectedBillingType.value === type"
        @change="handleBillingTypeChange(type)"
      />
    </div>
    <p v-if="billingType === BillingType.MONTHLY">Monthly Price: ${{ priceForMonthlyBilling }}</p>
    <p v-else>Yearly Price: €{{ priceForYearlyBilling }}</p>
  </div>
</template>

<style scoped>

</style>