<script setup>
import Tab from '../../atoms/profile/Tab.vue'
</script>

<template>
    <div class="tabs">
        <Tab label="About" />
        <Tab label="Portfolio" />
        <Tab label="Activity" />
    </div>
</template>

<style scoped>
.tabs {
    display: flex;
    gap: 48px;
}
</style>