<script setup>
import { ref } from 'vue';
import { defineProps, defineExpose } from 'vue';
import Radiobutton from '../selectors/RadioButton.vue';

const selectedBillingType = ref('monthly'); 

const props = defineProps({
    billingOptionText: {
        type: String,
        default: 'Billing Type',
    },
    onBillingTypeChange: {
        type: Function,
        required: true,
    },
});

const billingOptions = ref([
    {
        type: 'monthly',
        title: 'Bill Monthly',
        price: 10, 
        interval: 'month',
        class: 'monthly'
    },
    {
        type: 'yearly',
        title: 'Bill Yearly',
        price: 100, 
        interval: 'year',
        class: 'yearly'
    }
]);

const handleBillingTypeChange = (newType) => {
    selectedBillingType.value = newType;
    onBillingTypeChange(newType);
};

defineExpose({ handleBillingTypeChange, billingOptions, selectedBillingType });
</script>

<template>
    <div class="billing-type">
        <div v-for="(option, index) in billingOptions" :key="index" :class="['option', option.class]">
            <div class="billing-option">
                <span class="title">{{ option.title }}</span>
                <Radiobutton :isChecked="selectedBillingType === option.type"
                    @change="handleBillingTypeChange(option.type)" />
            </div>
            <span class="price">€{{ option.price }}/ {{ option.interval }}</span>
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
    box-sizing: border-box;
}

.monthly,
.yearly {
    background-color: #EBEBEB;
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
