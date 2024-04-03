<script setup>
import { Check } from '@iconoir/vue';
import { defineProps } from 'vue';

const props = defineProps({
    hasLabel: {
        type: Boolean,
        default: true
    },
    label: {
        type: String,
        default: ''
    },
    isDisabled: {
        type: Boolean,
        default: false
    },
});
</script>

<template>
    <label :class="{ 'container': true, 'disabled': isDisabled }">
        <input type="checkbox" :disabled="isDisabled">
        <Check class="checkmark" />
        <span v-if="hasLabel" class="checkbox-label">{{ label }}</span>
    </label>
</template>

<style scoped>
/* Container: the whole div that the checkbox and label are in */
.container {
    display: flex;
    align-items: center;
    cursor: pointer;
    font-size: 16px;
    user-select: none;
}

/* Input styles: Hide the default web browser checkbox input */
.container input {
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
}

/* Styling for the checkmark - non active state */
.checkmark {
    height: 20px;
    width: 20px;
    border: 2px solid var(--black);
    border-radius: 3px;
    color: transparent;
    transition: background-color 0.3s;
    stroke-width: 2;
    vertical-align: middle;
}

.checkbox-label {
    margin: 2px 0 0 8px;
}

.container:hover .checkmark {
    border-color: var(--blurple-20);
}

.container:hover .checkbox-label {
    color: var(--blurple-20);
}

.container input:checked~.checkmark {
    background-color: var(--blurple);
    border-color: transparent;
    color: var(--white);
}

.container input:checked~.checkmark:after {
    content: "";
    position: absolute;
    display: block;
}

.disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.disabled .checkmark {
    background-color: var(--white);
    border-color: var(--black);
}

.disabled input[type="checkbox"]~.checkmark:after {
    border-color: var(--white);
}
</style>