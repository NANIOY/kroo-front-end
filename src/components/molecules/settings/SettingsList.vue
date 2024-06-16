<script setup>
import { ref } from 'vue';
import { Accessibility, User, HandCard, Bell } from '@iconoir/vue';

const items = [
    { label: 'Account', icon: User },
    { label: 'Billing', icon: HandCard },
    { label: 'Notifications', icon: Bell },
    { label: 'Accessibility', icon: Accessibility }
];

const selectedItem = ref(0);
</script>

<template>
    <div class="settings">
        <div class="button_container">
            <button v-for="(item, index) in items" :key="index" @click="selectedItem = index"
                :class="{ 'button--selected': index === selectedItem }" class="button">
                <span class="icon-container">
                    <component :is="item.icon" class="icon" />
                </span>
                <span class="label">{{ item.label }}</span>
            </button>
        </div>
    </div>
</template>

<style scoped>
.settings {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    height: 192px;
    width: 184px;
}

.button_container {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
}

.button {
    border: none;
    padding: 10px;
    text-align: left;
    width: 100%;
    cursor: pointer;
    background-color: transparent;
    transition: background-color 0.3s ease, color 0.3s ease;
    display: flex;
    align-items: center;
}

.icon-container {
    display: flex;
    width: 24px;
    height: 24px;
    margin-right: 8px;
}

.icon {
    width: 100%;
    height: 100%;
    color: var(--black);
}

.label {
    flex: 1;
}

.button--selected {
    background-color: var(--blurple);
    color: var(--white);
}
</style>