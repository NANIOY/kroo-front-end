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
    <div class="sliderContainer">
        <input type="range" min="0" max="100" v-model="sliderValue" class="sliderContainer__slider" />
        <div class="sliderContainer__value">
            <input type="number" min="0" max="100" v-model.number="sliderValue"
                class="sliderContainer__value__input text-reg-normal" @input="updateSliderValue($event)" />
        </div>
    </div>
</template>

<style scoped>
/* GENERAL */
.sliderContainer {
    position: relative;
    display: flex;
    align-items: center;
}

/* SLIDER */
.sliderContainer__slider {
    width: 100%;
    margin-right: 8px;
    background-color: var(--neutral-30);
    outline: none;
    appearance: none;
    height: 4px;
    border-radius: 999px;
}

.sliderContainer__slider::-webkit-slider-thumb {
    appearance: none;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: var(--black);
    cursor: pointer;
}

/* VALUE */
.sliderContainer__value__input {
    border: none;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    background-color: var(--white);
}

.sliderContainer__value__input:focus {
    outline: none;
}

.sliderContainer__value {
    outline: 2px solid var(--black);
    outline-offset: -2px;
    border-radius: 4px;
    width: 56px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
}

/* Remove arrow controls for number input */
.sliderContainer__value__input::-webkit-outer-spin-button,
.sliderContainer__value__input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
</style>
