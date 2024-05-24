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
    <div class="tag text-bold-s"
        :class="{ 'tag--colored': type === 'colored', 'tag--transparent': type === 'transparent' }">
        <span class="tag__text text-bold-s">
            <slot></slot>
        </span>
    </div>
</template>

<style scoped>
.tag {
    display: inline-flex;
    align-items: center;
    height: 20px;
    padding: 6px 8px;
    line-height: 1;
    border-radius: 2px;
    background-color: var(--neutral-70);
    color: var(--white);
    text-transform: uppercase;
    overflow: hidden;
}

.tag__text {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.tag--colored {
    background-color: var(--green);
    color: var(--black);
}

.tag--transparent {
    background-color: transparent;
    color: var(--neutral-70);
    border: 2px solid var(--neutral-70);
}
</style>