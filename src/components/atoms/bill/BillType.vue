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
        class: 'monthly'
    },
    {
        type: 'yearly',
        title: 'Bill Yearly',
        price: 199.99,
        interval: 'year',
        class: 'yearly'
    }
]);

const handleBillingTypeChange = (newType) => {
    if (selectedBillingType.value === newType) {
        selectedBillingType.value = ''; // Deselect if clicked again
    } else {
        selectedBillingType.value = newType;
    }
};

const isRadioButtonChecked = (type) => {
    return selectedBillingType.value === type;
};
</script>

<template>
    <div class="billing-type">
        <div v-for="(option, index) in billingOptions" :key="index"
            :class="['option', option.class, { 'active': selectedBillingType === option.type }]"
            @click="handleBillingTypeChange(option.type)">
            <div class="billing-option">
                <span class="title">{{ option.title }}</span>
                <Radiobutton :isChecked="isRadioButtonChecked(option.type)" />
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
    cursor: pointer;
    user-select: none;
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

.active {
    border: 1px solid var(--blurple);
}
</style>