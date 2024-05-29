<script setup>
import InputField from '../../atoms/inputs/InputField.vue'

const searchInputConfig = {
    label: 'Search Label',
    placeholder: 'Type to search...'
};
</script>

<template>
    <InputField :label="searchInputConfig.label" :placeholder="searchInputConfig.placeholder" :hasIconLeft="true"
        iconLeftName="Search" class="searchfilter__input__field" />
</template>

<style scoped></style>