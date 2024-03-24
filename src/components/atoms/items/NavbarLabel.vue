<script setup>
import { defineProps, ref, computed } from 'vue';
import { Community, User, HandCard, Accessibility } from '@iconoir/vue';

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
    }
});

const iconComponents = {
    Community, User, HandCard, Accessibility
};

const isActive = ref(props.isActive);

const toggleActive = () => {
    isActive.value = !isActive.value;
};

const hasLabelProp = props.hasLabel === 'true' || props.hasLabel === true;
const navbarLabelClass = computed(() => {
    if (!hasLabelProp) {
        return 'navbarLabel navbarLabel--noLabel' + (isActive.value ? ' navbarLabel--active' : '');
    } else {
        return isActive.value ? 'navbarLabel navbarLabel--active' : 'navbarLabel';
    }
});
</script>

<template>
    <div :class="[navbarLabelClass]" @click="toggleActive">
        <div class="navbarLabel__iconWrapper">
            <component :is="iconComponents[iconName]" class="navbarLabel__icon"
                :style="{ color: isActive ? 'var(--white)' : 'var(--black)' }" />
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
    transition: background-color 0.3s, color 0.3s;
}

.navbarLabel__iconWrapper {
    padding: 0 8px;
}

.navbarLabel__icon {
    transition: color 0.3s;
}

.navbarLabel:hover {
    background-color: var(--neutral-20);
}
</style>