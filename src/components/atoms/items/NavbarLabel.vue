<script setup>
import { defineProps, ref, computed } from 'vue';
import { ReportColumns, Calendar, Search, Tools, User, Bookmark, Bell, Settings, HelpCircle, Community, HandCard, Accessibility } from '@iconoir/vue';

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

const iconComponents = {
    ReportColumns, Calendar, Search, Tools, User, Bookmark, Bell, Settings, HelpCircle, Community, HandCard, Accessibility
};

const isActive = ref(props.isActive);

const toggleActive = () => {
    isActive.value = !isActive.value;
};

const hasLabelProp = props.hasLabel === 'true' || props.hasLabel === true;
const navbarLabelClass = computed(() => {
    if (!hasLabelProp) {
        return `navbarLabel navbarLabel--noLabel${props.darkMode ? ' navbarLabel--dark' : ''}${isActive.value ? ' navbarLabel--active' : ''}`;
    } else {
        return `navbarLabel${props.darkMode ? ' navbarLabel--dark' : ''}${isActive.value ? ' navbarLabel--active' : ''}`;
    }
});
</script>

<template>
    <div :class="[navbarLabelClass]" @click="toggleActive">
        <div class="navbarLabel__iconWrapper">
            <component :is="iconComponents[iconName]" class="navbarLabel__icon"
                :style="{ color: isActive.value ? (props.darkMode ? 'var(--white)' : 'var(--black)') : '' }" />
        </div>
        <span v-if="hasLabelProp" class="navbarLabel__label button-normal">{{ props.label }}</span>
    </div>
</template>

<style scoped>
.navbarLabel {
    width: 192px;
    height: 40px;
    display: flex;
    align-items: center;
    cursor: pointer;
    user-select: none;
    border-radius: 4px;
    transition: background-color 0.3s, color 0.3s;
}

.navbarLabel--active {
    background-color: var(--blurple);
    color: var(--white);
}

.navbarLabel--noLabel {
    width: 40px;
    height: 40px;
}

.navbarLabel__iconWrapper {
    padding: 4px 8px 0 8px;
}

.navbarLabel__label {
    padding-top: 2px;
}

.navbarLabel--noLabel .navbarLabel__iconWrapper {
    padding: 7px 8px 0 8px;
}

.navbarLabel--dark .navbarLabel__icon,
.navbarLabel--dark {
    color: var(--white);
}

.navbarLabel__icon {
    transition: color 0.3s;
}

.navbarLabel:not(.navbarLabel--active):hover .navbarLabel__iconWrapper .navbarLabel__icon,
.navbarLabel:hover {
    color: var(--blurple-20);
}

.navbarLabel--active:hover {
    background-color: var(--blurple);
    color: var(--white);
}

</style>