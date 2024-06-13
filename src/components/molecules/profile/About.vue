<script setup>
import { defineProps, ref, watchEffect } from 'vue';
import { Trophy, Medal } from '@iconoir/vue';
import Tag from '../../atoms/items/Tag.vue';
import IconLabel from '../../atoms/items/IconLabel.vue';

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

const crewData = ref(null);
const skills = ref([]);
const educationTrainings = ref([]);
const certificationsLicenses = ref([]);
const activeJobsCount = ref(0);
const completedJobsCount = ref(0); // HARDCODED FOR NOW

watchEffect(() => {
    if (props.user && props.user.crewData) {
        crewData.value = props.user.crewData;
        skills.value = props.user.crewData.profileDetails.skills || [];
        educationTrainings.value = props.user.crewData.careerDetails.educationTraining || [];
        certificationsLicenses.value = props.user.crewData.careerDetails.certificationsLicenses || [];
        activeJobsCount.value = props.user.userJobs.active_jobs.length;
    }
});
</script>

<template>
    <div v-if="crewData">
        <div class="about__top">
            <div class="about__top__bio surface-tertiary radius-s">
                <p>{{ crewData.profileDetails.bio }}</p>
            </div>
            <div class="about__top__right">
                <div class="about__top__right__tags surface-tertiary radius-s">
                    <div class="about__top__right__tags__skills">
                        <Tag v-for="skill in skills" :key="skill" class="skill tag">
                            {{ skill }}
                        </Tag>
                    </div>
                    <div class="about__top__right__tags__languages">
                        <Tag v-for="language in crewData.profileDetails.languages" :key="language"
                            class="skill tag--transparent">
                            {{ language }}
                        </Tag>
                    </div>
                </div>
                <div class="about__top__right__count surface-tertiary radius-s">
                    <div class="about__top__right__count__item">
                        <p class="about__top__right__count__item__label text-reg-s">Active Jobs</p>
                        <div class="about__top__right__count__item__value">
                            <span class="text-bold-xl">{{ activeJobsCount }}</span>
                            <Trophy class="about__top__right__count__item__value__icon" />
                        </div>
                    </div>
                    <div class="about__top__right__count__item">
                        <p class="about__top__right__count__item__label text-reg-s">Completed Jobs</p>
                        <div class="about__top__right__count__item__value">
                            <span class="text-bold-xl">{{ completedJobsCount }}</span>
                            <Medal class="about__top__right__count__item__value__icon" />
                        </div>
                    </div>
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
.about__top__right__tags,
.about__top__right__count,
.about__bottom__certifications,
.about__bottom__licenses,
.about__bottom__trainings {
    padding: 32px;
    margin-bottom: 1rem;
}

/* TOP */
.about__top {
    display: flex;
    gap: 32px;
}

.about__top div {
    height: 100%;
}

.about__top__bio {
    width: 100%;
    height: auto;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 24px;
    box-sizing: border-box;
}

.about__top__bio p {
    white-space: pre-wrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

/* tags */
.about__top__right__tags {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.about__top__right__tags__skills,
.about__top__right__tags__languages {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
}


.about__top__right__count {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 16px;
    background-color: var(--neutral-20);
    border-radius: 8px;
}

.about__top__right__count__item {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.about__top__right__count__item__label {
    color: var(--neutral-80);
    text-transform: uppercase;
}

.about__top__right__count__item__value {
    display: flex;
    align-items: center;
    gap: 8px;
    color: var(--blurple-70);
}

.about__top__right__count__item__value__icon {
    color: var(--blurple);
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