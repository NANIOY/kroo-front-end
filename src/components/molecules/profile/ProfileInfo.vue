<script setup>
import { defineProps, ref, watchEffect } from 'vue';
import ProfileImg from '../../atoms/profile/ProfileImg.vue';
import Tag from '../../atoms/items/Tag.vue';
import LargeButton from '../../atoms/buttons/LargeButton.vue';

const props = defineProps({
    user: {
        type: Object,
        required: true
    }
});

const name = ref('');
const functions = ref([]);
const skills = ref([]);
const description = ref('');

watchEffect(() => {
    if (props.user) {
        name.value = props.user.username;
        functions.value = props.user.crewData?.basicInfo.functions || [];
        skills.value = props.user.crewData?.profileDetails.skills || [];
        description.value = props.user.crewData?.profileDetails.tagline || '';
    }
});
</script>

<template>
    <div class="profileinfo" v-if="props.user">
        <div class="profileinfo__container">
            <div class="profileinfo__container__info">
                <ProfileImg :profileImage="props.user.crewData?.basicInfo.profileImage" :showBadge="true" />

                <div class="profileinfo__container__info__text">
                    <h4>{{ name }}</h4>

                    <div class="profileinfo__container__info__text__functions">
                        <Tag class="profileinfo__container__info__text__functions__function"
                            v-for="(func, index) in functions" :key="index" type="colored">{{ func }}</Tag>
                    </div>

                    <div class="profileinfo__container__info__text__skilldesc">
                        <div>
                            <span v-for="skill in skills" :key="skill"
                                class="profileinfo__container__info__text__skilldesc__skill text-reg-s">
                                {{ skill }}
                            </span>
                        </div>
                        <p class="text-reg-normal">
                            {{ description }}
                        </p>
                    </div>
                </div>
            </div>
            <LargeButton label="Send a job offer" class="button--primary" />
        </div>
    </div>
    <div v-else>Loading...</div>
</template>

<style scoped>
/* COMBINED */
.profileinfo,
.profileinfo__container,
.profileinfo__container__info,
.profileinfo__container__info__text,
.profileinfo__container__info__text__skilldesc {
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

/* SKILLS + DESCRIPTION */
.profileinfo__container__info__text__skilldesc {
    align-items: center;
    text-align: center;
}

.profileinfo__container__info__text__skilldesc__skill:not(:last-child)::after {
    content: "|";
    margin: 0 8px;
    color: var(--neutral-40);
}
</style>