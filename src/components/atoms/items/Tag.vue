<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    type: {
        type: String,
        default: 'default'
    }
});
</script>

<template>
    <div :class="[
        'tag',
        { 'tag--colored': type === 'colored', 'tag--transparent': type === 'transparent' },
        'text-bold-s'
    ]">
        <slot></slot>
    </div>
</template>


<style scoped>
.tag {
    display: inline-block;
    height: 20px;
    padding: 2px 8px;
    line-height: 22px;
    border-radius: 2px;
    background-color: var(--neutral-70);
    color: var(--white);
    text-transform: uppercase;
}

.tag--colored {
    background-color: var(--green);
    color: var(--black);
}

.tag--transparent {
    background-color: transparent;
    color: var(--neutral-70);
    outline: 2px solid var(--neutral-70);
    outline-offset: -2px;
}
</style>