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


</script>

<template>

  <div v-if="props" :class="['alert', 'radius-xs', typeClasses[props.type]]">
    <div>
      <div class="alert__icon__label">
        <div>
          <component :is="iconToUse" />
        </div>
        <div v-if="props.label" class="label button-l text-white">
          {{ props.label }}
        </div>
      </div>
    <div v-if="props.text">
      <p class="alert__text text-disabled text-reg-l">{{ props.text }}</p>
    </div>
  </div>

    <div class="alert__xmark">
      <Xmark class="close" @click="close"></Xmark>
    </div>

  </div>
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

</style>