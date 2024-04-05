<script>
import { NavArrowDown, User, Mail, Attachment, Eye, EyeClosed, Search } from '@iconoir/vue';

export default {
  props: {
    label: String,
    hasLabel: {
      type: Boolean,
      default: false
    },
    hasSearch: {
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
    }
  },
  data() {
    return {
      inputType: this.isPassword ? 'password' : 'text'
    };
  },
  computed: {
    inputPaddingLeft() {
      return this.hasSearch ? '44px' : '12px';
    },
    inputPaddingRight() {
      return this.hasIconRight ? '44px' : '12px';
    }
  },
  methods: {
    togglePasswordVisibility() {
      this.inputType = this.inputType === 'password' ? 'text' : 'password';
    }
  },
  components: {
    NavArrowDown, User, Mail, Attachment, Eye, EyeClosed, Search
  }
};
</script>

<template>
  <div class="inputContainer">
    <label v-if="hasLabel">{{ label }}</label>
    <div class="inputContainer__wrapper">
      <span v-if="hasSearch" class="icon icon--left">
        <Search />
      </span>
      <input :type="inputType" :placeholder="placeholder" :class="{ error: isError }"
        :style="{ width: inputWidth, paddingLeft: inputPaddingLeft, paddingRight: inputPaddingRight }" />
      <span v-if="hasIconRight" class="icon icon--right" @click="togglePasswordVisibility">
        <component :is="iconRightName" />
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

.icon--left svg {
  margin-left: 12px;
  stroke-width: 2px;
}

.icon--right {
  right: 12px;
  cursor: pointer;
}
</style>
