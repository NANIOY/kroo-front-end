<script setup>
import { defineProps } from 'vue';
import SearchJob from '../jobs/SearchJob.vue';
import JobList from '../../organisms/list/JobList.vue';

const props = defineProps({
    business: {
        type: Object,
        required: true
    }
});
</script>

<template>
    <div class="about">
        <div class="about__top">
            <div class="about__top__bio surface-tertiary radius-s">
                <p>{{ business.businessInfo.bio }}</p>
            </div>
            <div class="about__top__work">
                <img class="radius-s work" :src="business.businessInfo.bannerImage" alt="portfolio work">
            </div>
        </div>
        <JobList :jobs="business.jobs" />
    </div>
</template>

<style scoped>
.about {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

p {
    margin: 0;
}

.about__top {
    display: flex;
    gap: 20px;
    flex-direction: row;
    max-height: 300px;
}

.about__top__bio {
    padding: 32px;
}

.about__top__bio {
    max-width: 794px;
}

.about__jobs {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
}

.work {
    object-fit: cover;
    max-height: 300px;

}
</style>