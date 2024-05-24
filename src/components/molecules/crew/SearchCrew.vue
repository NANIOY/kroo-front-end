<script setup>
import { defineProps, defineEmits, ref, onMounted } from 'vue';
import NormalButton from '../../atoms/buttons/NormalButton.vue';
import Tag from '../../atoms/items/Tag.vue';

const props = defineProps({
    img: String,
    name: String,
    city: String,
    country: String,
    functions: Array,
    userUrl: String,
});

const emit = defineEmits(['navigateToProfile']);

const loading = ref(true);

onMounted(() => {
    setTimeout(() => {
        loading.value = false;
    }, 500);
});

const navigateToProfile = () => {
    emit('navigateToProfile', props.userUrl);
};
</script>

<template>
    <!-- Skeleton loading -->
    <div v-if="loading" class="container skeleton"></div>

    <div v-else class="container" @click="navigateToProfile">
        <div class="container__info">
            <div class="container__top">
                <img :src="img" class="container__top__image" alt="Crew image" />
                <h4 class="container__top__name">{{ name }}</h4>
            </div>

            <div class="container__mid">
                <div class="container__mid__tags">
                    <Tag v-for="func in functions" :key="func" type="colored" class="container__mid__tags__tag">{{ func }}</Tag>
                </div>
                <div class="container__mid__location">
                    <span class="container__mid__location__city text-reg-l">{{ city }}</span>
                    <span class="container__mid__location__country text-reg-normal">{{ country }}</span>
                </div>
            </div>
        </div>

        <div class="container__bot">
            <NormalButton label="Details" class="container__bot__button button--primary" @click="navigateToProfile" />
        </div>
    </div>
</template>

<style scoped>
/* SKELETON */
.container.skeleton {
    animation: pulse 0.2s infinite alternate;
}

@keyframes pulse {
    0% {
        opacity: 0.8;
    }

    100% {
        opacity: 1;
    }
}

/* GENERAL */
.container,
.container__info,
.container__top,
.container__mid,
.container__bot,
.container__bot__buttons {
    display: flex;
}

.container,
.container__info {
    flex-direction: column;
}

.container__mid {
    justify-content: space-between;
    gap: 24px;
}

.container__mid__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.container,
.container__info {
    justify-content: space-between;
}

.container {
    width: 448px;
    height: 240px;
    background-color: var(--neutral-20);
    color: var(--black);
    border-radius: 4px;
    padding: 20px;
    box-sizing: border-box;
    cursor: pointer;
    transition: 0.3s;
}

.container:hover {
    filter: brightness(0.92);
}

.container__info {
    gap: 20px;
}

/* TOP */
.container__top {
    align-items: center;
    gap: 16px;
}

.container__top__image {
    width: 64px;
    height: 64px;
    border-radius: 4px;
}

/* MIDDLE */
.container__mid {
    gap: 16px;
}

.container__mid__location {
    display: flex;
    flex-direction: column;
    text-align: right;
}

/* BOTTOM */
.container__bot {
    align-items: center;
}

.container__bot__button {
    width: 100%;
}
</style>