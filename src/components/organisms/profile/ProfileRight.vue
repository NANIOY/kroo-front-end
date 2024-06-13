<script setup>
import { defineProps, ref, watch } from 'vue';
import Tabs from '../../molecules/profile/Tabs.vue';
import Portfolio from '../../molecules/profile/Portfolio.vue';
import About from '../../molecules/profile/About.vue';
import Activity from '../../molecules/profile/Activity.vue';
import NormalButton from '../../atoms/buttons/NormalButton.vue';

const props = defineProps({
    user: {
        type: Object,
        required: true
    },
    currentUser: {
        type: Object,
        required: true
    },
    isCurrentUserProfile: {
        type: Boolean,
        required: true
    }
});

const activeTab = ref('About');

const handleTabChange = (newTab) => {
    activeTab.value = newTab;
    console.log(`Active tab changed to: ${newTab}`);
};

watch(activeTab, (newTab) => {
    console.log(`Tab changed to: ${newTab}`);
});
</script>

<template>
    <div class="profileright">
        <div class="profileright__top">
            <Tabs :currentUser="props.currentUser" :isCurrentUserProfile="props.isCurrentUserProfile"
                @update:activeTab="handleTabChange" />
            <NormalButton class="button--primary" :hasLabel="true" label="Edit profile" iconName="EditPencil"
                :hasRequest="false"></NormalButton>
        </div>
        <div class="profileright__content">
            <div class="profileright__content__inner">
                <Portfolio v-if="activeTab === 'Portfolio'" :user="props.user" />
                <About v-if="activeTab === 'About'" :user="props.user" />
                <Activity v-if="activeTab === 'Activity'" :user="props.user" />
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

.profileright__top {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.profileright__top .button--primary {
    width: 16%;
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