<script setup>
import { ref, defineProps, defineEmits } from 'vue';

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
</script>

<template>
    <div class="timepicker">
        <label v-if="props.hasLabel" class="timepicker__label">{{ props.label }}</label>
        <input class="timepicker__input radius-xs text-reg-l" type="time" v-model="selectedTime" @change="selectTime" />
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
    transition: border-color 0.3s ease;
    padding-left: 12px;
    padding-right: 12px;
    color: var(--neutral-30);
}

.timepicker__input:focus {
    border-color: var(--blurple-50);
    outline: none;
}

.timepicker__label {
    display: block;
    margin-bottom: 4px;
    color: var(--black);
}
</style>