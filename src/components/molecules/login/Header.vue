<script setup>
import TransparentButton from '../../atoms/buttons/TransparentButton.vue';

// Props
const props = defineProps({
    hasBack: Boolean,
    hasText: Boolean,
    hasSteps: Boolean,
    hasSkip: Boolean,
    header: String,
    text: String,
    steps: String,
});

</script>

<template>
    <div class="header">
        <TransparentButton v-if="hasBack" class="no-label header__back" iconName="NavArrowLeft" />

        <div class="header__steps">
            <h5 v-if="hasSteps" class="header__steps__step">{{ steps }}</h5>
            <TransparentButton v-if="hasSkip" class="header__steps__skip" hasLabel="true" label="Skip"
                iconName="NavArrowRight" iconPosition="right" />
        </div>

        <h1>{{ header }}</h1>

        <p v-if="hasText" class="header__text text-secondary">{{ text }}</p>

    </div>
</template>

<style scoped>
.header {
    display: flex;
    flex-direction: column;
    width: 536px;
    color: var(--black);
}

h1,
p,
h5 {
    margin: 0;
    font-weight: 100;
}

.header__steps {
    margin-bottom: 20px;
    height: 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.header__steps__step {
    text-transform: uppercase;
    flex: 1;
}

.header__steps__skip {
    margin-right: -20px;
}
</style>