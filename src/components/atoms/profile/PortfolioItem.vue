<script setup>
import { defineProps, computed, ref } from 'vue';
import { Lock, Play } from '@iconoir/vue';
import Overlay from '../../molecules/popups/Overlay.vue';

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
  },
  mimeType: {
    type: String,
    required: true
  }
});

const isImage = computed(() => {
  return props.mimeType.startsWith('image/');
});

const isVideo = computed(() => {
  return props.mimeType.startsWith('video/');
});

const isAudio = computed(() => {
  return props.mimeType.startsWith('audio/');
});

const showOverlay = ref(false);

const handlePlay = () => {
  showOverlay.value = true;
};

const handleClose = () => {
  showOverlay.value = false;
};
</script>

<template>
  <div class="portfolioitem" :style="{ height: props.height }">
    <template v-if="props.status === 'filled'">
      <template v-if="isImage">
        <img :src="props.imageSrc" alt="Portfolio image" class="portfolioitem__img" />
      </template>
      <template v-else-if="isVideo || isAudio">
        <div class="portfolioitem__media" @click="handlePlay">
          <img :src="props.imageSrc" alt="Media placeholder" class="portfolioitem__img" />
          <div class="portfolioitem__overlay">
            <Play class="portfolioitem__overlay__icon" />
          </div>
        </div>
        <div v-if="showOverlay" class="portfolioitem__fullscreenOverlay" @click="handleClose">
          <div class="portfolioitem__fullscreenOverlay__content">
            <template v-if="isVideo">
              <video controls autoplay :src="props.imageSrc"
                class="portfolioitem__fullscreenOverlay__content__media"></video>
            </template>
            <template v-else-if="isAudio">
              <audio controls autoplay :src="props.imageSrc"
                class="portfolioitem__fullscreenOverlay__content__media"></audio>
            </template>
          </div>
        </div>
      </template>
    </template>
    <template v-else-if="props.status === 'locked'">
      <div class="portfolioitem__locked">
        <img src="../../../assets/img/glasses-full.webp" alt="Locked" class="portfolioitem__locked-img" />
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
/* GENERAL */
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

/* LOCKED */
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
  filter: blur(12px);
  transition: 0.3s;
}

.portfolioitem__locked-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(15, 15, 15, 0.6);
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

/* MEDIA */
.portfolioitem__media {
  position: relative;
  width: 100%;
  height: 100%;
}

.portfolioitem__overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
}

.portfolioitem__overlay__icon {
  width: 48px;
  height: 48px;
  color: white;
}

.portfolioitem__fullscreenOverlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.portfolioitem__fullscreenOverlay__content {
  position: relative;
  max-width: 88%;
  max-height: 88%;
}

.portfolioitem__fullscreenOverlay__content__media {
  width: 100%;
  height: auto;
  max-height: 100%;
  background-color: var(--black);
}
</style>