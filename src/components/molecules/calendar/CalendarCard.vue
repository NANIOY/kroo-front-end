<script setup>
import { defineProps, computed } from 'vue';

const props = defineProps({
    emoji: String,
    label: String,
    startTime: String,
    endTime: String,
    type: {
        type: String,
        default: 'personal'
    }
});

const cardHeight = computed(() => {
    const startHour = parseInt(props.startTime.split(':')[0]);
    const endHour = parseInt(props.endTime.split(':')[0]);
    return (endHour - startHour) * 88;
});

const cardColor = computed(() => {
    switch (props.type) {
        case 'interview':
            return 'var(--blurple-60)';
        case 'job':
            return 'var(--blurple-10)';
        case 'personal':
            return 'var(--green-20)';
        case 'applied':
            return 'var(--neutral-20)';
        default:
            return 'var(--blurple-60)';
    }
});
</script>

<template>
    <div class="calendarCard" :style="{ height: cardHeight + 'px', backgroundColor: cardColor }">
        <div class="calendarCard__header">
            <span class="calendarCard__header__emoji text-reg-l">{{ props.emoji }}</span>
            <span class="calendarCard__header__label text-bold-normal text-primary">{{ props.label }}</span>
        </div>
        <div class="calendarCard__time text-reg-s text-secondary">
            <span>{{ props.startTime }}</span>
            <span>-</span>
            <span>{{ props.endTime }}</span>
        </div>
    </div>
</template>

<style scoped>
.calendarCard {
    width: 184px;
    display: flex;
    flex-direction: column;
    border-radius: 2px;
    padding: 8px;
    box-sizing: border-box;
    position: relative;
}

.calendarCard__header {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
}

.calendarCard__header__emoji {
    margin-right: 8px;
}

.calendarCard__time {
    display: flex;
    gap: 4px;
}
</style>