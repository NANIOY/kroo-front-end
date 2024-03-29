<script setup>
import IconLabel from '../../atoms/items/IconLabel.vue';
import TransparentButton from '../../atoms/buttons/TransparentButton.vue';

const props = defineProps({
    image: String,
    title: String,
    location: String,
    date: String,
    time: String,
});
</script>

<template>
    <div class="job-suggestion">
        <div class="image-title">
            <img :src="image" class="job-image" alt="Job Image" width="56" height="56">
            <div class="title">{{ title }}</div>
            <TransparentButton class="button--primary--transparent no-label" :hasIcon="true" iconName="MoreHoriz"
                color="green" />
        </div>
        <div class="details">
            <IconLabel :iconName="'MapPin'" :label="location" size="small" />
            <span class="separator">|</span>
            <IconLabel :iconName="'Calendar'" :label="date" size="small" />
            <span class="separator">|</span>
            <IconLabel :iconName="'Clock'" :label="time" size="small" />
        </div>
    </div>
</template>

<style scoped>
.job-suggestion {
    width: 564px;
    height: 160px;
    background-color: var(--neutral-20);
    padding: 16px;
}

.image-title {
    display: flex;
    align-items: center;
}

.job-image {
    width: 56px;
    height: 56px;
    margin-right: 16px;
}

.title {
    max-width: 388px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.save-button {
    margin-left: auto;
}

.details {
    display: flex;
    align-items: center;
    margin-top: 8px;
}

.separator {
    margin: 0 8px;
}
</style>