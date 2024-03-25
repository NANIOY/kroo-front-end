<script setup>
import { defineProps, defineEmits } from 'vue';
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
        <span v-if="hasLabel" class="navbarLabel__label button-normal">{{ props.label }}</span>
    </div>
</template>

<style scoped>
/* BASE STYLES */
.navbarLabel {
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
</style>