<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    imageUrl: String,
    altText: String
});
</script>

<template>
    <div class="payment-method">
        <div class="payment-image">
            <img :src="props.imageUrl" :alt="props.altText" />
        </div>
    </div>
</template>

<style scoped>
.payment-method {
    cursor: pointer;
    flex-basis: calc(33.33% - 10px);
    margin-bottom: 10px;
}

.payment-image img {
    width: 100px;
    height: auto;
}
</style>