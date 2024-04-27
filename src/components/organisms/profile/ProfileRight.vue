<script setup>
import Tabs from '../../molecules/profile/Tabs.vue'
import Portfolio from '../../molecules/profile/Portfolio.vue'
</script>

<template>
    <div class="profileright">
        <Tabs />
        <div class="profileright__portfolio">
            <div class="profileright__portfolio__inner">
                <Portfolio />
            </div>
        </div>


    </div>
</template>

<style scoped>
.profileright {
    display: flex;
    flex-direction: column;
    gap: 24px;
    width: 1166px;
    margin-top: 48px;
}

.profileright__portfolio {
    height: 88vh;
    overflow: hidden;
    scrollbar-width: none;
}

.profileright__portfolio__inner {
    height: 100%;
    overflow-y: auto;
    padding-right: 17px;
    margin-right: -17px;
}

.profileright__portfolio::-webkit-scrollbar {
    display: none;
}
</style>