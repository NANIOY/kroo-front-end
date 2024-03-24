<script setup>
import { IconoirProvider, MapPin, Learning, CinemaOld, DragHandGesture, Attachment, Calendar, Clock } from '@iconoir/vue';
import { defineProps } from 'vue';

const props = defineProps({
    iconName: String,
    label: String,
    size: {
        type: String,
        default: 'default',
        validator: (value) => ['small', 'default', 'large'].includes(value)
    }
});

const iconComponents = {
    MapPin,
    Learning,
    CinemaOld,
    DragHandGesture,
    Attachment,
    Calendar,
    Clock
};

const iconSize = {
    small: '20px',
    default: '24px',
    large: '28px',
};
</script>

<template>
    <IconoirProvider :icon-props="{
        'color': 'var(--black)',
        'width': iconSize[size],
        'height': iconSize[size],
        'stroke-width': '2'
    }">

        <div :class="['icon-label', size]">
            <component :is="iconComponents[iconName]" class="icon" />
            <span class="label">{{ label }}</span>
        </div>

    </IconoirProvider>
</template>

<style scoped>
.icon-label {
    display: inline-block;
    color: var(--black);
    background-color: red;
}

.icon {
    margin-right: 6px;
    vertical-align: middle;
}

.label {
    display: inline-block;
    vertical-align: middle;
}

.small {
    font-size: 14px;
}

.large {
    font-size: 20px;
}
</style>