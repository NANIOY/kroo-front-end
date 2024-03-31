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

        <div class="header__steps">
            <h5 v-if="hasSteps" class="header__steps__step">{{ steps }}</h5>
            <TransparentButton v-if="hasSkip" class="header__steps__skip" hasLabel="true" label="Skip"
                iconName="NavArrowRight" iconPosition="right" />
        </div>
        <div class="header__backheader">
            <TransparentButton v-if="hasBack" class="no-label header__backheader__back" iconName="NavArrowLeft" />
            <h1 header__backheader__header>{{ header }}</h1>
        </div>

        <p v-if="hasText" class="header__text text-secondary">{{ text }}</p>

    </div>
</template>

<style scoped>
/* GENERAL */
.header {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 536px;
    color: var(--black);
}

h1,
p,
h5 {
    margin: 0;
    font-weight: 100;
}

/* BACK + HEADER */
.header__backheader {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 16px;
}

.header__backheader__back {
    width: 40px !important;
    height: 40px !important;
}

/* STEPS */
.header__steps {
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