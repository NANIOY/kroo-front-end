<script setup>
import { ref } from 'vue';
import PortfolioItem from '../../atoms/profile/PortfolioItem.vue';

const portfolioItems = ref([
    { imageSrc: 'https://fakeimg.pl/1070x751' },
    { imageSrc: 'https://fakeimg.pl/608x520' },
    { imageSrc: 'https://fakeimg.pl/989x613' },
    { imageSrc: 'https://fakeimg.pl/818x600' },
    { imageSrc: 'https://fakeimg.pl/669x445' },
    { imageSrc: 'https://fakeimg.pl/588x889' },
    { imageSrc: 'https://fakeimg.pl/742x761' },
    { imageSrc: 'https://fakeimg.pl/1086x1177' },
    { imageSrc: 'https://fakeimg.pl/476x1107' },
    { imageSrc: 'https://fakeimg.pl/271x299' },
    { imageSrc: 'https://fakeimg.pl/608x520' },

]);
</script>

<template>
    <div class="portfolio">
        <PortfolioItem v-for="item in portfolioItems" :key="item.imageSrc" :imageSrc="item.imageSrc" />
    </div>
</template>

<style scoped>
.portfolio {
  column-count: 3;
  column-gap: 24px;
}
</style>