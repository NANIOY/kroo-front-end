<script setup>
import IconLabel from '../../atoms/items/IconLabel.vue';
import { defineProps } from 'vue';

const props = defineProps({
    title: String,
    iconName: String,
    label: String,
    type: {
        type: String,
        default: 'default',
        validator: (value) => ['default', 'personal'].includes(value)
    }
});
</script>

<template>
    <div :class="['scheduleCard', { 'scheduleCard--personal': type === 'personal' }]">
        <div :class="['scheduleCard__leftBar', { 'scheduleCard__leftBar--personal': type === 'personal' }]"></div>
        <div class="scheduleCard__content">
            <div class="scheduleCard__title text-bold-l">{{ title }}</div>
            <IconLabel :iconName="'Clock'" :label="label" size="small" />
        </div>
    </div>
</template>

<style scoped>
.scheduleCard {
    display: flex;
    width: 496px;
    height: 80px;
    outline: 2px solid var(--black);
    overflow: hidden;
    outline-offset: -2px;
    border-radius: 4px;
}

.scheduleCard--personal {
    outline-color: var(--blurple);
}

.scheduleCard__leftBar {
    width: 24px;
    height: 100%;
    background-color: var(--black);
}

.scheduleCard__leftBar--personal {
    background-color: var(--blurple);
}

.scheduleCard__content {
    flex: 1;
    padding: 16px;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.scheduleCard__title {
    margin-bottom: 4px;
}
</style>