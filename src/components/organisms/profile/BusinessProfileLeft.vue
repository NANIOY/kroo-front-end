<script setup>
import { defineProps } from 'vue';
import BusinessProfileInfo from '../../molecules/profile/BusinessProfileInfo.vue';

const props = defineProps({
    business: {
        type: Object,
        required: true
    }
});
</script>

<template>
    <div class="profileleft">
        <BusinessProfileInfo :business="business" />
    </div>
</template>

<style scoped>
.profileleft {
    width: 512px;
    height: 100vh;
    background-color: rgba(14, 15, 15, 0.96);
    margin-left: -48px;
    padding-top: 140px;
}
</style>