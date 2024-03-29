<script setup>
import { IconoirProvider } from '@iconoir/vue';
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
            <h4 class="jobSug__top__title">{{ title }}</h4>
            <IconoirProvider :icon-props="{
                'stroke-width': '2'
            }">
                <TransparentButton class="jobSug__top__save no-label" :hasIcon="true" iconName="Bookmark"
                    color="var(--blurple)" />
            </IconoirProvider>
        </div>
        <div class="jobSug__bot">
            <IconLabel :iconName="'MapPin'" :label="location" size="small" />
            <span class="jobSug__bot__sep text-secondary text-reg-l">|</span>
            <IconLabel :iconName="'Calendar'" :label="date" size="small" />
            <span class="jobSug__bot__sep text-secondary text-reg-l">|</span>
            <IconLabel :iconName="'Clock'" :label="time" size="small" />
        </div>
    </div>
</template>

<style scoped>
.jobSug {
    width: calc(564px - 48px);
    height: calc(160px - 64px);
    background-color: var(--neutral-20);
    padding: 32px 24px;
    border-radius: 4px;
    color: var(--black);
    display: flex;
    flex-direction: column;
}

.jobSug__top {
    display: flex;
    align-items: center;
    gap: 16px;
}

.jobSug__top__img {
    width: 56px;
    height: 56px;
    border-radius: 4px;
}

.jobSug__top__title {
    max-width: 388px;
    height: 56px;
    margin: 0;
    font-weight: 100;
    line-height: 58px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.jobSug__top__save {
    margin-left: auto;
    width: 32px !important;
}

.jobSug__bot {
    display: flex;
    align-items: center;
    margin-top: auto;
}

.jobSug__bot__sep {
    margin: 0 12px;
    opacity: 50%;
}
</style>