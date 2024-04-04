<script setup>
import TransparentButton from '../../atoms/buttons/TransparentButton.vue';
import LargeButton from '../../atoms/buttons/LargeButton.vue';
import IconLabel from '../../atoms/items/IconLabel.vue';
import Tag from '../../atoms/items/Tag.vue';

// Props definition
const props = defineProps({
    jobTitle: String,
    employerName: String,
    employerImage: String,
    description: String,
    hourlyRate: String,
    dateTime: String,
    tags: Array,
});
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
            <p class="text-reg-normal">{{ description }}</p>
            <div class="jobpop__top__details">
                <p class="jobpop__top__details__rate text-bold-normal">{{ hourlyRate }}</p>
                <p class="jobpop__top__details__time text-bold-normal">{{ dateTime }}</p>
                <div class="jobpop__top__details__tags">
                    <Tag v-for="(tag, index) in tags" :key="index" :label="tag.label" :color="tag.color" />
                </div>
            </div>
        </div>

        <!-- Middle Section -->
        <div class="jobpop__mid">
            <p class="jobpop__heading text-bold-l">Details</p>
            <hr class="jobpop__divider" />
            <div class="jobpop__details">
                <IconLabel label="Label 1" icon="icon1" />
                <IconLabel label="Label 2" icon="icon2" />
                <IconLabel label="Label 3" icon="icon3" />
                <IconLabel label="Label 4" icon="icon4" />
            </div>
            <p class="jobpop__attachments text-bold-normal">Attachments</p>
            <div class="jobpop__attachment-details">
                <IconLabel label="Attachment 1" icon="attachment-icon1" />
                <IconLabel label="Attachment 2" icon="attachment-icon2" />
            </div>
        </div>

        <!-- Bottom Section -->
        <div class="jobpop__bottom">
            <LargeButton label="Button 1" />
            <LargeButton label="Button 2" />
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
}

.jobpop__top__business img {
    width: 28px;
    height: 28px;
    border-radius: 50%;
}

.jobpop__tags {
    display: flex;
}

/* MIDDLE */
.jobpop__divider {
    width: 100%;
    border: 0;
    border-bottom: 1px solid #ccc;
    margin-top: 8px;
    margin-bottom: 16px;
}

/* BOTTOM */
.jobpop__bottom {
    display: flex;
    justify-content: space-between;
}
</style>