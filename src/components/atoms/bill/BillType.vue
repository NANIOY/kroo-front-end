<script setup>
import { ref } from 'vue';
import Radiobutton from '../selectors/RadioButton.vue';

const selectedBillingType = ref('');

const billingOptions = ref([
    {
        type: 'monthly',
        title: 'Bill Monthly',
        price: 19.99,
        interval: 'month',
        modifier: 'monthly'
    },
    {
        type: 'yearly',
        title: 'Bill Yearly',
        price: 199.99,
        interval: 'year',
        modifier: 'yearly'
    }
]);

const handleBillingTypeChange = (newType) => {
    selectedBillingType.value = selectedBillingType.value === newType ? '' : newType;
};

const isRadioButtonChecked = (type) => {
    return selectedBillingType.value === type;
};

const optionBlockClass = (modifier) => {
    return 'option option--' + modifier;
};

const isSelected = (type) => {
    return selectedBillingType.value === type;
};
</script>

<template>
    <div class="billing-type">
        <div v-for="(option, index) in billingOptions" :key="index"
            :class="[optionBlockClass(option.modifier), { 'active': isSelected(option.type) }]"
            @click="handleBillingTypeChange(option.type)">
            <div class="billing-option">
                <span class="billing-option__title">{{ option.title }}</span>
                <Radiobutton :isChecked="isRadioButtonChecked(option.type)" />
            </div>
            <span class="billing-option__price">€{{ option.price }}/ {{ option.interval }}</span>
        </div>
    </div>
</template>

<style scoped>
.billing-type {
    display: flex;
    align-items: center;
    gap: 24px;
}

.option {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 16px;
    box-sizing: border-box;
    border-radius: 4px;
    width: 260px;
    box-sizing: border-box;
    cursor: pointer;
    user-select: none;
    background-color: var(--gray);
}

.billing-option {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
}

.billing-option__title {
    margin-right: auto;
}

.billing-option__price {
    margin-top: 8px;
}

.active {
    outline: 2px solid var(--blurple);
}
</style>