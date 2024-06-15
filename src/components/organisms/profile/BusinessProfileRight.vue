<script setup>
import { defineProps, ref, watch, onMounted, computed } from 'vue';
import Tabs from '../../molecules/profile/BusinessTabs.vue';
import Portfolio from '../../molecules/profile/Portfolio.vue';
import BusinessAbout from '../../molecules/profile/BusinessAbout.vue';
import setupAxios from '../../../setupAxios';

const props = defineProps({
    business: {
        type: Object,
        required: true
    },
    currentUser: {
        type: Object,
        required: true
    }
});

const axiosInstance = setupAxios();
const businessId = ref('');

const fetchBusinessId = async () => {
    const token = sessionStorage.getItem('sessionToken') || sessionStorage.getItem('rememberMeToken');
    const userId = sessionStorage.getItem('userId');

    if (!token || !userId) {
        console.error('Authentication token or user ID is missing');
        return null;
    }

    try {
        const userResponse = await axiosInstance.get(`/user/${userId}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        businessId.value = userResponse.data.data.user.businessData;
    } catch (error) {
        console.error('Failed to fetch user data:', error);
        return null;
    }
};

const activeTab = ref('About');

const handleTabChange = (newTab) => {
    activeTab.value = newTab;
    console.log(`Active tab changed to: ${newTab}`);
};

watch(activeTab, (newTab) => {
    console.log(`Tab changed to: ${newTab}`);
});

const isCurrentUserProfile = computed(() => {
    return props.currentUser.businessData === props.business._id;
})

onMounted(() => {
    fetchBusinessId();
});

</script>

<template>
    <div class="profileright">
        <Tabs :currentUser="props.business" :isCurrentUserProfile="isCurrentUserProfile" @update:activeTab="handleTabChange" />
        <div class="profileright__content">
            <div class="profileright__content__inner">
                <Portfolio v-if="activeTab === 'Portfolio'" :user="props.business" />
                <BusinessAbout v-if="activeTab === 'About'" :business="props.business" />
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