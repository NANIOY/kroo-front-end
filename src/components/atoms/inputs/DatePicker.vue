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
    <li class="container__datepicker">
        <input type="date" v-model="selectedDate" @change="selectDate" @click.stop />
    </li>
</template>

<style scoped>
/* Styles go here */
</style>