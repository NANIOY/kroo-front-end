<script setup>
import { ref, watchEffect, defineProps } from 'vue';
import PortfolioItem from '../../atoms/profile/PortfolioItem.vue';
import PortfolioPop from '../../molecules/popups/PortfolioPop.vue';

const props = defineProps({
    user: {
        type: Object,
        required: true
    },
    isCurrentUserProfile: {
        type: Boolean,
        required: true
    }
});

const getRandomHeight = (minHeight, maxHeight) => {
    return Math.floor(Math.random() * (maxHeight - minHeight + 1)) + minHeight;
};

const inferMimeType = (url) => {
    const extension = url.split('.').pop().toLowerCase();
    switch (extension) {
        case 'png':
        case 'jpeg':
        case 'jpg':
        case 'webp':
        case 'gif':
        case 'svg':
            return `image/${extension === 'jpg' ? 'jpeg' : extension}`;
        case 'mp4':
        case 'webm':
            return `video/${extension}`;
        case 'mp3':
        case 'wav':
        case 'wave':
        case 'ogg':
            return `audio/${extension === 'wave' ? 'wav' : extension}`;
        default:
            return 'application/octet-stream';
    }
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
const minHeight = 156;
const maxHeight = 480;
const portfolioColumns = ref([]);

const arrangePortfolio = () => {
    portfolioColumns.value = distributeItems(portfolioItems.value, columns.value, minHeight, maxHeight);
};

const portfolioPopVisible = ref(false);
const portfolioPopData = ref({});

const handleOpenClick = () => {
    portfolioPopVisible.value = true;
};

const handlePortfolioSubmit = (portfolioData) => {
    console.log('Portfolio submitted:', portfolioData);
    arrangePortfolio();
};

const handleEditItem = (item) => {
    portfolioPopData.value = { ...item };
    portfolioPopVisible.value = true;
};

watchEffect(() => {
    console.log('isCurrentUserProfile:', props.isCurrentUserProfile);

    if (props.user && props.user.crewData.careerDetails && props.user.crewData.careerDetails.portfolioWork) {
        const planLimits = {
            free: 6,
            silver: 18,
            gold: 56
        };

        const currentPlan = props.user.crewData.paymentPlan || 'free';
        const limit = planLimits[currentPlan];

        const filledItems = props.user.crewData.careerDetails.portfolioWork.map(work => ({
            imageSrc: work.url,
            status: 'filled',
            mimeType: inferMimeType(work.url),
            poster: work.posterUrl || '',
            portfolioTitle: work.title,
            portfolioType: work.type
        }));

        const openItemsCount = Math.min(limit - filledItems.length, 56 - filledItems.length);
        const openItems = Array.from({ length: openItemsCount }, () => ({
            imageSrc: '',
            status: 'open',
            mimeType: 'image/png'
        }));

        const lockedItems = Array.from({ length: 56 - filledItems.length - openItemsCount }, () => ({
            imageSrc: 'https://fakeimg.pl/600x400?text=Locked',
            status: 'locked',
            mimeType: 'image/png'
        }));

        portfolioItems.value = [...filledItems, ...openItems, ...lockedItems];
        arrangePortfolio();
    }
});
</script>

<template>
    <div class="portfolio">
        <div v-for="(column, index) in portfolioColumns" :key="index" class="portfolio__column">
            <PortfolioItem v-for="(item, itemIndex) in column" :key="item.imageSrc + itemIndex"
                :imageSrc="item.imageSrc" :height="item.height + 'px'" :status="item.status" :mimeType="item.mimeType"
                :portfolioTitle="item.portfolioTitle" :portfolioType="item.portfolioType"
                :isOwner="props.isCurrentUserProfile" @edit="handleEditItem(item)" />
        </div>
    </div>
    <PortfolioPop :isVisible="portfolioPopVisible" @close="portfolioPopVisible = false" @submit="handlePortfolioSubmit"
        :initialData="portfolioPopData" />
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