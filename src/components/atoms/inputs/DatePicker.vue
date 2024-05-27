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
  /* Add your styles for the datepicker here */
}
</style>
