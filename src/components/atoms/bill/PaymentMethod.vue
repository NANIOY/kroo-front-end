<script setup>
import { ref } from 'vue';

const props = defineProps({
    method: Object
});

const isSelected = ref(false);

const toggleSelection = () => {
    isSelected.value = !isSelected.value;
};
</script>

<template>
    <div class="payment-method" :class="{ 'selected': isSelected }" @click="toggleSelection">
        <div class="payment-image">
            <img v-if="method.imageUrl" :src="method.imageUrl" :alt="method.name" />
            <div v-else class="no-image">No Image</div>
        </div>
    </div>
</template>

<style scoped>
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
