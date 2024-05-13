<script setup>
import BillType from './BillType.vue';
import Dropdown from '../inputs/DropDown.vue';

const dropdownOptions = [
    '2', '3', '4', '5+', '10+'
];

</script>

<template>
    <div class="dropbillcombo">
        <Dropdown :options="dropdownOptions" hasLabel label="Number of users" :placeholder="'1'"
            class="dropbillcombo__dropdown" />

        <BillType class="dropbillcombo__billtype" />

    </div>
</template>

<style scoped>
.dropbillcombo {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.dropbillcombo__billtype {
    display: flex;
    justify-content: space-between
}

.dropbillcombo__dropdown {
    width: 100%;
}
</style>
