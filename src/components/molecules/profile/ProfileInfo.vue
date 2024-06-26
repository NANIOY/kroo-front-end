<script setup>
import { defineProps, ref, watchEffect, watch } from 'vue';
import { useRoute } from 'vue-router';
import ProfileImg from '../../atoms/profile/ProfileImg.vue';
import Tag from '../../atoms/items/Tag.vue';
import LargeButton from '../../atoms/buttons/LargeButton.vue';
import CalendarProfile from '../../molecules/calendar/CalendarProfile.vue';
import OfferJob from '../../molecules/popups/OfferJob.vue';
import setupAxios from '../../../setupAxios';

const props = defineProps({
    user: {
        type: Object,
        required: true
    }
});

const route = useRoute();
const name = ref('');
const functions = ref([]);
const description = ref('');
const isModalVisible = ref(false);
const businessId = ref('');
const axiosInstance = setupAxios();
const isCurrentUserProfile = ref(route.path === '/profile');

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

const openModal = async () => {
    await fetchBusinessId();
    isModalVisible.value = true;
};

watchEffect(() => {
    if (props.user) {
        name.value = props.user.username;
        functions.value = props.user.crewData?.basicInfo.functions || [];
        description.value = props.user.crewData?.profileDetails.tagline || '';
    }
});

watch(route, (newRoute) => {
    isCurrentUserProfile.value = newRoute.path === '/profile';
}, { immediate: true });
</script>

<template>
    <div class="profileinfo" v-if="user">
        <div class="profileinfo__container">
            <div class="profileinfo__container__info">
                <ProfileImg :profileImage="user.crewData?.basicInfo.profileImage" :showBadge="true" />

                <div class="profileinfo__container__info__text">
                    <h4>{{ name }}</h4>

                    <div class="profileinfo__container__info__text__functions">
                        <Tag class="profileinfo__container__info__text__functions__function"
                            v-for="(func, index) in functions" :key="index" type="colored">{{ func }}</Tag>
                    </div>

                    <div>
                        <p class="text-reg-normal">{{ description }}</p>
                    </div>
                </div>
            </div>
            <LargeButton v-if="!isCurrentUserProfile" label="Send a job offer" class="button--primary" :hasRequest="false"
                @click="openModal" />
            <CalendarProfile class="profileinfo__calendar"></CalendarProfile>
        </div>
    </div>
    <div v-else>Loading...</div>

    <OfferJob v-if="isModalVisible" :isVisible="isModalVisible" :email="user.email" :businessId="businessId"
        @close="isModalVisible = false" />
</template>

<style scoped>
p {
    margin: 0;
}

/* COMBINED */
.profileinfo,
.profileinfo__container,
.profileinfo__container__info,
.profileinfo__container__info__text,
.profileinfo__container__info__text__skilldesc {
    display: flex;
    align-items: center;
    width: 100%;
}


.profileinfo__container,
.profileinfo__container__info,
.profileinfo__container__info__text,
.profileinfo__container__info__text__skilldesc {
    flex-direction: column;
}

.profileinfo__container,
.profileinfo__container__info,
.profileinfo__container__info__text,
.profileinfo__container__info__text__skilldesc {
    gap: 24px;
}


.profileinfo__container__info__text__skilldesc p {
    text-align: center;
}

/* GENERAL */
.profileinfo {
    color: var(--white);
}

.profileinfo__container {
    margin: 56px 48px 0 48px;
}

/* FUNCTIONS */
.profileinfo__container__info__text__functions {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: center;
}

/* calendar */

.profileinfo__calendar {
    margin-top: 16px;
}
</style>