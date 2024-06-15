<script setup>
import { defineEmits } from 'vue';

const emits = defineEmits(['overlayClick']);

const handleClick = (event) => {
    if (event.target === event.currentTarget) {
        emits('overlayClick');
    }
};
</script>

<template>
    <div class="overlay" @click="handleClick">
        <slot></slot>
    </div>
</template>

<style scoped>
.overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: linear-gradient(45deg, rgba(14, 15, 15, 0.1) 30%, rgba(14, 15, 15, 0.01) 100%);
    backdrop-filter: blur(8px);
    z-index: 100000;
}
</style>