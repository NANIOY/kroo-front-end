<script setup>
import { defineProps, computed } from 'vue';
import * as iconoirIcons from '@iconoir/vue';

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
  icon: {
    type: String,
    default: ''
  }
});

// Compute the height of the alert based on whether it has text or not
const alertHeight = computed(() => props.text ? 'auto' : '48px');

// Define icon based on props or type
const iconToUse = computed(() => {
  if (props.icon) {
    return props.icon;
  } else {
    switch (props.type) {
      case 'good':
        return iconoirIcons.CheckCircle;
      case 'bad':
        return iconoirIcons.WarningCircle;
      case 'warning':
        return iconoirIcons.WarningCircle;
      case 'info':
        return iconoirIcons.HelpCircle;
      default:
        return iconoirIcons.HelpCircle;
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
  <div v-if="props" :class="['alert', typeClasses[props.type], { 'has-text': props.text }]" :style="{ height: alertHeight }">
    <div class="icon-label-wrapper">
      <span class="icon">
        <component :is="iconToUse" />
      </span>
      <span v-if="props.label" class="label">{{ props.label }}</span>
      <span class="close" @click="close">&times;</span>
    </div>
    <div class="content">
      <div class="text-content" v-if="props.text">{{ props.text }}</div>
    </div>
  </div>
</template>

<style scoped>
.alert {
  padding: 16px;
  padding-left: 24px; 
  margin: 1em 0;
  border-radius: 4px;
  display: flex;
  align-items: center; 
  background-color: var(--color-text-text-secondary, #333);
  border-left: 4px solid var(--color-semantic-semantic-error, #F24646);
  width: 608px;
  position: relative;
  box-sizing: border-box;
  flex-direction: column;
  text-align: left;
}

.icon-label-wrapper {
  display: flex;
  align-items: center;
  gap: 12px; 
  width: 100%;
}

.icon {
  margin-right: 0.5em;
  display: flex;
  align-items: center;
  padding-left: 0.2em;
}

.label {
  color: var(--white);
  font-family: var(--font-button);
  display: inline-flex;
  align-items: center;
}

.content {
  padding-left: 0.3em;
  width: 100%;
  font-family: var(--font-body);
}

.close {
  cursor: pointer;
  font-size: 1.2em;
  margin-left: auto;
  color: var(--neutral-40);
  align-self: flex-start;
}

.alert-good {
  border-left-color: var(--positive, #28a745);
  color: var(--positive, #28a745);
}

.alert-bad {
  border-left-color: var(--warning, #dc3545);
  color: var(--warning, #dc3545);
}

.alert-warning {
  border-left-color: var(--notice, #ffc107);
  color: var(--notice, #ffc107);
}

.alert-info {
  border-left-color: var(--info, #17a2b8);
  color: var(--info, #17a2b8);
}

.text-content {
  color: var(--neutral-40);
  margin-top: 0;
  margin-bottom: 16px;

  /* Your specified styles */
  width: 525px;
  color: var(--color-button-text-button-text-disabled, #BCBCBC);
  leading-trim: both;
  text-edge: cap;

  /* Body/Regular-Capped/Large */
  font-family: Orkney;
  font-size: 20px;
  font-style: normal;
  font-weight: 300;
  line-height: 140%; /* 28px */
}

/* Styles for when the alert has text */
.has-text {
  align-items: flex-start; 
}

.has-text .icon-label-wrapper {
  flex-direction: column;
  align-items: flex-start; /* Align items to the left */
  justify-content: flex-start; /* Override center alignment */
}

.has-text .icon, .has-text .label, .has-text .close {
  margin-bottom: 0.5em;
}

.has-text .close {
  align-self: flex-end; /* Align close button to the right */
}
</style>