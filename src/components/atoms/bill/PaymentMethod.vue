<script setup>
import { defineProps, ref } from 'vue';

const props = defineProps({
    imageUrl: String,
    altText: String
});

const isSelected = ref(false);

function handleClick() {
    document.querySelectorAll('.payment-method.selected').forEach((element) => {
        element.classList.remove('selected');
    });

    isSelected.value = true;
}
</script>

<template>
    <div class="payment-method" :class="{ 'selected': isSelected }" @click="handleClick">
        <div class="payment-image">
            <img :src="imageUrl" :alt="altText" class="center-image" />
        </div>
    </div>
</template>

<style scoped>
.payment-method {
    cursor: pointer;
    flex-basis: calc(33.33% - 10px);
    height: 48px;
    width: 252px;
    box-sizing: border-box;
    border-radius: 5px;
    background-color: var(--gray);
    border: 2px solid transparent;
}

.payment-image {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.center-image {
    max-width: 100px;
    max-height: 100px;
    width: auto;
    height: auto;
    user-select: none;
}

.selected {
    border-color: var(--blurple);
}
</style>
