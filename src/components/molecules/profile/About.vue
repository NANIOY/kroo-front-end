<script setup>
import { defineProps, ref, watchEffect } from 'vue';
import Tag from '../../atoms/items/Tag.vue';

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

            <div class="about__skills surface-tertiary radius-s">
                <Tag v-for="skill in skills" :key="skill" class="skill">
                    {{ skill }}
                </Tag>
            </div>
        </div>

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
        
        
        <ul>
            <li v-for="language in crewData.profileDetails?.languages" :key="language">{{ language }}</li>
        </ul>
        <h3>{{ crewData.profileDetails?.city }}</h3>
        <h3>{{ crewData.profileDetails?.workRadius }} km</h3>
        <ul>
            <li v-for="certification in crewData.careerDetails?.certificationsLicenses" :key="certification">
                {{ certification }}
            </li>
        </ul>
        <p>{{ crewData.careerDetails?.unionStatus }}</p>
    </div>
    <div v-else>
        <p>No crew data available</p>
    </div>
</template>

<style scoped>

p {
    margin: 0;
}

.about__bio, .about__education, .about__skills {
    padding: 32px;
}

/* about top */

.about-top {
    display: flex;
    gap: 32px;
}

/* bio */ 

.about__bio {
    margin-bottom: 1rem;
    max-width: 794px;
    max-height: 350px;
}

/* education */ 

.about__education {
    max-width: 396px;
}

.about__educations {
    display: flex;
    flex-direction: column;
    gap: 1rem;

}

.about__education__wrapper-info {
    display: flex;
    gap: 0.5rem;
}

.education__school {
    text-transform: uppercase;
    color: var(--blurple);
}

.education__course {
    color: var(--neutral-80);
}

/* skills */

.about__skills {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 100%;
    height: fit-content;
}

.skill {
    width: fit-content;
}

</style>