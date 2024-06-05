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

const formatDate = (dateString) => {
    if (!dateString) return '';
    const dateObj = new Date(dateString);
    const year = dateObj.getFullYear();
    let month = (1 + dateObj.getMonth()).toString().padStart(2, '0');
    let day = dateObj.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const formattedDate = ref(formatDate(props.modelValue));

const handleInput = (event) => {
    const selectedDateString = event.target.value;
    formattedDate.value = selectedDateString;
    emit('update:modelValue', selectedDateString);
};

watch(() => props.modelValue, (newValue) => {
    selectedDate.value = newValue;
    formattedDate.value = formatDate(newValue); // Update formattedDate when modelValue changes
});
</script>

<template>
    <div class="datepicker">
        <label v-if="hasLabel" class="datepicker__label">{{ label }}</label>
        <input class="datepicker__input radius-xs text-reg-l" type="date" :value="formattedDate" @input="handleInput"
            :class="{ 'filled': formattedDate }" placeholder=" " />
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