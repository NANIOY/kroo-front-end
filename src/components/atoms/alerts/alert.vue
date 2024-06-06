<script setup>
import { defineProps, computed } from 'vue';
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
  }
});

// Compute the height of the alert based on whether it has text or not
const alertHeight = computed(() => props.text ? 'auto' : '48px');

const iconToUse = computed(() => {
  if (props.icon) {
    return props.icon;
  } else {
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
});

const typeClasses = {
  good: 'alert-good',
  bad: 'alert-bad',
  warning: 'alert-warning',
  info: 'alert-info'
};

// Method to handle closing the alert
const close = () => {
  // You can define your close logic here
};
</script>

<template>
    <!-- <div class="content"> -->
      <!-- <div class="text-content text-reg-l" v-if="props.text">{{ props.text }}</div> -->

  <div v-if="props" :class="['alert', 'radius-xs', typeClasses[props.type], { 'has-text': props.text }]" :style="{ height: alertHeight }">
    
    <div class="alert__icon__label">
      <div>
        <component :is="iconToUse" />
      </div>
      <div v-if="props.label" class="label button-l text-white">
        {{ props.label }}
      </div>
    </div>

    <div class="alert__xmark">
      <Xmark class="close" @click="close"></Xmark>
    </div>

  </div>
</template>

<style scoped>
.alert {
  background-color: var(--color-text-text-secondary, #333);
  border-left: 4px solid;
  width: 608px;
  display: flex;
  justify-content: space-between;
  padding: 16px;
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
  font-size: 1.2em;
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

.text-content {
  color: var(--neutral-40);
}

</style>