<script setup>
import { defineProps, computed } from 'vue';

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
    },
    icon: {
        type: String,
        default: ''
    }
});

const typeClasses = {
    good: 'alert-good',
    bad: 'alert-bad',
    warning: 'alert-warning',
    info: 'alert-info'
};

const typeIcons = {
    good: '✔️',
    bad: '❌',
    warning: '⚠️',
    info: 'ℹ️'
};

// Compute the icon to use, prioritizing the custom icon if provided
const iconToUse = computed(() => props.icon || typeIcons[props.type]);

// Compute the height of the alert based on whether it has text or not
const alertHeight = computed(() => props.text ? '115px' : '48px');
</script>

<template>
    <div :class="['alert', typeClasses[props.type]]" :style="{ height: alertHeight }">
        <div :class="['color-bar', typeClasses[props.type]]"></div>
        <span class="icon">{{ iconToUse }}</span>
        <div class="content">
            <div class="header">
                <strong v-if="props.label">{{ props.label }}</strong>
                <span class="close">&times;</span>
            </div>
            <p v-if="props.text" class="text-content">{{ props.text }}</p>
        </div>
    </div>
</template>

<style scoped>
.alert {
    padding: 1em;
    margin: 1em 0;
    border-radius: 4px;
    display: flex;
    align-items: center;
    background-color: var(--neutral-80);
    width: 608px;
    position: relative;
    box-sizing: border-box; 
}

.color-bar {
    width: 20px;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
}

.icon {
    margin-right: 1em;
    margin-left: 30px;
    font-size: 1.5em;
}

.content {
    flex-grow: 1;
    padding-left: 1em; 
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.close {
    cursor: pointer;
    font-size: 1.2em;
    margin-left: 1em;
    color: var(--neutral-40);
}

.alert-good .color-bar {
    background-color: var(--positive);
}

.alert-bad .color-bar {
    background-color: var(--warning);
}

.alert-warning .color-bar {
    background-color: var(--notice);
}

.alert-info .color-bar {
    background-color: var(--info);
}

.alert-good {
    color: var(--positive);
}

.alert-bad {
    color: var(--warning);
}

.alert-warning {
    color: var(--notice);
}

.alert-info {
    color: var(--info);
}

.header strong {
    color: var(--white);
}

.text-content {
    color: var(--neutral-40);
}
</style>