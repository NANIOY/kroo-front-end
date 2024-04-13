<script>
import { NavArrowDown, NavArrowUp, NavArrowLeft, NavArrowRight, User, HandCard, Bell, Accessibility, Behance, Tiktok, Threads, X, Linkedin, Youtube, Instagram, Facebook, Dribbble, MapPin, AtSign, CheckCircle, MoreHoriz, Xmark, Learning, CinemaOld, DragHandGesture, Attachment, Calendar, Search, Plus, Clock, BadgeCheck, Bookmark } from '@iconoir/vue';
import { useRouter } from 'vue-router';
import setupAxios from '../../../setupAxios.js'

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
    iconPosition: {
      type: String,
      default: 'left'
    },
    color: {
      type: String,
      default: 'var(--black)'
    },
    method: {
      type: String,
      default: 'POST'
    },
    endpoint: {
      type: String,
      required: true
    },
    postData: {
      type: Object,
      required: true
    },
    redirect: {
      type: String
    }
  },
  setup(props) {
    const router = useRouter();
    const axiosInstance = setupAxios(router);

    const handleClick = async () => {
      if (props.hasRequest) {
        try {
          const response = await axiosInstance[props.method.toLowerCase()](props.endpoint, props.postData);
          console.log('Response:', response);


        } catch (error) {
          console.error('Error making POST request:', error);
        }
      }
      if (props.redirect) {
        router.push(props.redirect);
      }
    };

    return {
      handleClick
    };
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
  ]" @click="handleClick" :style="{ color: color }">
    <component :is="iconName" v-if="hasIcon && iconPosition === 'left'" />
    <span v-if="hasLabel && label" class="transparentButton__label">{{ label }}</span>
    <component :is="iconName" v-if="hasIcon && iconPosition === 'right'" />
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
