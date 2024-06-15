<script setup>
import Dropdown from '@/components/atoms/inputs/DropDown.vue';
import { ref, defineProps } from 'vue';

const props = defineProps({
    titleLabel: {
        type: String,
        default: 'Dropdowns:'
    },
    dropdownItems: {
        type: Array,
        default: () => [
            { label: 'First Dropdown', textOptions: 'Text 1' },
            { label: 'Second Dropdown', textOptions: 'Text 2' },
        ]
    }
});

const selectedOptions = ref(new Array(props.dropdownItems.length).fill('Select an option'));

</script>

<template>
    <div class="help-list-container">
        <label class="title-label">{{ titleLabel }}</label>
        <div class="dropdown-menu-container">
            <div v-for="(item, index) in dropdownItems" :key="index" class="dropdown-container">
                <Dropdown :hasLabel="true" :label="item.label" :textOptions="item.textOptions"
                    v-model="selectedOptions[index]" />
            </div>
        </div>
    </div>
</template>

<style scoped>
.help-list-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
    align-self: stretch;
}

.title-label {
    font-weight: bold;
}

.dropdown-menu-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 32px;
    align-self: stretch;
}

.dropdown-container {
    display: flex;
    padding: 0px 4px;
    justify-content: space-between;
    align-items: flex-start;
    align-self: stretch;
}
</style>