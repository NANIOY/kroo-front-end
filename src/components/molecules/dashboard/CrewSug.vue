<script setup>
import { defineProps, defineEmits, ref, onMounted } from 'vue';
import Tag from '../../atoms/items/Tag.vue';

const props = defineProps({
    img: String,
    name: String,
    perc: String,
    jobtitle: String,
    functions: Array
});

const loading = ref(true);

onMounted(() => {
    setTimeout(() => {
        loading.value = false;
    }, 200);
});

</script>

<template>
    <!-- Skeleton loading -->
    <div v-if="loading" class="crewSug skeleton"></div>

    <div v-else class="crewSug">
        <div class="crewSug__top">
            <div class="crewSug__top__img">
                <img :src="img" class="crewSug__top__img__pfp" alt="Crew image" width="56" height="56">
                <div class="crewSug__top__img__badge">
                    <img src="../../../assets/img/badge.svg" alt="badge" @contextmenu.prevent>
                </div>
            </div>
            <h4 class="crewSug__top__name">{{ name }}</h4>
            <div class="crewSug__top__perc">
                <h6>{{ perc }}%</h6>
                <span class="text-bold-s">{{ jobtitle }}</span>
            </div>
        </div>
        <div class="crewSug__bot">
            <Tag v-for="(func, index) in functions" :key="index">{{ func }}</Tag>
        </div>
    </div>
</template>


<style scoped>
/* GENERAL */
.crewSug__top__img,
.crewSug__top__perc,
.crewSug__bot {
    user-select: none;
}

.crewSug {
    width: calc(568px - 48px);
    height: calc(160px - 64px);
    background-color: var(--neutral-20);
    padding: 32px 24px;
    border-radius: 4px;
    color: var(--black);
    display: flex;
    gap: 20px;
    flex-direction: column;
    cursor: pointer;
    transition: 0.3s;
}

.crewSug:hover {
    filter: brightness(92%);
}

/* TOP */
.crewSug__top {
    display: flex;
    align-items: center;
    gap: 16px;
}

.crewSug__top__img {
    position: relative;
}

.crewSug__top__img__pfp {
    border-radius: 4px;
}

.crewSug__top__img__badge {
    position: absolute;
    bottom: -8px;
    right: -8px;
    user-select: none;
    z-index: 999;
}

.crewSug__top__img__badge img {
    width: 24px;
}

.crewSug__top__name {
    max-width: 388px;
    height: 56px;
    margin: 0;
    font-weight: 100;
    line-height: 58px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.crewSug__top__perc {
    display: flex;
    flex-direction: column;
    gap: 4px;
    align-items: flex-end;
    margin-left: auto;
    color: var(--blurple);
}

/* BOTTOM */
.crewSug__bot {
    display: flex;
    align-items: center;
    margin-top: auto;
    gap: 12px;
}
</style>