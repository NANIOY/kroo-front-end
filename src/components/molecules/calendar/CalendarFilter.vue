<script setup>
import DropFilter from '../filter/DropFilter.vue';

const cardTypeConfig = {
    title: 'Card Type',
    numberOfCheckboxes: 2,
    hasMore: false,
    checkboxLabels: [ 'Professional', 'Personal']
};

// const priorityConfig = {
//     title: 'Priority',
//     numberOfCheckboxes: 3,
//     hasMore: false,
//     checkboxLabels: ['High', 'Medium', 'Low']
// };
</script>

<template>
    <div class="searchfilter">
        <DropFilter :useSlider="false" :dropdowns="[cardTypeConfig]" />
        <!-- <DropFilter :useSlider="false" :dropdowns="[priorityConfig]" /> -->
    </div>
</template>

<style scoped>
.searchfilter {
    display: flex;
    flex-direction: column;
    gap: 24px;
}
</style>
