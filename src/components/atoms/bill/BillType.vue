<script setup>
import { ref } from 'vue';
import { defineProps } from 'vue';
import RadioButton from '../selectors/RadioButton.vue';

const BillingType = {
  MONTHLY: 'monthly',
  YEARLY: 'yearly',
};

const selectedBillingType = ref(BillingType.MONTHLY); // Set monthly as default

const props = defineProps({
  billingType: {
    type: String,
    required: true,
  },
  onBillingTypeChange: {
    type: Function,
    required: true,
  },
  priceForMonthlyBilling: {
    type: Number,
    required: true,
  },
  priceForYearlyBilling: {
    type: Number,
    required: true,
  },
});

const handleBillingTypeChange = (newType) => {
  selectedBillingType.value = newType;
  onBillingTypeChange(newType);
};
</script>

<template>
  <div class="billing-type">
    <p>Select Billing Type:</p>
    <div class="radio-group">
      <RadioButton
        v-for="type in Object.values(BillingType)"
        :key="type"
        :label="type === BillingType.MONTHLY ? 'Monthly' : 'Yearly'"
        :checked="selectedBillingType.value === type"
        @change="handleBillingTypeChange(type)"
      />
    </div>
    <p v-if="selectedBillingType.value === BillingType.MONTHLY">
      Monthly Price: €{{ priceForMonthlyBilling }}
    </p>
    <p v-else>Yearly Price: €{{ priceForYearlyBilling }}</p>
  </div>
</template>