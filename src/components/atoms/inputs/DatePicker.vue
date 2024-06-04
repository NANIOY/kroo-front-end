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
        default: 'Select a date'
    }
});

const emit = defineEmits(['update:modelValue']);

const selectedDate = ref(props.modelValue || '');

const selectDate = (event) => {
    selectedDate.value = event.target.value;
    emit('update:modelValue', selectedDate.value);
};

watch(() => props.modelValue, (newValue) => {
    selectedDate.value = newValue;
});
</script>

<template>
    <div class="datepicker">
        <label v-if="hasLabel" class="datepicker__label">{{ label }}</label>
        <input class="datepicker__input radius-xs text-reg-l" type="date" v-model="selectedDate" @change="selectDate"
            :class="{ 'filled': selectedDate }" placeholder=" " />
    </div>
</template>

<style scoped>
.datepicker {
    position: relative;
}

.datepicker__input {
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

.datepicker__input::placeholder {
    color: var(--neutral-30);
}

.datepicker__input:focus {
    border-color: var(--blurple-50);
    outline: none;
}

.datepicker__input.filled {
    color: var(--black);
}

.datepicker__label {
    display: block;
    margin-bottom: 4px;
    color: var(--black);
}
</style>
