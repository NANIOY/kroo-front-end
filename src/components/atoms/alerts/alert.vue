<script setup>
import { defineProps, computed } from 'vue';

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

const typeClasses = {
  good: 'alert-good',
  bad: 'alert-bad',
  warning: 'alert-warning',
  info: 'alert-info'
};

const typeIcons = {
  good: '✔️',
  bad: '❌',
  warning: '⚠️',
  info: 'ℹ️'
};

// Compute the icon to use, prioritizing the custom icon if provided
const iconToUse = computed(() => props.icon || typeIcons[props.type]);
</script>

<template>
  <div :class="['alert', typeClasses[props.type]]">
    <span class="icon">{{ iconToUse }}</span>
    <div class="content">
      <strong v-if="props.label">{{ props.label }}</strong>
      <p v-if="props.text">{{ props.text }}</p>
    </div>
  </div>
</template>

<style scoped>
.alert {
  padding: 1em;
  margin: 1em 0;
  border-radius: 4px;
  display: flex;
  align-items: center;
}

.icon {
  margin-right: 1em;
  font-size: 1.5em;
}

.content {
  flex-grow: 1;
}

.alert-good {
  background-color: #d4edda;
  color: #155724;
}

.alert-bad {
  background-color: #f8d7da;
  color: #721c24;
}

.alert-warning {
  background-color: #fff3cd;
  color: #856404;
}

.alert-info {
  background-color: #d1ecf1;
  color: #0c5460;
}
</style>
