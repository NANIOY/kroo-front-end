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
    <div class="tab text-reg-l" :class="{ 'active': isActive }" @click="makeActive">
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
    display: inline-block;
    color: var(--black);
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

.active {
    color: var(--blurple);
    font-weight: bold;
}
</style>