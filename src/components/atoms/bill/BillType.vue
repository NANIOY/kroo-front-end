<script setup>
import { ref } from 'vue';
import { defineProps, defineExpose } from 'vue';
import Radiobutton from '../selectors/RadioButton.vue';

const BillingType = {
    MONTHLY: 'monthly',
    YEARLY: 'yearly',
};

const selectedBillingType = ref(BillingType.MONTHLY);

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
        <div class="option monthly">
            <div class="billing-option">
                <span class="title">Bill Monthly</span>
                <Radiobutton :isChecked="selectedBillingType === BillingType.MONTHLY"
                    @change="handleBillingTypeChange(BillingType.MONTHLY)" />
            </div>
            <span class="price">€{{ priceForMonthlyBilling }}/month</span>
        </div>
        <div class="gap"></div>
        <div class="option yearly">
            <div class="billing-option">
                <span class="title">Bill Yearly</span>
                <Radiobutton :isChecked="selectedBillingType === BillingType.YEARLY"
                    @change="handleBillingTypeChange(BillingType.YEARLY)" />
            </div>
            <span class="price">€{{ priceForYearlyBilling }}/year</span>
        </div>
    </div>
</template>

<style scoped>
.billing-type {
    display: flex;
    align-items: center;
}

.option {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 16px;
    border-radius: 5px;
    margin-right: 20px;
    width: 260px;
    height: 73px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}

.monthly {
    --background-color: var(--white);
}

.yearly {
    --background-color: var(--white);
}

.billing-option {
    display: flex;
    align-items: center;
    justify-content: space-between; 
    width: 100%; 
}

.title {
    margin-right: auto; 
}

.gap {
    width: 40px;
}

.price {
    margin-top: 8px;
}
</style>
