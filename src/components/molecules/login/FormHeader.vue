<script setup>
import { defineProps } from 'vue';
import TransparentButton from '../../atoms/buttons/TransparentButton.vue';
import { useRouter } from 'vue-router';

const props = defineProps({
    hasBack: Boolean,
    hasText: Boolean,
    hasSteps: Boolean,
    hasSkip: Boolean,
    header: String,
    text: String,
    steps: String,
});

const router = useRouter();

const goBack = () => {
    router.go(-1);
};

const goToNextStep = () => {
    const currentRoute = router.currentRoute.value;
    const currentStep = currentRoute.fullPath.split('/').pop();

    if (currentStep !== undefined) {
        const stepNumber = parseInt(currentStep.split('-')[1]);
        const nextStep = `step-${stepNumber + 1}`;
        const nextStepUrl = `/register/crew/${nextStep}`;
        router.push(nextStepUrl);
    } else {
        const nextStepUrl = '/register/crew/step-1';
        router.push(nextStepUrl);
    }
};
</script>

<template>
    <div class="header">
        <div v-if="hasSteps || hasSkip" class="header__steps">
            <h5 v-if="hasSteps" class="header__steps__step">{{ steps }}</h5>
            <TransparentButton v-if="hasSkip" class="header__steps__skip" hasLabel="true" label="Skip"
                iconName="NavArrowRight" iconPosition="right" @click="goToNextStep" />
        </div>
        <div class="header__backheader">
            <TransparentButton v-if="hasBack" class="no-label header__backheader__back" iconName="NavArrowLeft"
                @click="goBack" />
            <h1>{{ header }}</h1>
        </div>
        <p v-if="hasText" class="text-secondary">{{ text }}</p>
    </div>
</template>

<style scoped>
/* GENERAL */
.header,
.header__backheader,
.header__steps {
    display: flex;
}

.header__backheader,
.header__steps {
    align-items: center;
}

.header {
    flex-direction: column;
    width: 100%;
    color: var(--black);
}

h1,
p,
h5 {
    margin: 0;
    font-weight: 100;
    flex: 1;
}

/* BACK + HEADER */
.header__backheader {
    flex-direction: row;
    gap: 16px;
    margin-bottom: 12px;
}

.header__backheader__back {
    width: 40px !important;
    height: 40px !important;
}

/* STEPS */
.header__steps {
    height: 24px;
    margin-bottom: 20px;
    justify-content: space-between;
}

.header__steps__step {
    text-transform: uppercase;
}

.header__steps__skip {
    margin-right: -20px;
}
</style>