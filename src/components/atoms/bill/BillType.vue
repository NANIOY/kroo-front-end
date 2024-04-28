<script setup>
import { ref } from 'vue';
import { defineProps } from 'vue';
import RadioButton from '../selectors/RadioButton.vue';

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
    onBillingTypeChange: {
        type: Function,
        required: true,
    }
});

const handleBillingTypeChange = (newType) => {
    selectedBillingType.value = newType;
    onBillingTypeChange(newType);
};

</script>

<template>
    <div>
        <div class="radio-group">
            <radiobutton v-for="type in Object.values(BillingType)" :key="type"
                :label="type === BillingType.MONTHLY ? 'Monthly' : 'Yearly'"
                :checked="selectedBillingType.value === type" @change="handleBillingTypeChange(type)" />
        </div>
        <p v-if="billingType === BillingType.MONTHLY">Monthly Price: ${{ priceForMonthlyBilling }}</p>
        <p v-else>Yearly Price: €{{ priceForYearlyBilling }}</p>
    </div>
</template>

<style scoped></style>