<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  imageSrc: String,
});
</script>

<template>
  <div class="portfolioitem">
    <img :src="imageSrc" alt="Portfolio image" class="portfolioitem__img" />
    <div class="portfolioitem__content">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.portfolioitem {
  width: 100%;
  border-radius: 12px;
  overflow: hidden;
  display: block;
  position: relative;
  break-inside: avoid;
  margin-bottom: 24px;
}

.portfolioitem__img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  background-color: var(--gray);
  transition: 0.3s;
}

.portfolioitem__img:hover {
  transform: scale(1.1);
}

.portfolioitem__content {
  position: absolute;
  bottom: 0;
  width: 100%;
}
</style>