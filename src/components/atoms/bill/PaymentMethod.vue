<script setup>
import { ref } from 'vue';

const props = defineProps({
    methods: Array
});

const isSelected = ref(null);

const toggleSelection = (index) => {
    isSelected.value = index;
};
</script>

<template>
    <div>
        <div class="payment-method-title">Payment method</div>
        <div class="payment-methods">
            <div v-for="(method, index) in methods" :key="index" class="payment-method"
                :class="{ 'selected': isSelected === index }" @click="toggleSelection(index)">
                <div class="payment-image">
                    <img v-if="method.imageUrl" :src="method.imageUrl" :alt="method.name" />
                    <div v-else class="no-image">No Image</div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.payment-method-title {
    font-weight: bold;
    margin-bottom: 10px;
}

.payment-methods {
    display: flex;
    gap: 10px;
}

.payment-method {
    cursor: pointer;
}

.selected {
    border: 2px solid blue;
}

.payment-image {
    background-color: #EBEBEB;
    border-radius: 10px;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.payment-image img {
    width: 100px;
    border-radius: 8px;
}

.no-image {
    font-size: 14px;
    color: #555;
}
</style>