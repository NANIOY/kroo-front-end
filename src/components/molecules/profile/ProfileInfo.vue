<script setup>
import { defineProps, ref, onMounted } from 'vue';
import ProfileImg from '../../atoms/profile/ProfileImg.vue';
import Tag from '../../atoms/items/Tag.vue';
import LargeButton from '../../atoms/buttons/LargeButton.vue';
import setupAxios from '../../../setupAxios';

const axiosInstance = setupAxios();
const userId = sessionStorage.getItem('userId');
const name = ref('');
const functions = ref([]);
const skills = ref([]);
const description = ref('');

onMounted(async () => {
    if (userId) {
        try {
            const userResponse = await axiosInstance.get(`/user/${userId}`);
            name.value = userResponse.data.data.user.username;
            const crewDataId = userResponse.data.data.user.crewData._id;

            if (crewDataId) {
                const crewResponse = await axiosInstance.get(`/crew/${crewDataId}`);
                const crewData = crewResponse.data.data;
                functions.value = crewData.basicInfo.functions;
                skills.value = crewData.profileDetails.skills;
                description.value = crewData.profileDetails.bio;
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    }
});
</script>

<template>
    <div class="profileinfo">
        <div class="profileinfo__container">
            <div class="profileinfo__container__info">
                <ProfileImg :showBadge="true" :profileImage="profileImage" />

                <div class="profileinfo__container__info__text">
                    <h4>{{ name }}</h4>

                    <div>
                        <span v-for="func in functions" :key="func">{{ func }}</span>
                    </div>

                    <div class="profileinfo__container__info__text__skilldesc">
                        <div>
                            <Tag v-for="skill in skills" :key="skill" type="colored">{{ skill }}</Tag>
                        </div>
                        <p>
                            {{ description }}
                        </p>
                    </div>
                </div>
            </div>
            <LargeButton label="Send a job offer" class="button--primary" />
        </div>
    </div>
</template>

<style scoped>
.profileinfo {
    display: flex;
    color: var(--white);
}

.profileinfo__container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 56px 48px 0 48px;
}

.profileinfo__container__info {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
}
</style>