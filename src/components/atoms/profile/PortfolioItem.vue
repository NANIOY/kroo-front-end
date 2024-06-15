<script setup>
import { defineProps, computed, ref, defineEmits } from 'vue';
import { Lock, Play, Plus } from '@iconoir/vue';
import Overlay from '../../molecules/popups/Overlay.vue';

const props = defineProps({
  _id: String,
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
  },
  poster: {
    type: String,
    default: ''
  },
  portfolioTitle: {
    type: String,
    default: ''
  },
  portfolioType: {
    type: String,
    default: ''
  },
  isOwner: {
    type: Boolean,
    default: false
  }
});

const emits = defineEmits(['edit']);

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

const handleClick = () => {
  if (props.isOwner) {
    handleEdit();
  } else {
    handlePlay();
  }
};

const handlePlay = () => {
  showOverlay.value = true;
};

const handleClose = () => {
  showOverlay.value = false;
};

const handleEdit = () => {
  emits('edit', {
    imageSrc: props.imageSrc,
    height: props.height,
    status: props.status,
    mimeType: props.mimeType,
    poster: props.poster,
    portfolioTitle: props.portfolioTitle,
    portfolioType: props.portfolioType
  });
};
</script>

<template>
  <div class="portfolioitem" :style="{ height: props.height }" @click="handleClick">
    <template v-if="props.status === 'filled'">
      <template v-if="isImage">
        <div class="portfolioitem__image-wrapper">
          <img :src="props.imageSrc" alt="Portfolio image" class="portfolioitem__img" />
          <div class="portfolioitem__overlay">
            <div class="portfolioitem__overlay-content">
              <h4>{{ props.portfolioTitle }}</h4>
              <p>{{ props.portfolioType }}</p>
            </div>
          </div>
        </div>
      </template>
      <template v-else-if="isVideo || isAudio">
        <div class="portfolioitem__media">
          <template v-if="isVideo">
            <video :poster="props.poster || '../../../assets/img/glasses-full.webp'" class="portfolioitem__img" muted
              autoplay loop playsinline controlslist="nodownload nofullscreen noremoteplayback" disablePictureInPicture>
              <source :src="props.imageSrc" :type="props.mimeType">
            </video>
          </template>
          <template v-else-if="isAudio">
            <img :src="props.poster || '../../../assets/img/glasses-full.webp'" alt=""
              class="portfolioitem__img portfolioitem__audio-placeholder" />
          </template>

          <div class="portfolioitem__overlay" v-if="!isVideo">
            <Play class="portfolioitem__overlay__icon" />
          </div>
        </div>
      </template>
      <Overlay v-if="showOverlay" @overlayClick="handleClose">
        <div class="portfolioitem__fullscreenOverlay__content" @click.stop>
          <template v-if="isImage">
            <img :src="props.imageSrc" alt="Portfolio image" class="portfolioitem__fullscreenOverlay__content__media"
              @click.stop />
          </template>
          <template v-if="isVideo">
            <video controls autoplay :src="props.imageSrc"
              :poster="props.poster || '../../../assets/img/glasses-full.webp'"
              class="portfolioitem__fullscreenOverlay__content__media" @click.stop></video>
          </template>
          <template v-if="isAudio">
            <audio controls autoplay :src="props.imageSrc" class="portfolioitem__fullscreenOverlay__content__media"
              @click.stop></audio>
          </template>
        </div>
      </Overlay>
    </template>
    <template v-else-if="props.status === 'locked'">
      <div class="portfolioitem__locked">
        <img src="../../../assets/img/glasses-full.webp" alt="Locked" class="portfolioitem__locked-img" />
        <div class="portfolioitem__locked-overlay"></div>
        <div class="portfolioitem__message portfolioitem__message--locked">
          <Lock class="portfolioitem__lock-icon" />
          <h5>Upgrade to Pro</h5>
          <p class="text-reg-s">Unlock new ways to make your profile shine!</p>
        </div>
      </div>
    </template>

    <template v-else-if="props.status === 'open'">
      <div class="portfolioitem__open">
        <div class="portfolioitem__message portfolioitem__message--open">
          <Plus class="portfolioitem__open-icon" />
          <p class="text-reg-s">Upload a portfolio item</p>
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

.portfolioitem__image-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}

.portfolioitem__img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  background-color: var(--gray);
  transition: 0.3s;
}

.portfolioitem__img:hover,
.portfolioitem__locked-img:hover,
.portfolioitem__open:hover,
.portfolioitem__audio-placeholder:hover {
  transform: scale(1.1);
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
  background: rgba(0, 0, 0, 0.6);
  opacity: 0;
  transition: opacity 0.3s;
}

.portfolioitem__image-wrapper:hover .portfolioitem__overlay,
.portfolioitem__media:hover .portfolioitem__overlay {
  opacity: 1;
}

.portfolioitem__overlay-content {
  color: var(--white);
  text-align: center;
  max-width: 88%;
  position: relative;
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

/* OPEN */
.portfolioitem__open {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--gray);
  transition: 0.3s;
}

.portfolioitem__message--open {
  color: var(--black);
}

.portfolioitem__message--open p {
  margin: 0;
}

.portfolioitem__open-icon {
  width: 48px;
  height: 48px;
  margin-bottom: 0px;
}

/* MEDIA */
.portfolioitem__media {
  position: relative;
  width: 100%;
  height: 100%;
}

.portfolioitem__overlay__icon {
  width: 48px;
  height: 48px;
  color: var(--white);
}

.portfolioitem__fullscreenOverlay__content {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.portfolioitem__fullscreenOverlay__content__media {
  width: auto;
  min-width: 512px;
  height: auto;
  max-height: 72%;
  background-color: var(--black);
  border-radius: 16px !important;
}

.portfolioitem__audio-placeholder {
  outline: 1px solid var(--black);
  outline-offset: -1px;
  border-radius: 16px;
  background-image: url('../../../assets/img/upgrade.png');
  background-size: cover;
  background-position: center;
  filter: blur(12px);
}
</style>