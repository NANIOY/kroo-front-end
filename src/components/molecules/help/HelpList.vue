<script setup>
import { ref } from 'vue';
import { NavArrowDown } from '@iconoir/vue';

const props = defineProps({
    titleLabel: {
        type: String,
        default: 'Dropdowns:'
    },
    dropdownItems: {
        type: Array,
        default: () => []
    }
});

const isOpen = ref(new Array(props.dropdownItems.length).fill(false));

const toggleDropdownText = (index) => {
    isOpen.value[index] = !isOpen.value[index];
};
</script>

<template>
    <div class="help-list-container">
        <label class="title-label">{{ titleLabel }}</label>
        <div class="dropdown-menu-container">
            <div v-for="(item, index) in dropdownItems" :key="index" class="dropdown-container">
                <div class="dropdown-title" @click="toggleDropdownText(index)">
                    {{ item.label }}
                    <NavArrowDown :class="{ 'arrow-rotate': isOpen[index] }" />
                </div>
                <div :id="'dropdown-text-' + index" class="dropdown-text" :class="{ 'show-text': isOpen[index] }">
                    {{ item.textOptions }}
                </div>
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
    width: 100%
}

.title-label {
    color: var(--color-text-text-primary, #0E0F0F);
    font-family: "Codec Pro";
    font-size: 32px;
    font-style: normal;
    font-weight: 500;
    line-height: 100%;
}

.dropdown-menu-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 32px;
    align-self: stretch;
}

.dropdown-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 8px;
    align-self: stretch;
}

.dropdown-title {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    width: 100%;
    padding: 12px 4px 0 4px;
    border-bottom: 2px solid var(--neutral-70);
    cursor: pointer;
    color: var(--color-text-text-primary, #0E0F0F);
    font-family: Orkney;
    font-size: 20px;
    font-style: normal;
    font-weight: 300;
    line-height: 140%;
}

.arrow-rotate {
    transition: transform 0.3s ease;
    transform: rotate(0deg);
}

.arrow-rotate {
    transform: rotate(180deg);
}

.dropdown-text {
    display: none;
    color: #000;
    font-family: Orkney;
    font-size: 16px;
    font-style: normal;
    font-weight: 300;
    line-height: 140%;
}

.show-text {
    display: block;
    align-self: stretch;
    padding-left: 4px;
}
</style>