<script setup>
import { ref } from 'vue';
import { defineExpose } from 'vue';

const BillingType = {
    MONTHLY: 'monthly',
    YEARLY: 'yearly',
};

const selectedBillingType = ref(BillingType.MONTHLY); // Set monthly as default

const props = defineProps({
    billingOptionText: {
        type: String,
        default: 'Billing Type',
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
            <label class="radio-option">
                <span>Bill Monthly</span>
                <input type="radio" :checked="selectedBillingType === BillingType.MONTHLY" @change="handleBillingTypeChange(BillingType.MONTHLY)">
            </label>
            <label class="radio-option">
                <span>Bill Yearly</span>
                <input type="radio" :checked="selectedBillingType === BillingType.YEARLY" @change="handleBillingTypeChange(BillingType.YEARLY)">
            </label>
        </div>
        <div v-if="selectedBillingType === BillingType.MONTHLY">€{{ priceForMonthlyBilling }}/month</div>
        <div v-else>€{{ priceForYearlyBilling }}/year</div>
    </div>
</template>

<style scoped>
.radio-option {
    display: flex;
    align-items: center;
}

.radio-option input[type="radio"] {
    margin-right: 8px;
}
</style>
