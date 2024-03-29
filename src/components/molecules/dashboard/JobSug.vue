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
    <div class="jobSug">
        <div class="jobSug__top">
            <img :src="image" class="jobSug__top__img" alt="Business logo" width="56" height="56">
            <div class="jobSug__top__title">{{ title }}</div>
            <TransparentButton class="jobSug__top__button no-label" :hasIcon="true" iconName="Bookmark"
                color="var(--blurple)" />
        </div>
        <div class="jobSug__bot">
            <IconLabel :iconName="'MapPin'" :label="location" size="small" />
            <span class="jobSug__bot__sep">|</span>
            <IconLabel :iconName="'Calendar'" :label="date" size="small" />
            <span class="jobSug__bot__sep">|</span>
            <IconLabel :iconName="'Clock'" :label="time" size="small" />
        </div>
    </div>
</template>

<style scoped>
.jobSug {
    width: 564px;
    height: 160px;
    background-color: var(--neutral-20);
    padding: 16px;
}

.jobSug__top {
    display: flex;
    align-items: center;
}

.jobSug__top__img {
    width: 56px;
    height: 56px;
    margin-right: 16px;
}

.jobSug__top__title {
    max-width: 388px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.save-button {
    margin-left: auto;
}

.jobSug__bot {
    display: flex;
    align-items: center;
    margin-top: 8px;
}

.jobSug__bot__sep {
    margin: 0 8px;
}
</style>