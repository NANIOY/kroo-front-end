<script setup>
import { defineProps } from 'vue';

// Define props
const props = defineProps({
    type: {
        type: String,
        default: 'info',
        validator: value => ['good', 'bad', 'warning', 'info'].includes(value)
    },
    label: {
        type: String,
        default: ''
    },
    text: {
        type: String,
        default: ''
    }
});

const typeClasses = {
    success: 'alert-good',
    error: 'alert-bad',
    warning: 'alert-warning',
    info: 'alert-info'
};

const typeIcons = {
    success: '✔️',
    error: '❌',
    warning: '⚠️',
    info: 'ℹ️'
};
</script>

<template>
    <div :class="['alert', typeClasses[props.type]]">
        <span class="icon">{{ typeIcons[props.type] }}</span>
        <div class="content">
            <strong v-if="props.label">{{ props.label }}</strong>
            <p v-if="props.text">{{ props.text }}</p>
        </div>
    </div>
</template>

<style scoped>

</style>
