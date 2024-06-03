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
        <div class="about__bio surface-tertiary radius-s">
            <p>Lorem ipsum dolor sit amet consectetur. Nulla nulla semper elit blandit purus. Tincidunt sit arcu donec cursus volutpat luctus volutpat. Sed scelerisque ut tincidunt purus nunc et vestibulum vitae facilisi. Sollicitudin lorem egestas etiam amet commodo vestibulum. Lorem ipsum dolor sit amet consectetur. Nulla nulla semper elit blandit purus. Tincidunt sit arcu donec cursus volutpat luctus volutpat. Sed scelerisque ut tincidunt purus nunc et vestibulum vitae facilisi. Sollicitudin lorem egestas etiam amet commodo vestibulum. Lorem ipsum dolor sit amet consectetur. Nulla nulla semper elit blandit purus. Tincidunt sit arcu donec cursus volutpat luctus volutpat. Sed scelerisque ut tincidunt purus nunc et vestibulum vitae facilisi. Sollicitudin lorem egestas etiam amet commodo vestibulum. Lorem ipsum dolor sit amet consectetur. Nulla nulla semper elit blandit purus. Tincidunt sit arcu donec cursus volutpat luctus volutpat. Sed scelerisque ut tincidunt purus nunc et vestibulum vitae facilisi. Sollicitudin lorem egestas etiam amet commodo vestibulum.</p>
        </div>
        
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

<style scoped>

.about__bio {
    margin-bottom: 1rem;
    max-width: 794px;
    max-height: 350px;
    padding: 24px 32px;
}

</style>