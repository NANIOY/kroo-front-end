<script setup>
import { ref, onMounted } from 'vue';
import Tag from '../../atoms/items/Tag.vue';
import IconLabel from '../../atoms/items/IconLabel.vue';
import setupAxios from '../../../setupAxios';

const props = defineProps({
    user: {
        type: Object,
        required: true
    }
});

const crewData = ref(null);
const skills = ref([]);
const educationTrainings = ref([]);
const certificationsLicenses = ref([]);

const axiosInstance = setupAxios();

const fetchUserData = async () => {
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
        const userData = userResponse.data.data.user;
        if (!userData) {
            console.error('User data is missing');
            return null;
        }

        const crewDataId = userData.crewData?._id;
        if (crewDataId) {
            const crewResponse = await axiosInstance.get(`/crew/${crewDataId}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const crewData = crewResponse.data.data;
            if (crewData && crewData.basicInfo) {
                userData.crewData = crewData;
            } else {
                console.error('Crew data is missing');
            }
        }

        return userData;
    } catch (error) {
        console.error('Failed to fetch user data:', error);
        return null;
    }
};

const loadData = async () => {
    const userData = await fetchUserData();
    if (userData) {
        crewData.value = userData.crewData;
        skills.value = userData.crewData.profileDetails.skills || [];
        educationTrainings.value = userData.crewData.careerDetails.educationTraining || [];
        certificationsLicenses.value = userData.crewData.careerDetails.certificationsLicenses || [];
    }
};

onMounted(() => {
    loadData();
});
</script>

<template>
    <div v-if="crewData">
        <div class="about__top">
            <div class="about__top__bio surface-tertiary radius-s">
                <p>{{ crewData.profileDetails.bio }}</p>
            </div>

            <div class="about__top__tags surface-tertiary radius-s">
                <div class="about__top__tags__skills">
                    <Tag v-for="skill in skills" :key="skill" class="skill tag">
                        {{ skill }}
                    </Tag>
                </div>
                <div class="about__top__tags__languages">
                    <Tag v-for="language in crewData.profileDetails.languages" :key="language"
                        class="skill tag--transparent">
                        {{ language }}
                    </Tag>
                </div>
            </div>
        </div>

        <div class="about__bottom">
            <div class="about__bottom__top">
                <div class="about__bottom__educations surface-tertiary radius-s">
                    <div class="about__bottom__education__container">
                        <div v-for="education in educationTrainings" :key="education._id">
                            <div class="about__bottom__education__wrapper">
                                <div class="about__bottom__education__wrapper__info">
                                    <p class="education__year">{{ education.year }}</p>
                                    <p>-</p>
                                    <p class="text-bold-normal education__school">{{ education.school }}</p>
                                </div>
                                <div>
                                    <p class="text-reg-s education__course">{{ education.course }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="about__bottom__trainings surface-tertiary radius-s">
                    <div class="about__bottom__training__container">
                        <div v-for="training in educationTrainings" :key="training._id">
                            <div class="about__bottom__training__wrapper">
                                <div class="about__bottom__training__wrapper__info">
                                    <p class="training__year">{{ training.year }}</p>
                                    <p>-</p>
                                    <p class="text-bold-normal training__school">{{ training.school }}</p>
                                </div>
                                <div>
                                    <p class="text-reg-s training__course">{{ training.course }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="about__bottom__bottom">
                <div class="about__bottom__certifications surface-tertiary radius-s">
                    <ul class="about__bottom__certifications__wrapper">
                        <li v-for="certification in certificationsLicenses" :key="certification" class="certification">
                            <IconLabel :iconName="'Attachment'" :label="certification" size="small" :isLink="true"
                                :href="certification" />
                        </li>
                    </ul>
                </div>

                <div class="about__bottom__licenses surface-tertiary radius-s">
                    <ul class="about__bottom__licenses__wrapper">
                        <li v-for="license in certificationsLicenses" :key="license" class="certification">
                            <IconLabel :iconName="'Attachment'" :label="license" size="small" :isLink="true"
                                :href="license" />
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <div v-else>
        <p>No crew data available</p>
    </div>
</template>

<style scoped>
p {
    margin: 0;
}

.about__top__bio,
.about__bottom__educations,
.about__top__tags,
.about__bottom__certifications,
.about__bottom__licenses,
.about__bottom__trainings {
    padding: 32px;
    margin-bottom: 1rem;
}

/* about top */

.about__top {
    display: flex;
    gap: 32px;
}

/* about bottom */

.about__bottom__top {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
}

.about__bottom__bottom {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
}

/* bio */

.about__top__bio {
    max-width: 794px;
    max-height: 350px;
}

/* education & training */

.about__bottom__educations,
.about__bottom__trainings {
    width: 379px;
}

.about__bottom__education__container,
.about__bottom__training__container {
    display: flex;
    flex-direction: column;
    gap: 1rem;

}

.about__bottom__education__wrapper__info,
.about__bottom__training__wrapper__info {
    display: flex;
    gap: 0.5rem;
}

.education__school,
.training__school {
    text-transform: uppercase;
    color: var(--blurple);
}

.education__course,
.training__course {
    color: var(--neutral-80);
}

.training__school {
    text-transform: uppercase;
    color: var(--green-50);
}

/* skills & languages */

.about__top__tags {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 100%;
    height: fit-content;
}

.about__top__tags__skills,
.about__top__tags__languages {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
}

.skill {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

/* certifications & licenses */

.about__bottom__certifications,
.about__bottom__licenses {
    max-width: fit-content;
}

.certification,
.licenses {
    list-style-type: none;
}

.certification a,
.attachment-icon,
.licenses a {
    color: var(--black);
    text-decoration: none;
    transition: 0.3s;
}

.about__bottom__certifications__wrapper,
.about__bottom__licenses__wrapper {
    padding: 0;
    margin: 0;
}
</style>