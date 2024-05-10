<script setup>
import { defineProps, defineEmits, ref } from 'vue';
import { useRouter } from 'vue-router';
import { ReportColumns, Calendar, Search, Tools, User, Bookmark, Bell, Settings, HelpCircle, Community, HandCard, Accessibility } from '@iconoir/vue';

// component props
const props = defineProps({
    label: String,
    iconName: String,
    isActive: {
        type: Boolean,
        default: false
    },
    hasLabel: {
        type: Boolean,
        default: true
    },
    darkMode: {
        type: Boolean,
        default: false
    }
});

// component methods
const router = useRouter();
const iconComponents = {
    ReportColumns, Calendar, Search, Tools, User, Bookmark, Bell, Settings, HelpCircle, Community, HandCard, Accessibility
};

const emit = defineEmits(['toggleActive']);

// navigate to route based on icon clicked
const navigateToRoute = () => {
    let route = '';
    switch (props.iconName) {
        case 'ReportColumns':
            route = '/dashboard';
            break;
        case 'Calendar':
            route = '/calendar';
            break;
        case 'Search':
            route = '/search';
            break;
        case 'Bookmark':
            route = '/tracker';
            break;
        case 'Tools':
            route = '/tools';
            break;
        case 'User':
            route = '/profile';
            break;
        case 'Bell':
            route = '/notifications';
            break;
        case 'Settings':
            route = '/settings';
            break;
        case 'HelpCircle':
            route = '/help';
            break;
        case 'Community':
            route = '/team';
            break;
        default:
            break;
    }
    router.push(route);
    if (!props.isActive) { // only emit if icon is not active
        emit('toggleActive', props.iconName);
    }
};
</script>

<template>
    <div class="navbarLabel" :class="{ 'navbarLabel--active': props.isActive }" @click="navigateToRoute">
        <div class="navbarLabel__iconWrapper">
            <component :is="iconComponents[iconName]" class="navbarLabel__icon" />
        </div>
        <span v-if="hasLabel" class="navbarLabel__label">{{ props.label }}</span>
        <div class="hoverLabel">{{ props.label }}</div>
    </div>
</template>

<style scoped>
/* BASE STYLES */
.navbarLabel {
    position: relative;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    cursor: pointer;
    user-select: none;
    border-radius: 4px;
    transition: background-color 0.3s, color 0.3s;
}

.navbarLabel__iconWrapper {
    padding: 4px 8px 0 8px;
}

.navbarLabel__label {
    padding-top: 2px;
}

.navbarLabel__icon {
    color: var(--white);
    transition: color 0.3s;
}

/* ACTIVE STYLES */
.navbarLabel--active {
    background-color: var(--blurple);
}

/* DARK MODE */
.navbarLabel--dark .navbarLabel__icon,
.navbarLabel--dark {
    color: var(--white);
}

/* HOVER EFFECT */
.navbarLabel:hover:not(.navbarLabel--active) .navbarLabel__icon {
    color: var(--blurple-20);
}

.navbarLabel--active .navbarLabel__icon {
    color: var(--white);
}

/* HOVER LABEL */
.hoverLabel {
    position: absolute;
    top: 50%;
    left: calc(100% + 6px);
    transform: translateY(-50%);
    background-color: var(--blurple);
    color: var(--white);
    padding: 8px 10px;
    border-radius: 4px;
    font-family: var(--font-button);
    font-size: 12px;
    text-transform: uppercase;
    z-index: 999;
    opacity: 0;
    transition: 0.2s ease-in-out;
    pointer-events: none;

    /* TRIANGLE */
    &:before {
        content: '';
        position: absolute;
        top: 50%;
        right: 100%;
        transform: translateY(-50%);
        border-style: solid;
        border-width: 6px;
        border-color: transparent var(--blurple) transparent transparent;
    }
}

.navbarLabel:hover .hoverLabel {
    opacity: 1;
    pointer-events: none; /* CHANGE TO AUTO IF WE WANT LABEL TO BE CICKABLE/HOVERALBE */
}
</style>