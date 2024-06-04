<script setup>
import { ref, defineProps, defineEmits, watch } from 'vue';

const props = defineProps({
    modelValue: String,
    hasLabel: {
        type: Boolean,
        default: false
    },
    label: {
        type: String,
        default: 'Select a time'
    }
});

const emit = defineEmits(['update:modelValue']);

const selectedTime = ref(props.modelValue || '');

const selectTime = (event) => {
    selectedTime.value = event.target.value;
    emit('update:modelValue', selectedTime.value);
};

watch(() => props.modelValue, (newValue) => {
    selectedTime.value = newValue;
});
</script>

<template>
    <div class="timepicker">
        <label v-if="hasLabel" class="timepicker__label">{{ label }}</label>
        <input class="timepicker__input radius-xs text-reg-l" type="time" v-model="selectedTime" @change="selectTime"
            :class="{ 'filled': selectedTime }" placeholder=" " />
    </div>
</template>

<style scoped>
.timepicker {
    position: relative;
}

.timepicker__input {
    box-sizing: border-box;
    padding-top: 2px;
    height: 48px;
    width: 100%;
    border: 2px solid var(--black);
    background-color: transparent;
    transition: 0.3s;
    padding-left: 12px;
    padding-right: 12px;
    color: var(--neutral-30);
}

.timepicker__input::placeholder {
    color: var(--neutral-30);
}

.timepicker__input:focus {
    border-color: var(--blurple-50);
    outline: none;
}

.timepicker__input.filled {
    color: var(--black);
}

.timepicker__label {
    display: block;
    margin-bottom: 4px;
    color: var(--black);
}
</style>
