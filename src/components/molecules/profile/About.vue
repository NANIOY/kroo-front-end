<script setup>
import { defineProps, ref, watchEffect } from 'vue';

const props = defineProps({
    user: {
        type: Object,
        required: true
    }
});

const crewData = ref(null);

watchEffect(() => {
    if (props.user && props.user.crewData) {
        crewData.value = props.user.crewData;
        console.log('About received crewData:', crewData.value);
    }
});
</script>

<template>
    <div v-if="crewData">
        <p>{{ crewData.profileDetails?.bio }}</p>
        <h3>{{ crewData.profileDetails?.age }}</h3>
        <ul>
            <li v-for="language in crewData.profileDetails?.languages" :key="language">{{ language }}</li>
        </ul>
        <h3>{{ crewData.profileDetails?.city }}</h3>
        <h3>{{ crewData.profileDetails?.workRadius }} km</h3>
        <ul>
            <li v-for="certification in crewData.careerDetails?.certificationsLicenses" :key="certification">
                {{ certification }}
            </li>
        </ul>
        <p>{{ crewData.careerDetails?.unionStatus }}</p>
    </div>
    <div v-else>
        <p>No crew data available</p>
    </div>
</template>

<style scoped></style>