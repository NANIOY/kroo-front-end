<script setup>
import { ref, onMounted } from 'vue';
import PortfolioItem from '../../atoms/profile/PortfolioItem.vue';

const getRandomHeight = (remainingHeight, remainingItems, maxHeight) => {
    if (remainingItems === 1) {
        return remainingHeight; // return the remaining height if it's the last item
    }
    const minHeight = 160; // min height of each item
    const effectiveMaxHeight = Math.min(maxHeight, remainingHeight - (remainingItems - 1) * minHeight);
    return Math.floor(Math.random() * (effectiveMaxHeight - minHeight + 1)) + minHeight;
};

const balanceHeights = (items, columns, columnHeight, maxHeight) => {
    const columnItems = Array.from({ length: columns }, () => []);
    let itemIndex = 0;

    for (let i = 0; i < columns; i++) {
        let remainingHeight = columnHeight;
        let remainingItems = Math.ceil((items.length - itemIndex) / (columns - i));

        while (remainingHeight > 0 && remainingItems > 0) {
            const height = getRandomHeight(remainingHeight, remainingItems, maxHeight);
            columnItems[i].push({ ...items[itemIndex], height });
            remainingHeight -= height;
            remainingItems--;
            itemIndex++;
        }
    }

    return columnItems;
};

const rawPortfolioItems = ref([
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
    { imageSrc: 'https://fakeimg.pl/1070x751' },
    { imageSrc: 'https://fakeimg.pl/608x520' },
    { imageSrc: 'https://fakeimg.pl/989x613' },
    { imageSrc: 'https://fakeimg.pl/818x600' },
    { imageSrc: 'https://fakeimg.pl/669x445' },
    { imageSrc: 'https://fakeimg.pl/588x889' },
    { imageSrc: 'https://fakeimg.pl/742x761' },
    { imageSrc: 'https://fakeimg.pl/989x613' },
    { imageSrc: 'https://fakeimg.pl/271x299' },
    { imageSrc: 'https://fakeimg.pl/476x1107' },
    { imageSrc: 'https://fakeimg.pl/271x299' },
    { imageSrc: 'https://fakeimg.pl/608x520' },
    { imageSrc: 'https://fakeimg.pl/271x299' },
]);

const columns = ref(3);
const columnHeight = 5600; // height of each column
const maxHeight = 400; // max height of each item
const portfolioColumns = ref([]);

const arrangePortfolio = () => {
    portfolioColumns.value = balanceHeights(rawPortfolioItems.value, columns.value, columnHeight, maxHeight);
};

onMounted(arrangePortfolio);
</script>

<template>
    <div class="portfolio">
        <div v-for="(column, index) in portfolioColumns" :key="index" class="portfolio__column">
            <PortfolioItem v-for="item in column" :key="item.imageSrc" :imageSrc="item.imageSrc"
                :height="item.height + 'px'" />
        </div>
    </div>
</template>

<style scoped>
.portfolio {
    display: flex;
    gap: 24px;
    margin-bottom: 48px;
}

.portfolio__column {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 24px;
}
</style>