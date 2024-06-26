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

  // adjust last item in each column to ensure columns are of equal height
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

const portfolioPopVisible = ref(false);

const handleOpenClick = () => {
  portfolioPopVisible.value = true;
};

const handlePortfolioSubmit = (portfolioData) => {
  console.log('Portfolio submitted:', portfolioData);
  arrangePortfolio();
};

const portfolioPopData = ref({});

const handleEditItem = (item) => {
  portfolioPopVisible.value = true;
  portfolioPopData.value = { ...item };
};

const handleAddItem = (item) => {
  portfolioPopVisible.value = true;
  portfolioPopData.value = { ...item, _id: null }; // Ensure the ID is null for new items
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
      _id: work._id,
      imageSrc: work.url,
      status: 'filled',
      mimeType: inferMimeType(work.url),
      poster: work.posterUrl || '',
      portfolioTitle: work.title,
      portfolioType: work.type
    }));

    const openItemsCount = props.isCurrentUserProfile
      ? Math.min(limit - filledItems.length, 56 - filledItems.length)
      : 0;

    const openItems = Array.from({ length: openItemsCount }, () => ({
      _id: null,
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
      <PortfolioItem
        v-for="(item, itemIndex) in column"
        :key="item.imageSrc + itemIndex"
        :_id="item._id"
        :imageSrc="item.imageSrc"
        :height="item.height + 'px'"
        :status="item.status"
        :mimeType="item.mimeType"
        :poster="item.poster"
        :portfolioTitle="item.portfolioTitle"
        :portfolioType="item.portfolioType"
        :isOwner="isCurrentUserProfile"
        @edit="handleEditItem"
        @add="handleAddItem"
      />
    </div>
  </div>
  <PortfolioPop
    :isVisible="portfolioPopVisible"
    @close="portfolioPopVisible = false"
    @submit="handlePortfolioSubmit"
    :initialData="portfolioPopData"
  />
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