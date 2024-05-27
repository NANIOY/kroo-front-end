<script setup>
import { ref, defineProps, defineEmits } from 'vue';

const props = defineProps({
    modelValue: String,
});

const emit = defineEmits(['update:modelValue']);

const selectedDate = ref(props.modelValue || ''); // Initialize to empty string

const selectDate = (event) => {
    selectedDate.value = event.target.value;
    emit('update:modelValue', selectedDate.value);
};
</script>

<template>
    <div class="datepicker">
        <input class="datepicker__input radius-xs text-reg-l" type="date" v-model="selectedDate" @change="selectDate" />
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
    transition: border-color 0.3s ease;
    padding-left: 12px;
    padding-right: 12px;
}

.datepicker__input:focus {
    border-color: var(--blurple-50);
    outline: none;
}

.placeholder {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 12px;
    color: var(--neutral-30);
    pointer-events: none;
}
</style>