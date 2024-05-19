<script setup>
import { defineProps, ref, onMounted } from 'vue';
import NormalButton from '../../atoms/buttons/NormalButton.vue';

const props = defineProps({
    crewMember: {
        type: Object,
        required: true
    }
});
</script>

<template>
    <div class="activeCrew surface-tertiary radius-xs">
        <div class="activeCrew__top">
            <img :src="crewMember.image || 'https://res.cloudinary.com/dqzaz6d2o/image/upload/v1715265202/user-images/jji0f5zxxzaop7kkihn7.png'"
                class="activeCrew__top__image" alt="Crew image" />
            <h4 class="activeCrew__top__name">{{ crewMember.name }}</h4>
        </div>

        <div id="activeCrew__info">
            <div id="activeCrew__info__right">
                <p>{{ crewMember.jobTitle }}</p>
            </div>
            <div class="activeCrew__info__left">
                <p class="text-reg-normal">{{ crewMember.role }}</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* GENERAL */
p {
    margin: 0;
}

.activeCrew {
    flex-direction: column;
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
    gap: 12px;
}

.activeCrew,
.activeCrew__info,
.activeCrew__top,
.activeCrew__mid,
.activeCrew__bot,
#activeCrew__info {
    display: flex;
}

.activeCrew__top {
    align-items: center;
    gap: 16px;
}

.activeCrew__top__image {
    width: 64px;
    height: 64px;
    border-radius: 4px;
}

/* INFO */
#activeCrew__info {
    align-items: flex-start;
    margin-top: 4px;
    justify-content: space-between;
    color: var(--neutral-70);
}
</style>
