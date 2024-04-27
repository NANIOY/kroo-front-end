<script setup>
import { ref } from 'vue'
import Tabs from '../../molecules/profile/Tabs.vue'
import Portfolio from '../../molecules/profile/Portfolio.vue'
import About from '../../molecules/profile/About.vue'
import Activity from '../../molecules/profile/Activity.vue'

const activeTab = ref('About');

const handleTabChange = (newTab) => {
    activeTab.value = newTab;
};
</script>

<template>
    <div class="profileright">
        <Tabs @update:activeTab="handleTabChange" />
        <div class="profileright__content">
            <div class="profileright__content__inner">
                <Portfolio v-if="activeTab === 'Portfolio'" />
                <About v-if="activeTab === 'About'" />
                <Activity v-if="activeTab === 'Activity'" />
            </div>
        </div>
    </div>
</template>

<style scoped>
.profileright {
    display: flex;
    flex-direction: column;
    gap: 24px;
    width: 1166px;
    margin-top: 48px;
}

.profileright__content {
    height: 88vh;
    overflow: hidden;
    scrollbar-width: none;
}

.profileright__content__inner {
    height: 100%;
    overflow-y: auto;
    padding-right: 17px;
    margin-right: -17px;
}

.profileright__content::-webkit-scrollbar {
    display: none;
}
</style>