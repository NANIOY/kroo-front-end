<script setup>
import { ref, onMounted, defineEmits } from 'vue';
import NormalButton from '../../atoms/buttons/NormalButton.vue';
import setupAxios from '../../../setupAxios';
import Tag from '../../atoms/items/Tag.vue';
import Alert from '../../atoms/alerts/alert.vue';

const applicants = ref([]);
const loading = ref(true);
const axiosInstance = setupAxios();

const emit = defineEmits(['accepted', 'rejected', 'fetchActiveCrewMembers', 'navigateToProfile']);

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

const fetchApplicants = async () => {
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
        const response = await axiosInstance.get(`/bussJobInt/${businessId}/applications`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const applications = response.data.applications;

        const applicantPromises = applications.map(async (application) => {
            const userResponse = await axiosInstance.get(`/user/${application.userId}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            return {
                ...application,
                user: userResponse.data.data.user
            };
        });

        applicants.value = await Promise.all(applicantPromises);
    } catch (error) {
        console.error('Failed to fetch applications:', error);
    } finally {
        loading.value = false;
    }
};

const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
};

const rejectApplicant = async (applicationId, index) => {
    try {
        const response = await axiosInstance.post(`/bussJobInt/applications/${applicationId}/reject`, { status: 'rejected' });
        if (response.status === 200) {
            applicants.value.splice(index, 1);
            emit('rejected');
            showAlert('Crewmember rejected successfully!', 'good', 'The crew member has been notified.');
        }
    } catch (error) {
        console.error('Failed to reject applicant:', error);
    }
};

const acceptApplicant = async (application, index) => {
    try {
        const response = await axiosInstance.post(`/bussJobInt/applications/${application.applicationId}/accept`, { status: 'accepted' });
        if (response.status === 200) {
            emit('accepted', {
                userId: application.user._id,
                username: application.user.username,
                jobTitle: application.jobTitle,
                jobFunction: application.jobFunction,
                date: application.date,
                profileImage: application.user.crewData?.basicInfo?.profileImage
            });
            showAlert('Crewmember accepted successfully!', 'good', 'The crew member has been notified.');
            applicants.value = applicants.value.filter(app => app.jobTitle !== application.jobTitle);
        }
        emit('fetchActiveCrewMembers');
    } catch (error) {
        console.error('Failed to accept applicant:', error);
    }
};

const navigateToProfile = (userUrl) => {
    emit('navigateToProfile', userUrl);
};

const showAlert = (message, type, text) => {
    alertMessage.value = message;
    alertType.value = type;
    alertText.value = text;
    alertVisible.value = true;
};

onMounted(() => {
    fetchApplicants();
});
</script>

<template>
    <Alert v-if="alertVisible" :type="alertType" :label="alertMessage" :text="alertText" />

    <div v-if="loading" class="loading text-reg-normal">Loading...</div>
    <div v-for="(applicant, index) in applicants" :key="applicant.userId" class="applicant surface-tertiary radius-xs"
        @click="navigateToProfile(applicant.user.userUrl)">
        <div class="applicant__top">
            <img :src="applicant.user.crewData?.basicInfo?.profileImage || 'https://via.placeholder.com/64'"
                class="applicant__top__image" alt="Crew image" />
            <h4 class="applicant__top__name">{{ applicant.user.username }}</h4>
        </div>
        <div id="applicant__info">
            <div class="applicant__info__left">
                <Tag type="big">{{ applicant.jobTitle }}</Tag>
            </div>
            <div id="applicant__info__right">
                <p>{{ formatDate(applicant.Date) }}</p>
            </div>
        </div>
        <div class="applicant__bot">
            <NormalButton label="Reject" class="applicant__bot__button button--tertiary"
                @click.stop="rejectApplicant(applicant.applicationId, index)" />
            <NormalButton label="Accept" class="applicant__bot__button button--primary"
                @click.stop="acceptApplicant(applicant, index)" />
        </div>
    </div>
</template>

<style scoped>
/* GENERAL */
p {
    margin: 0;
}

.applicant {
    flex-direction: column;
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
    gap: 12px;
    cursor: pointer;
    transition: 0.3s;
}

.applicant:hover {
    filter: brightness(92%);
}

.applicant,
.applicant__info,
.applicant__top,
.applicant__mid,
.applicant__bot,
#applicant__info {
    display: flex;
}

.applicant__top {
    align-items: center;
    gap: 16px;
}

.applicant__top__image {
    width: 64px;
    height: 64px;
    border-radius: 4px;
    object-fit: cover;
}

/* INFO */
#applicant__info {
    align-items: flex-start;
    margin-top: 4px;
    justify-content: space-between;
    color: var(--neutral-70);
}

#applicant__info__right p {
    text-align: right;
}

/* BOTTOM */
.applicant__bot {
    align-items: center;
    gap: 16px;
}

.applicant__bot__button {
    flex: 1;
}
</style>