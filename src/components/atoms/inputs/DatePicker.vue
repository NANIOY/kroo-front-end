<script setup>
import { ref, defineProps, defineEmits } from 'vue';

const props = defineProps({
    modelValue: String,
});

const emit = defineEmits(['update:modelValue']);

const selectedDate = ref(props.modelValue || new Date().toISOString().split('T')[0]); // Default to today's date in YYYY-MM-DD format

const selectDate = (event) => {
    selectedDate.value = event.target.value;
    emit('update:modelValue', selectedDate.value);
};

</script>
<template>
    <div class="datepicker">
        <input type="date" v-model="selectedDate" @change="selectDate" />
    </div>
</template>
<style scoped>
.datepicker {
    display: flex;
    align-items: center;
    position: relative;
}

.datepicker input {
    box-sizing: border-box;
    padding-top: 2px;
    font-size: 20px;
    height: 48px;
    width: 100%;
    border: 2px solid var(--black);
    background-color: transparent;
    border-radius: 4px;
    transition: border-color 0.3s ease;
}

.datepicker input:focus {
    border-color: var(--blurple-50);
    outline: none;
}

.datepicker input::placeholder {
    color: var(--neutral-30);
}
</style>