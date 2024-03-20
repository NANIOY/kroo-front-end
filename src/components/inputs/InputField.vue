<template>
  <div class="inputContainer">
    <label v-if="hasLabel">{{ label }}</label>
    <div class="inputContainer__wrapper">
      <span v-if="hasIconLeft" class="icon icon--left">
        <component :is="iconLeftName" />
      </span>
      <input :type="inputType" :placeholder="placeholder" :class="{ error: isError }" />
      <span v-if="hasIconRight" class="icon icon--right" @click="togglePasswordVisibility">
        <component :is="iconRightName" />
      </span>
    </div>
  </div>
</template>

<script>
import { NavArrowDown, User, Search, Mail, Attachment, Eye, EyeClosed } from '@iconoir/vue';

export default {
  props: {
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
    }
  },
  data() {
    return {
      inputType: this.isPassword ? 'password' : 'text'
    };
  },
  components: {
    NavArrowDown, User, Search, Mail, Attachment, Eye, EyeClosed
  },
  methods: {
    togglePasswordVisibility() {
      this.inputType = this.inputType === 'password' ? 'text' : 'password';
    }
  }
};
</script>

<style scoped>
.inputContainer {
  display: flex;
  flex-direction: column;
}

.inputContainer__wrapper {
  display: flex;
  align-items: center;
  position: relative;
  width: fit-content;
}

label {
  margin-bottom: 4px;
}

.inputContainer__wrapper input {
  font-size: 20px;
  padding: 12px 12px;
  border: 2px solid var(--black);
  background-color: transparent;
  border-radius: 4px;
  padding-left: 44px;
  padding-right: 44px;
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
}

.icon--left {
  left: 12px;
}

.icon--right {
  right: 12px;
}
</style>