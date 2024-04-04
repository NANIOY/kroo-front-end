<script setup>
import TransparentButton from '../../atoms/buttons/TransparentButton.vue';
import LargeButton from '../../atoms/buttons/LargeButton.vue';
import IconLabel from '../../atoms/items/IconLabel.vue';
import Tag from '../../atoms/items/Tag.vue';
import { defineProps } from 'vue';

// Props definition
const props = defineProps({
    jobTitle: String,
    employerName: String,
    employerImage: String,
    description: String,
    hourlyRate: String,
    dateTime: String,
    tags: Array,
    iconLabels: {
        type: Array,
        required: true
    },
    skillTags: {
        type: Array,
        default: () => []
    }
});

const iconNames = ['Learning', 'MapPin', 'CinemaOld', 'DragHandGesture'];
</script>

<template>
    <div class="jobpop">
        <!-- Top Section -->
        <div class="jobpop__top">
            <div class="jobpop__top__row">
                <h3>{{ jobTitle }}</h3>
                <TransparentButton class="jobpop__top__row__button no-label" :hasLabel=false iconName="Xmark" />
            </div>
            <div class="jobpop__top__business">
                <img :src="employerImage" alt="Employer Image" />
                <span class="text-reg-normal">{{ employerName }}</span>
            </div>
            <div class="jobpop__top__details">
                <p class="jobpop__top__details__desc text-reg-normal">{{ description }}</p>
                <p class="jobpop__top__details__rate text-bold-normal">{{ hourlyRate }}</p>
                <p class="jobpop__top__details__time text-bold-normal">{{ dateTime }}</p>
                <div class="jobpop__top__details__tags">
                    <Tag v-for="(skillTag, index) in skillTags" :key="index" type="colored">{{ skillTag.label }}</Tag>
                </div>
            </div>
        </div>

        <!-- Middle Section -->
        <div class="jobpop__mid">
            <div class="jobpop__mid__details">
                <p class="jobpop__mid__details__heading text-bold-l">Details</p>
                <IconLabel v-for="(label, index) in iconLabels" :key="index" :label="label"
                    :iconName="iconNames[index]" />
            </div>
            <div class="jobpop__attachements">
                <p class="jobpop__attachments__head text-bold-normal">Attachments</p>
                <div class="jobpop__attachments__links">
                    <IconLabel label="Attachment 1" iconName="Attachment" />
                    <IconLabel label="Attachment 2" iconName="Attachment" />
                </div>
            </div>
        </div>

        <!-- Bottom Section -->
        <div class="jobpop__bottom">
            <LargeButton label="Apply" class="jobpop__bottom__button button--primary" />
            <LargeButton label="Save" class="jobpop__bottom__button button--tertiary" />
        </div>
    </div>
</template>

<style scoped>
/* GENERAL */
.jobpop {
    width: 600px;
    height: 920px;
    padding: 48px;
    border-radius: 8px;
    box-sizing: border-box;
    background-color: var(--white);
    box-shadow: 0px 0px 16px 0 rgba(14, 15, 15, 0.04);
    color: var(--black);
}

/* TOP */
.jobpop__top {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 24px;
}

.jobpop__top__row {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.jobpop__top__row h3 {
    margin: 0;
    font-weight: 100;
}

.jobpop__top__business {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 8px;
}

.jobpop__top__business img {
    width: 28px;
    height: 28px;
    border-radius: 50%;
}

p {
    margin: 0;
}

.jobpop__top__details {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.jobpop__top__details__desc {
    margin-bottom: 4px;
}

.jobpop__top__details__tags {
    display: flex;
    gap: 8px;
}

/* MIDDLE */
.jobpop__mid {
    display: flex;
    flex-direction: column;
    gap: 24px;
    margin-bottom: 48px;
}

.jobpop__mid__details {
    display: flex;
    flex-direction: column;
    gap: 16px;

}

.jobpop__mid__details__heading {
    border-bottom: 1.5px solid var(--black);
    padding-bottom: 2px;
}

.jobpop__attachements {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.jobpop__attachments__head {
    margin: 0;
}

.jobpop__attachments__links {
    display: flex;
    flex-direction: column;
    gap: 16px;

}

/* BOTTOM */
.jobpop__bottom {
    display: flex;
    gap: 24px;
}

.jobpop__bottom__button {
    width: 50%;
}
</style>