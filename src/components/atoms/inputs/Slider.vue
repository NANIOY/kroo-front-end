<script setup>
import { ref } from 'vue';
const sliderValue = ref(0); // Initial slider value
</script>

<template>
    <div class="slider-container">
        <input type="range" min="0" max="100" v-model="sliderValue" class="slider" />
        <div class="slider-value-container">
            <span class="slider-value">{{ sliderValue }}</span>
        </div>
    </div>
</template>

<style scoped>
.slider {
    width: 200px;
    margin-right: 10px;
    background-color: var(--neutral-30);
    outline: none;
    appearance: none;
    height: 5px;
    border-radius: 10px;
}

.slider::-webkit-slider-thumb {
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: var(--black);
    cursor: pointer;
}

.slider-value {
    font-size: 16px;
    border: var(--black);
}

.slider-container {
    position: relative;
}

.slider-value-container {
    display: inline-block;
    border: 3px solid var(--black);
    padding: 5px;
    border-radius: 4px;
}
</style>