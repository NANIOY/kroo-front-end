<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    label: String,
    isActive: Boolean
});

const emits = defineEmits(['tabSelected']);

const makeActive = () => {
    emits('tabSelected', props.label);
};
</script>

<template>
    <div class="tab text-bold-l" :class="{ 'active': isActive }" @click="makeActive">
        {{ label }}
        <div v-if="isActive" class="indicator"></div>
    </div>
</template>

<style scoped>
.tab {
    cursor: pointer;
    position: relative;
    text-align: center;
    height: 40px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: var(--neutral-50);
    user-select: none;
}

.indicator {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    height: 3px;
    width: 40px;
    border-radius: 999px;
    background-color: currentColor;
}

.tab::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    height: 3px;
    width: 40px;
    border-radius: 999px;
    background-color: transparent;
    transition: 0.3s;
}

.active {
    color: var(--blurple);
    opacity: 1;
}

.active::after {
    background-color: currentColor;
}
</style>
