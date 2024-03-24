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
    <div>
        <label :class="{ 'container': true, 'disabled': isDisabled }">
            <input type="checkbox" :disabled="isDisabled">
            <Check class="checkmark" />
            <span v-if="hasLabel" class="checkbox-label">{{ label }}</span>
        </label>
    </div>
</template>

<style scoped>
/* Container: the whole div that the checkbox and label are in */   
.container {
    display: flex;
    align-items: center;
    position: relative;
    padding-left: 31px;
    margin-right: 8px;
    margin-bottom: 12px;
    cursor: pointer;
    font-size: 16px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

/* Input styles: Hide the default webbrowser checkbox input */
.container input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
}

/* Styling for the checkmark - non active state  */
.checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 20px;
    width: 20px;
    border: 2px solid var(--black);
    border-radius: 3px;
    color: transparent;
    transition: background-color 0.3s;
    stroke-width: 2;
    vertical-align: middle;
}

/* Styling for the checkbox label */
.checkbox-label {
    display: inline-block;
    vertical-align: middle;
    margin-top: 3px;
}

/* Styling for the checkmark when hovered */
.container:hover .checkmark {
    border-color: var(--blurple-20);
}

/* Styling for the label when .checkbox-label is hovered */
.container:hover .checkbox-label {
    color: var(--blurple-20);
}

/* Styling for when the checkbox is checked */
.container input:checked~.checkmark {
    background-color: var(--blurple);
    border-color: transparent;
    color: var(--white);
}

/* Styling for checkmark when not active */
.checkmark:after {
    content: "";
    position: absolute;
    display: none;
}

/* Show the checkmark when active */
.container input:checked~.checkmark:after {
    display: block;
}

/* Style the checkmark box  when active / when you see the icon */
.container .checkmark:after {
    left: 9px;
    top: 5px;
    width: 5px;
    height: 10px;
    border: solid var(--white);
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
}

/* Style for the disabled state */
.disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

/* Style the custom checkbox for the disabled state */
.disabled .checkmark {
    background-color: var(--white);
    border-color: var(--black);
}

/* Prevent hover effect on disabled checkbox */
.disabled:hover .checkmark {
    border-color: var(--black);
}

/* Style the checkmark/indicator for the disabled state */
.disabled input[type="checkbox"]+.checkmark:after {
    border-color: var(--white);
}
</style>
