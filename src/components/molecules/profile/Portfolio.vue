<script setup>
import { ref, watchEffect } from 'vue';
import PortfolioItem from '../../atoms/profile/PortfolioItem.vue';
import { defineProps } from 'vue';

const props = defineProps({
    user: {
        type: Object,
        required: true
    }
});

const getRandomHeight = (minHeight, maxHeight) => {
    return Math.floor(Math.random() * (maxHeight - minHeight + 1)) + minHeight;
};

const distributeItems = (items, columns, minHeight, maxHeight) => {
    const columnItems = Array.from({ length: columns }, () => []);
    let heights = Array.from({ length: columns }, () => 0);

    items.forEach(item => {
        const columnIndex = heights.indexOf(Math.min(...heights));
        const height = getRandomHeight(minHeight, maxHeight);
        columnItems[columnIndex].push({ ...item, height });
        heights[columnIndex] += height;
    });

    // Adjust the last item in each column to ensure columns are of equal height
    const maxHeightInColumns = Math.max(...heights);
    columnItems.forEach((column, columnIndex) => {
        if (column.length > 0) {
            const lastItem = column[column.length - 1];
            lastItem.height += (maxHeightInColumns - heights[columnIndex]);
        }
    });

    return columnItems;
};

const portfolioItems = ref([]);
const columns = ref(3);
const minHeight = 156; // min height of each item
const maxHeight = 480; // max height of each item
const portfolioColumns = ref([]);

const arrangePortfolio = () => {
    portfolioColumns.value = distributeItems(portfolioItems.value, columns.value, minHeight, maxHeight);
};

watchEffect(() => {
    if (props.user && props.user.crewData.careerDetails && props.user.crewData.careerDetails.portfolioWork) {
        const filledItems = props.user.crewData.careerDetails.portfolioWork.map(work => ({
            imageSrc: work.url,
            status: 'filled'
        }));

        const lockedItems = Array.from({ length: 56 - filledItems.length }, () => ({
            imageSrc: 'https://fakeimg.pl/600x400?text=Locked',
            status: 'locked'
        }));

        portfolioItems.value = [...filledItems, ...lockedItems];
        arrangePortfolio();
    }
});
</script>

<template>
    <div class="portfolio">
        <div v-for="(column, index) in portfolioColumns" :key="index" class="portfolio__column">
            <PortfolioItem v-for="(item, itemIndex) in column" :key="item.imageSrc + itemIndex" :imageSrc="item.imageSrc"
                :height="item.height + 'px'" :status="item.status" />
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