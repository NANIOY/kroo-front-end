<script setup>
import DropFilter from './DropFilter.vue';
import InputField from '../../atoms/inputs/InputField.vue';
import Dropdown from '../../atoms/inputs/DropDown.vue';
import { ref, defineEmits, watch } from 'vue';

const functionConfig = {
    title: 'Function',
    numberOfCheckboxes: 3,
    hasMore: true,
    checkboxLabels: ['Production assistant', 'Gaffer', 'Director assistant']
};

const countryConfig = {
    title: 'Country',
    numberOfCheckboxes: 3,
    hasMore: true,
    checkboxLabels: ['Belgium', 'Germany', 'France']
};

const skillsConfig = {
    title: 'Skills',
    numberOfCheckboxes: 3,
    hasMore: true,
    checkboxLabels: ['Adaptability', 'Attention to Detail', 'Budget Management']
};

const searchDropdownConfig = {
    label: ' ',
    placeholder: 'Sort by',
    options: ['Relevance', 'Name (A-Z)', 'Name (Z-A)']
};

const searchInputConfig = {
    label: 'Search',
    placeholder: 'Search by name',
    width: '272px'
};

const searchTerm = ref('');
const selectedSortOption = ref('Relevance');

const emit = defineEmits(['search', 'sort']);

const handleSearch = (value) => {
    emit('search', value);
};

watch(selectedSortOption, (newVal) => {
    emit('sort', newVal);
});
</script>

<template>
    <div class="searchfilter">
        <div class="searchfilter__inputs">
            <InputField :label="searchInputConfig.label" :placeholder="searchInputConfig.placeholder"
                :hasIconLeft="true" iconLeftName="Search" class="searchfilter__input__field" v-model="searchTerm"
                @input="handleSearch($event.target.value)" />
            <Dropdown :label="searchDropdownConfig.label" :placeholder="searchDropdownConfig.placeholder"
                :options="searchDropdownConfig.options" class="searchfilter__input__dropdown"
                v-model="selectedSortOption" />
        </div>

        <div class="searchfilter__filters">
            <DropFilter :useSlider="false" :dropdowns="[functionConfig]" />
            <DropFilter :useSlider="false" :dropdowns="[countryConfig]" />
            <DropFilter :useSlider="false" :dropdowns="[skillsConfig]" />
        </div>
    </div>
</template>

<style scoped>
.searchfilter {
    display: flex;
    flex-direction: column;
    gap: 24px;
    width: 272px;
}

.searchfilter__inputs {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.searchfilter__input__dropdown {
    width: 100%;
}

.searchfilter__filters {
    display: flex;
    flex-direction: column;
    gap: 24px;
}
</style>