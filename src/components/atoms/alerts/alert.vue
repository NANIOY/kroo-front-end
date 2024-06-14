<script setup>
import { defineProps, computed, ref, onMounted } from 'vue';
import {CheckCircle, WarningCircle, HelpCircle, InfoCircle, Xmark } from '@iconoir/vue';

// Define props
const props = defineProps({
  type: {
    type: String,
    default: 'info',
    validator: value => ['good', 'bad', 'warning', 'info'].includes(value)
  },
  label: {
    type: String,
    default: ''
  },
  text: {
    type: String,
    default: ''
  },
  duration: {
    type: Number,
    default: 10000
  }
});

const visible = ref(true);
let timer = null;


const iconToUse = computed(() => {
    switch (props.type) {
      case 'good':
        return CheckCircle;
      case 'bad':
        return WarningCircle;
      case 'warning':
        return HelpCircle;
      case 'info':
        return InfoCircle;
    }
  }
);

const typeClasses = {
  good: 'alert-good',
  bad: 'alert-bad',
  warning: 'alert-warning',
  info: 'alert-info'
};

const close = () => {
  visible.value = false;
  clearTimeout(timer);
};

const onMouseOver = () => {
  clearTimeout(timer);
};

const onMouseLeave = () => {
  timer = setTimeout(() => {
    visible.value = false;
  }, props.duration);
};

const beforeEnter = (el) => {
  el.style.display = 'none';
};

const enter = (el, done) => {
  el.style.display = '';
  el.style.opacity = 0;
  requestAnimationFrame(() => {
    el.style.transition = 'opacity 0.5s';
    el.style.opacity = 1;
    done();
  });
};

const leave = (el, done) => {
  el.style.opacity = 1;
  requestAnimationFrame(() => {
    el.style.transition = 'opacity 0.5s';
    el.style.opacity = 0;
    setTimeout(() => {
      el.style.display = 'none';
      done();
    }, 500); // Match this with your transition duration
  });
};

onMounted(() => {
  timer = setTimeout(() => {
    visible.value = false;
  }, props.duration);
});

</script>

<template>
<transition name="fade" @before-enter="beforeEnter" @enter="enter" @leave="leave">
  <div v-if="visible" :class="['alert', 'radius-xs', typeClasses[type]]" @mouseover="onMouseOver" @mouseleave="onMouseLeave">
    <div>
      <div class="alert__icon__label">
        <div>
          <component :is="iconToUse" />
        </div>
        <div v-if="label" class="label button-l text-white">
          {{ label }}
        </div>
      </div>
    <div v-if="text">
      <p class="alert__text text-disabled text-reg-l">{{ text }}</p>
    </div>
  </div>

    <div class="alert__xmark">
      <Xmark class="close" @click="close"></Xmark>
    </div>

  </div>
</transition>
</template>

<style scoped>
p {
  margin: 0;
}

.alert {
  background-color: var(--neutral-80);
  border-left: 4px solid;
  width: 608px;
  display: flex;
  justify-content: space-between;
  padding: 16px;
  align-items: flex-start;
  transition: opacity 0.5s ease-in-out;
  position: fixed;
  top: 88%;
  left: 64.5%;
  z-index: 10000;
  margin-top: 16px;
}

.alert__icon__label {
  display: flex;
  align-items: center;
  gap: 12px;
}

.label {
  display: inline-flex;
}

.close {
  cursor: pointer;
  margin-left: auto;
  color: var(--neutral-40);
  align-self: flex-start;
}

.alert-good {
  border-left-color: var(--positive);
  color: var(--positive);
}

.alert-bad {
  border-left-color: var(--warning);
  color: var(--warning);
}

.alert-warning {
  border-left-color: var(--notice);
  color: var(--notice)
}

.alert-info {
  border-left-color: var(--info);
  color: var(--info);
}

.alert__text {
  margin-top: 8px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s, display 0.5s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

</style>