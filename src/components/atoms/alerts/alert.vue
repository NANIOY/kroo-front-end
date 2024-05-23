<script setup>
import { defineProps, computed } from 'vue';
import * as iconoirIcons from '@iconoir/vue';

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

// Compute the height of the alert based on whether it has text or not
const alertHeight = computed(() => props.text ? '115px' : '48px');

let iconToUse;

if (props.icon) {
    iconToUse = props.icon;
} else {
    switch (props.type) {
        case 'good':
            iconToUse = iconoirIcons.CheckCircle;
            break;
        case 'bad':
            iconToUse = iconoirIcons.WarningCircle;
            break;
        case 'warning':
            iconToUse = iconoirIcons.WarningCircle;
            break;
        case 'info':
            iconToUse = iconoirIcons.HelpCircle;
            break;
        default:
            iconToUse = iconoirIcons.HelpCircle;
    }
}
</script>

<template>
    <div :class="['alert', typeClasses[props.type]]" :style="{ height: alertHeight }">
        <div :class="['color-bar', typeClasses[props.type]]"></div>
        <div class="icon-label-wrapper">
            <span class="icon">
                <component :is="iconToUse" />
            </span>
            <span v-if="props.label" class="label">{{ props.label }}</span>
            <span class="close" @click="close">&times;</span>
        </div>
        <div class="content">
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
    align-items: flex-start;
    background-color: var(--neutral-80);
    width: 608px;
    position: relative;
    box-sizing: border-box;
    flex-direction: column;
}

.color-bar {
    width: 8px;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
}

.icon-label-wrapper {
    display: flex;
    align-items: center;
    width: 100%;
    margin-bottom: 0.5em;
    margin-left: 16px;
}

.icon {
    margin-right: 0.5em;
    display: flex;
    align-items: center;
    padding-left: 0.2em;
}

.label {
    color: var(--white);
    font-family: var(--font-button);
    display: inline-flex;
    align-items: center; 
    line-height: 1.5;
}

.content {
    padding-left: 0.3em;
    width: 100%;
    margin-left: 16px;
    font-family: var(--font-body);
}

.close {
    cursor: pointer;
    font-size: 1.2em;
    margin-left: auto;
    color: var(--neutral-40);
    align-self: flex-start; 
    margin-right: 16px;
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
    margin-top: 0px;
    margin-bottom: 16px;
}
</style>