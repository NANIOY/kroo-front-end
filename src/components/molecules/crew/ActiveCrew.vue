<script setup>
import { ref, onMounted, watch, defineEmits } from 'vue';
import setupAxios from '../../../setupAxios';
import Tag from '../../atoms/items/Tag.vue';
import TransparentButton from '../../atoms/buttons/TransparentButton.vue';
import Alert from '../../atoms/alerts/alert.vue';

const props = defineProps({
    members: {
        type: Array,
        default: () => []
    }
});

const emit = defineEmits(['navigateToProfile', 'removeCrewMember']);

const activeCrewMembers = ref([]);
const loading = ref(true);

const axiosInstance = setupAxios();

const alertVisible = ref(false);
const alertMessage = ref('');
const alertType = ref('good');
const alertText = ref('');

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
        const businessId = userResponse.data.data.user.businessData;
        return businessId;
    } catch (error) {
        console.error('Failed to fetch user data:', error);
        return null;
    }
};

const fetchActiveCrewMembers = async () => {
    const businessId = await fetchBusinessId();
    if (!businessId) {
        console.error('Business ID is missing');
        return;
    }

    const token = sessionStorage.getItem('sessionToken') || sessionStorage.getItem('rememberMeToken');

    if (!token) {
        console.error('Authentication token is missing');
        return;
    }

    try {
        console.log(`Fetching active crew members for Business ID: ${businessId}`);
        const response = await axiosInstance.get(`/bussJobInt/${businessId}/activecrew`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const activeCrew = response.data.activeCrewMembers;
        console.log('Fetched Active Crew Members:', activeCrew);

        const crewDetailsPromises = activeCrew.map(async (crew) => {
            const userResponse = await axiosInstance.get(`/user/${crew.userId}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const user = userResponse.data.data.user;
            return {
                ...crew,
                userUrl: user.userUrl
            };
        });

        activeCrewMembers.value = await Promise.all(crewDetailsPromises);
        console.log('Active Crew Members with userUrl:', activeCrewMembers.value);
    } catch (error) {
        console.error('Failed to fetch active crew members:', error);
    } finally {
        loading.value = false;
    }
};

const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
};

const navigateToProfile = (userUrl) => {
    emit('navigateToProfile', userUrl);
};

const removeCrewMember = async (jobId, userId) => {
    const token = sessionStorage.getItem('sessionToken') || sessionStorage.getItem('rememberMeToken');
    if (!token) {
        console.error('Authentication token is missing');
        return;
    }

    try {
        await axiosInstance.delete(`/bussJobInt/${jobId}/activecrew/${userId}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        showAlert('Crewmember removed successfully!', 'good', 'The crew member has been removed from the job.');
        activeCrewMembers.value = activeCrewMembers.value.filter(crew => !(crew.userId === userId && crew.jobId === jobId));
        emit('removeCrewMember', userId);
        jobCounts.value.active--;
    } catch (error) {
        console.error('Failed to remove crew member:', error);
    }
};


watch(
    () => props.members,
    (newMembers) => {
        activeCrewMembers.value = newMembers;
    },
    { immediate: true }
);

const showAlert = (message, type, text) => {
    alertMessage.value = message;
    alertType.value = type;
    alertText.value = text;
    alertVisible.value = true;
};

onMounted(() => {
    fetchActiveCrewMembers();
});
</script>

<template>
    <Alert v-if="alertVisible" :type="alertType" :label="alertMessage" :text="alertText" />

    <div v-if="loading" class="loading">Loading...</div>
    <div v-for="crew in activeCrewMembers" :key="crew.userId" class="activeCrew surface-tertiary radius-xs"
        @click="navigateToProfile(crew.userUrl)">
        <div class="activeCrew__top">
            <img :src="crew.profileImage || 'https://placehold.co/64x64'" class="activeCrew__top__image"
                alt="Crew image" />
            <div>
                <h4 class="activeCrew__top__name">{{ crew.username }}</h4>
                <TransparentButton @click.stop="removeCrewMember(crew.jobId, crew.userId)"
                    class="activeCrew__top__button" :hasIcon="true" iconName="Xmark" />
            </div>
        </div>

        <div id="activeCrew__info">
            <div class="activeCrew__info__left">
                <Tag>{{ crew.jobFunction }}</Tag>
            </div>
            <div id="activeCrew__info__right">
                <p class="text-reg-normal">{{ formatDate(crew.date) }}</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* GENERAL */
p {
    margin: 0;
}

.activeCrew {
    flex-direction: column;
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
    gap: 12px;
    cursor: pointer;
    transition: 0.3s;
}

.activeCrew:hover {
    filter: brightness(92%);
}

.activeCrew,
.activeCrew__info,
.activeCrew__top,
.activeCrew__top div,
.activeCrew__mid,
.activeCrew__bot,
#activeCrew__info {
    display: flex;
}

.activeCrew__top {
    align-items: center;
    gap: 16px;
}

.activeCrew__top__image {
    width: 64px;
    height: 64px;
    border-radius: 4px;
    object-fit: cover;
}

.activeCrew__top div {
    flex: 1;
    justify-content: space-between;
    gap: 8px;

}

.activeCrew__top__button {
    width: fit-content;
    margin-top: -4px;
    color: var(--blurple-50) !important;
}

/* INFO */
#activeCrew__info {
    align-items: flex-start;
    margin-top: 4px;
    justify-content: space-between;
    color: var(--neutral-70);
}

#activeCrew__info__right p {
    text-align: right;
}
</style>