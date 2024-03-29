<script>
import { NavArrowDown, NavArrowUp, NavArrowLeft, NavArrowRight, User, HandCard, Bell, Accessibility, Behance, Tiktok, Threads, X, Linkedin, Youtube, Instagram, Facebook, Dribbble, MapPin, AtSign, CheckCircle, MoreHoriz, Xmark, Learning, CinemaOld, DragHandGesture, Attachment, Calendar, Search, Plus, Clock, BadgeCheck, Bookmark } from '@iconoir/vue';

export default {
  props: {
    hasIcon: {
      type: Boolean,
      default: true
    },
    hasLabel: {
      type: Boolean,
      default: true
    },
    label: String,
    iconName: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: 'var(--black)'
    }
  },
  components: {
    NavArrowDown,
    NavArrowUp,
    NavArrowLeft,
    NavArrowRight,
    User,
    HandCard,
    Bell,
    Accessibility,
    Behance,
    Tiktok,
    Threads,
    X,
    Linkedin,
    Youtube,
    Instagram,
    Facebook,
    Dribbble,
    MapPin,
    AtSign,
    CheckCircle,
    MoreHoriz,
    Xmark,
    Learning,
    CinemaOld,
    DragHandGesture,
    Attachment,
    Calendar,
    Search,
    Plus,
    Clock,
    BadgeCheck,
    Bookmark
  }
};
</script>

<template>
  <button :class="[
    'transparentButton',
    { 'no-label': !hasLabel }
  ]" :style="{ color: color }">
    <component :is="iconName" v-if="hasIcon" />
    <span v-if="hasLabel && label" class="transparentButton__label">{{ label }}</span>
  </button>
</template>

<style scoped>
.transparentButton {
  font-size: 16px;
  width: 96px;
  height: 40px;
  background-color: transparent;
}

/* Default styles */
.button--primary--transparent {
  color: var(--blurple);
}

.button--secondary--transparent {
  color: var(--green);
}

.button--tertiary--transparent {
  color: var(--black);
}

/* Pseudo classes */
.button--primary--transparent:hover {
  color: var(--blurple-20);
  background-color: transparent;
  transition: 0.3s;
}

.button--secondary--transparent:hover {
  color: var(--green-20);
  background-color: transparent;
  transition: 0.3s;
}

.button--tertiary--transparent:hover {
  color: var(--blurple-30);
  background-color: transparent;
  transition: 0.3s;
}

.button--disabled--transparent {
  color: var(--neutral-30);

}

.transparentButton.no-label {
  width: 28px;
  height: 28px;
}

.transparentButton__label {
  padding-top: 2px;
}
</style>