<script setup>
import { defineProps, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
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
    }
});

const route = useRoute();
const activeTab = ref('About');

const isCurrentUserProfile = ref(route.path === '/profile');

const handleTabChange = (newTab) => {
    activeTab.value = newTab;
};

watch(route, (newRoute) => {
    isCurrentUserProfile.value = newRoute.path === '/profile';
}, { immediate: true });
</script>

<template>
    <div class="profileright">
        <div class="profileright__top">
            <Tabs :currentUser="currentUser" :isCurrentUserProfile="isCurrentUserProfile"
                @update:activeTab="handleTabChange" />
            <NormalButton v-if="isCurrentUserProfile" class="button--primary" :hasLabel="true" label="Edit profile"
                iconName="EditPencil" :hasRequest="false"></NormalButton>
        </div>
        <div class="profileright__content">
            <div class="profileright__content__inner">
                <Portfolio v-if="activeTab === 'Portfolio'" :user="user" />
                <About v-if="activeTab === 'About'" :user="user" />
                <Activity v-if="activeTab === 'Activity'" :user="user" />
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