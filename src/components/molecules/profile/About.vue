<script setup>
import { defineProps, ref, watchEffect } from 'vue';
import Tag from '../../atoms/items/Tag.vue';
import IconLabel from '../../atoms/items/IconLabel.vue';

const props = defineProps({
    user: {
        type: Object,
        required: true
    }
});

const crewData = ref(null);
const skills = ref([]);

watchEffect(() => {
    if (props.user && props.user.crewData) {
        crewData.value = props.user.crewData;
        skills.value = props.user.crewData?.profileDetails.skills || [];
        console.log('About received crewData:', crewData.value);
    }
});
</script>

<template>
    <div v-if="crewData">
        <div class="about-top">
            <div class="about__bio surface-tertiary radius-s">
                <p>Lorem ipsum dolor sit amet consectetur. Nulla nulla semper elit blandit purus. Tincidunt sit arcu donec cursus volutpat luctus volutpat. Sed scelerisque ut tincidunt purus nunc et vestibulum vitae facilisi. Sollicitudin lorem egestas etiam amet commodo vestibulum. Lorem ipsum dolor sit amet consectetur. Nulla nulla semper elit blandit purus. Tincidunt sit arcu donec cursus volutpat luctus volutpat. Sed scelerisque ut tincidunt purus nunc et vestibulum vitae facilisi. Sollicitudin lorem egestas etiam amet commodo vestibulum. Lorem ipsum dolor sit amet consectetur. Nulla nulla semper elit blandit purus. Tincidunt sit arcu donec cursus volutpat luctus volutpat. Sed scelerisque ut tincidunt purus nunc et vestibulum vitae facilisi. Sollicitudin lorem egestas etiam amet commodo vestibulum. Lorem ipsum dolor sit amet consectetur. Nulla nulla semper elit blandit purus. Tincidunt sit arcu donec cursus volutpat luctus volutpat. Sed scelerisque ut tincidunt purus nunc et vestibulum vitae facilisi. Sollicitudin lorem egestas etiam amet commodo vestibulum.</p>
            </div>

            <div class="about__tags surface-tertiary radius-s">
                <div class="about-tags-skills">
                    <Tag v-for="skill in skills" :key="skill" class="skill">
                    {{ skill }}
                    </Tag>
                </div>
                <div class="about-tags-languages">
                    <Tag v-for="language in crewData.profileDetails?.languages" :key="language" class="skill tag--transparent">
                    {{ language }}
                    </Tag>
                </div>
            </div>
        </div>

    <div class="about-bottom">
        <div class="about-bottom-edu-train">
            <div class="about__education surface-tertiary radius-s">
                <div class="about__educations">
                    <div>
                        <div class="about__education__wrapper">
                            <div class="about__education__wrapper-info">
                                <p class="education__year">2024</p>
                                <p>-</p>
                                <p class="text-bold-normal education__school">Thomas More Mechelen</p>
                            </div>
                            <div class="about__education__wrapper-education">
                                <p class="text-reg-s education__course">Digital Experience Design</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="about__education__wrapper">
                            <div class="about__education__wrapper-info">
                                <p class="education__year">2020</p>
                                <p>-</p>
                                <p class="text-bold-normal education__school">AP hogeschool</p>
                            </div>
                            <div class="about__education__wrapper-education">
                                <p class="text-reg-s education__course">Toegepaste journalistiek</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="about__training surface-tertiary radius-s">
                <div class="about__trainings">
                    <div>
                        <div class="about__training__wrapper">
                            <div class="about__training__wrapper-info">
                                <p class="training__year">2018</p>
                                <p>-</p>
                                <p class="text-bold-normal training__school">Syntra</p>
                            </div>
                            <div class="about__training__wrapper-education">
                                <p class="text-reg-s training__course">Training: how to be a good actor</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="about__training__wrapper">
                            <div class="about__training__wrapper-info">
                                <p class="training__year">2017</p>
                                <p>-</p>
                                <p class="text-bold-normal training__school">Syntra</p>
                            </div>
                            <div class="about__training__wrapper-education">
                                <p class="text-reg-s training__course">Training: make-up artist</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="about-bottom-cert-licen">
            <div class="about__certifications surface-tertiary radius-s">
                <ul class="about__certifications__wrapper">
                    <li class="certification">
                        <IconLabel :iconName="'Attachment'" label="certification 1" size="small" :isLink="true" :href="'#'" />
                    </li>
                    <li class="certification">
                        <IconLabel :iconName="'Attachment'" label="certification 2" size="small" :isLink="true" :href="'#'" />
                    </li>
                    <li class="certification">
                        <IconLabel :iconName="'Attachment'" label="certification 3" size="small" :isLink="true" :href="'#'" />
                    </li>
                </ul>
            </div>

            <div class="about__licenses surface-tertiary radius-s">
                <ul class="about__licenses__wrapper">
                    <li class="certification">
                        <IconLabel :iconName="'Attachment'" label="license 1" size="small" :isLink="true" :href="'#'" />
                    </li>
                    <li class="certification">
                        <IconLabel :iconName="'Attachment'" label="license 2" size="small" :isLink="true" :href="'#'" />
                    </li>
                    <li class="certification">
                        <IconLabel :iconName="'Attachment'" label="license 3" size="small" :isLink="true" :href="'#'" />
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

.about__bio, .about__education, .about__tags, .about__certifications, .about__licenses, .about__training {
    padding: 32px;
    margin-bottom: 1rem;
}

/* about top */

.about-top {
    display: flex;
    gap: 32px;
}

/* about bottom */

.about-bottom-edu-train {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
}

.about-bottom-cert-licen {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
}

/* bio */ 

.about__bio {
    max-width: 794px;
    max-height: 350px;
}

/* education & training */ 

.about__education, .about__training {
    width: 100%;
}

.about__educations, .about__trainings {
    display: flex;
    flex-direction: column;
    gap: 1rem;

}

.about__education__wrapper-info, .about__training__wrapper-info {
    display: flex;
    gap: 0.5rem;
}

.education__school, .training__school {
    text-transform: uppercase;
    color: var(--blurple);
}

.education__course, .training__course {
    color: var(--neutral-80);
}

.training__school {
    text-transform: uppercase;
    color: var(--green-50);
}

/* skills & languages */

.about__tags {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 100%;
    height: fit-content;
}

.skill {
    width: fit-content;
}

.about-tags-skills, .about-tags-languages {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
}

/* certifications & licenses */

.about__certifications, .about__licenses {
    max-width: fit-content;
}

.certification, .licenses {
    list-style-type: none;
}

.certification a, .attachment-icon, .licenses a {
    color: var(--black);
    text-decoration: none;
    transition: 0.3s;
}

.about__certifications__wrapper, .about__licenses__wrapper {
    padding: 0;
    margin: 0;
}

</style>