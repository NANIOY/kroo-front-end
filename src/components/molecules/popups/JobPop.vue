<script setup>
import TransparentButton from '../../atoms/buttons/TransparentButton.vue';
import LargeButton from '../../atoms/buttons/LargeButton.vue';
import IconLabel from '../../atoms/items/IconLabel.vue';
import Tag from '../../atoms/items/Tag.vue';
import { defineProps } from 'vue';

const props = defineProps({
    job: Object,
});

const iconNames = ['Learning', 'MapPin', 'CinemaOld', 'DragHandGesture'];

const formatDateTime = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const timeOptions = { hour: 'numeric', minute: 'numeric', hour12: true };
    const formattedDate = dateTime.toLocaleDateString(undefined, dateOptions);
    const formattedTime = dateTime.toLocaleTimeString(undefined, timeOptions);
    return `${formattedDate} | ${formattedTime}`;
};
</script>

<template>
    <div class="jobpop" @click.stop>

        <!-- Top Section -->
        <div class="jobpop__top">
            <div class="jobpop__top__row">
                <h3>{{ job.title }}</h3>
                <TransparentButton class="jobpop__top__row__button no-label" :hasLabel="false" iconName="Xmark" />
            </div>
            <div class="jobpop__top__business">
                <img :src="job.employer.image" alt="Employer Image" />
                <span class="text-reg-normal">{{ job.employer.name }}</span>
            </div>
            <div class="jobpop__top__details">
                <p class="jobpop__top__details__desc text-reg-normal">{{ job.description }}</p>
                <p class="jobpop__top__details__rate text-bold-normal">€ {{ (job.wage / 100).toFixed(2) }}/hr</p>
                <p class="jobpop__top__details__time text-bold-normal">{{ formatDateTime(job.date) }}</p>
                <div class="jobpop__top__details__tags">
                    <Tag class="jobpop__top__details__tags__tag" v-for="(skill, index) in job.skills" :key="index"
                        type="colored">{{ skill }}</Tag>
                </div>
            </div>
        </div>

        <!-- Middle Section -->
        <div class="jobpop__mid">
            <div class="jobpop__mid__details">
                <p class="jobpop__mid__details__heading text-bold-l">Details</p>
                <IconLabel label="Job Function" :iconName="iconNames[0]" :label="job.jobFunction" />
                <IconLabel label="Location" :iconName="iconNames[1]" :label="job.location" />
                <IconLabel label="Production Type" :iconName="iconNames[2]" :label="job.production_type" />
                <IconLabel label="Union Status" :iconName="iconNames[3]" :label="job.union_status" />
            </div>
            <div class="jobpop__attachements">
                <p class="jobpop__attachments__head text-bold-normal">Attachments</p>
                <div class="jobpop__attachments__links">
                    <IconLabel v-for="(attachment, index) in job.attachments" :key="index" :label="attachment"
                        iconName="Attachment" />
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
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 50%;
    transform: translateY(-50%);
    right: 64px;
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
    flex-wrap: wrap;
    gap: 8px;
    max-width: 600px;
    margin-top: 4px;
}

.jobpop__top__details__tags__tag {
    max-width: 160px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
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