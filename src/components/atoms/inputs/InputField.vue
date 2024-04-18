<script setup>
import { ref, computed, defineProps } from 'vue';
import { NavArrowDown, User, Search, Mail, Attachment, Eye, EyeClosed } from '@iconoir/vue';

const props = defineProps({
  label: String,
  hasLabel: {
    type: Boolean,
    default: false
  },
  iconLeftName: String,
  hasIconLeft: {
    type: Boolean,
    default: false
  },
  iconRightName: String,
  hasIconRight: {
    type: Boolean,
    default: false
  },
  placeholder: {
    type: String,
    default: ''
  },
  isError: {
    type: Boolean,
    default: false
  },
  isPassword: {
    type: Boolean,
    default: false
  },
  inputWidth: {
    type: String,
    default: '100%'
  },
  localStorageKey: String,
  group: String
});

const inputType = ref(props.isPassword ? 'password' : 'text');

const inputPaddingLeft = computed(() => props.hasIconLeft ? '44px' : '12px');
const inputPaddingRight = computed(() => props.hasIconRight ? '44px' : '12px');

const togglePasswordVisibility = () => {
  inputType.value = inputType.value === 'password' ? 'text' : 'password';
};

const iconComponents = {
  NavArrowDown,
  User,
  Search,
  Mail,
  Attachment,
  Eye,
  EyeClosed
};

const getIconComponent = (name) => {
  return iconComponents[name];
};
</script>

<template>
  <div class="inputContainer">
    <label v-if="props.hasLabel">{{ props.label }}</label>
    <div class="inputContainer__wrapper">
      <span v-if="props.hasIconLeft" class="icon icon--left">
        <component :is="getIconComponent(props.iconLeftName)" />
      </span>
      <input :type="inputType" :placeholder="props.placeholder" :class="{ error: props.isError }"
        :style="{ width: props.inputWidth, paddingLeft: inputPaddingLeft, paddingRight: inputPaddingRight }" />
      <span v-if="props.hasIconRight" class="icon icon--right" @click="togglePasswordVisibility">
        <component :is="getIconComponent(props.iconRightName)" />
      </span>
    </div>
  </div>
</template>

<style scoped>
.inputContainer {
  display: flex;
  flex-direction: column;
}

.inputContainer__wrapper {
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
}

label {
  margin-bottom: 4px;
  font-size: 16px;
  text-transform: capitalize;
}

.inputContainer__wrapper input {
  box-sizing: border-box;
  padding-top: 2px;
  font-size: 20px;
  height: 48px;
  border: 2px solid var(--black);
  background-color: transparent;
  border-radius: 4px;
  transition: border-color 0.3s ease;
}

.inputContainer__wrapper input:focus {
  border-color: var(--blurple-50);
  outline: none;
}

input.error {
  border-color: var(--warning);
}

input::placeholder {
  color: var(--neutral-30);
}

.icon {
  position: absolute;
  display: flex;
}

.icon--left {
  left: 12px;
}

.icon--right {
  right: 12px;
  cursor: pointer;
}
</style>