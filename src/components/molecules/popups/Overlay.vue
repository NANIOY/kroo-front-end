<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    show: Boolean,
});
</script>

<template>
    <div v-if="show" class="overlay"></div>
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
    z-index: 998;
}
</style>