<script setup>
import { ref } from 'vue';
import RadioButton from '../selectors/RadioButton.vue';
import { defineExpose } from 'vue';

const BillingType = {
    MONTHLY: 'monthly',
    YEARLY: 'yearly',
};

const selectedBillingType = ref(BillingType.MONTHLY); // Set monthly as default

const props = defineProps({
    billingOptionText: { // New prop for billing option text
        type: String,
        default: 'Bill Monthly', // Set default value
    },
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

defineExpose({ handleBillingTypeChange });
</script>

<template>
    <div class="billing-type">
        <div>{{ billingOptionText }}</div>
        <div class="radio-group">
            <RadioButton v-for="type in Object.values(BillingType)" :key="type"
                :label="type === BillingType.MONTHLY ? 'Monthly' : 'Yearly'"
                :checked="selectedBillingType.value === type" @change="handleBillingTypeChange(type)" />
        </div>
    </div>
</template>

<style></style>
