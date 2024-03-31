<script setup>
import { ref } from 'vue';

const sliderValue = ref(0); // Initial slider value

const updateSliderValue = (event) => {
    const newValue = parseInt(event.target.value);
    if (!isNaN(newValue)) {
        sliderValue.value = Math.min(100, Math.max(0, newValue));
    }
};
</script>

<template>
    <div class="slider-container">
        <input type="range" min="0" max="100" v-model="sliderValue" class="slider" />
        <div class="slider-value-container">
            <input type="number" min="0" max="100" v-model.number="sliderValue" class="slider-value" @input="updateSliderValue($event)" />
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
    border:none;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center; /* Center horizontally */
    align-items: center; /* Center vertically */
    text-align: center;
}

.slider-value:focus {
    outline: none; /* Remove border when focused */
}

.slider-container {
    position: relative;
    display: flex;
    align-items: center; /* Align vertically */
}

.slider-value-container {
    display: inline-block;
    border: 3px solid var(--black);
    padding: 5px;
    border-radius: 4px;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center; /* Center horizontally */
    align-items: center; /* Center vertically */
}

/* Remove arrow controls for number input */
.slider-value::-webkit-outer-spin-button,
.slider-value::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
</style>
