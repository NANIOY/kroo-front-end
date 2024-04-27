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
                description.value = crewData.profileDetails.tagline;
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

                    <div class="profileinfo__container__info__text__functions">
                        <span v-for="(func, index) in functions" :key="index"
                            class="profileinfo__container__info__text__functions__item text-reg-normal">
                            {{ func }}
                        </span>
                    </div>

                    <div class="profileinfo__container__info__text__skilldesc">
                        <div>
                            <Tag v-for="skill in skills" :key="skill" type="colored">{{ skill }}</Tag>
                        </div>
                        <p class="text-reg-s">
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
/* COMBINED */
.profileinfo,
.profileinfo__container,
.profileinfo__container__info,
.profileinfo__container__info__text,
.profileinfo__container__info__text__skilldesc,
.profileinfo__container__info__text__skilldesc div {
    display: flex;
    align-items: center;
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
    gap: 16px;
}

.profileinfo__container__info__text__functions,
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
.profileinfo__container__info__text__functions__item:not(:last-child)::after {
    content: "|";
    margin: 0 8px;
    color: var(--neutral-40);
}

/* SKILLS + DESCRIPTION */
.profileinfo__container__info__text__skilldesc div {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: center;
}
</style>