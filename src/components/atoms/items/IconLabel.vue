<script setup>
import { IconoirProvider, MapPin, Learning, CinemaOld, DragHandGesture, Attachment, Calendar, Clock, User, InfoCircle } from '@iconoir/vue';
import { defineProps } from 'vue';

const props = defineProps({
    iconName: {
        type: String,
        required: true
    },
    label: {
        type: String,
        required: true
    },
    size: {
        type: String,
        default: 'default',
        validator: (value) => ['small', 'default', 'large'].includes(value)
    },
    textColor: {
        type: String,
        default: 'var(--black)'
    },
    isLink: {
        type: Boolean,
        default: false
    },
    href: {
        type: String,
        default: '#'
    }
});

const iconComponents = {
    MapPin,
    Learning,
    CinemaOld,
    DragHandGesture,
    Attachment,
    Calendar,
    Clock,
    User,
    InfoCircle
};

const iconSize = {
    small: '20px',
    default: '24px',
    large: '28px',
};
</script>

<template>
    <IconoirProvider :icon-props="{
        'color': textColor,
        'width': iconSize[size],
        'height': iconSize[size],
        'stroke-width': '2'
    }">
        <a v-if="isLink" :href="href" class="icon-label">
            <component :is="iconComponents[iconName]" class="icon" />
            <span :style="{ color: textColor }" class="label text-reg-s">{{ label }}</span>
        </a>
        <div v-else :class="['icon-label', size]">
            <component :is="iconComponents[iconName]" class="icon" />
            <span :style="{ color: textColor }" class="label text-reg-s">{{ label }}</span>
        </div>
    </IconoirProvider>
</template>

<style scoped>
.icon-label {
    display: inline-block;
    color: var(--black);
}

.icon {
    margin-right: 6px;
    vertical-align: middle;
}

.label {
    display: inline-block;
    vertical-align: middle;
    line-height: 100%;
}

.small {
    font-size: 14px;
}

.large {
    font-size: 20px;
}
</style>
