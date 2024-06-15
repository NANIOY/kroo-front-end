<script setup>
import { defineProps } from 'vue';
import { Lock } from '@iconoir/vue';

const props = defineProps({
  imageSrc: String,
  height: {
    type: String,
    default: 'auto'
  },
  status: {
    type: String,
    default: 'filled',
    validator: (value) => ['filled', 'locked'].includes(value)
  }
});
</script>

<template>
  <div class="portfolioitem" :style="{ height: props.height }">
    <template v-if="props.status === 'filled'">
      <img :src="props.imageSrc" alt="Portfolio image" class="portfolioitem__img" />
    </template>
    <template v-else-if="props.status === 'locked'">
      <div class="portfolioitem__locked">
        <img src="../../../assets/img/glasses-full.webp" alt="Locked"
          class="portfolioitem__img portfolioitem__locked-img" />
        <div class="portfolioitem__locked-overlay"></div>
        <div class="portfolioitem__message">
          <Lock class="portfolioitem__lock-icon" />
          <h5>Upgrade to Pro</h5>
          <p class="text-reg-s">Unlock new ways to make your profile shine!</p>
        </div>
      </div>
    </template>
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
  cursor: pointer;
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

.portfolioitem__locked {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--gray);
}

.portfolioitem__locked-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: blur(8px);
  transition: 0.3s;
}

.portfolioitem__locked-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  pointer-events: none;
}

.portfolioitem__message {
  position: absolute;
  text-align: center;
  color: var(--white);
  z-index: 1;
  max-width: 88%;
}

.portfolioitem__lock-icon {
  width: 64px;
  height: 64px;
  margin-bottom: 8px;
}

p {
  margin-top: 8px;
}
</style>