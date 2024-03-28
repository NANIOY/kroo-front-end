<script>
import { NavArrowDown } from '@iconoir/vue';

export default {
  props: {
    label: {
      type: String,
      default: 'Select an option'
    },
    placeholder: {
      type: String,
      default: ''
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      isOpen: false,
      selectedOption: '',
      inputId: 'container__dropdown__box-' + Math.random().toString(36).substring(2, 15)
    };
  },
  components: {
    NavArrowDown
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen;
    },
    selectOption(option) {
      this.selectedOption = option;
      this.isOpen = false;
    }
  }
};
</script>

<template>
  <div class="container">
    <label class="text-reg-normal" :for="inputId">{{ label }}</label>
    <div class="container__dropdown text-reg-normal">
      <div class="container__dropdown__box" @click="toggleDropdown" :class="{ 'open': isOpen }">
        <span :class="{ 'text-disabled': !selectedOption }">{{ selectedOption || placeholder }}</span>
        <NavArrowDown :class="{ 'container__dropdown__box__icon': isOpen }" />
      </div>
      <ul v-if="isOpen" class="container__dropdown__items" @click.stop>
        <li v-for="option in options" :key="option" @click="selectOption(option)">
          {{ option }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: inline-block;
}

label {
  display: inline-block;
  margin-bottom: 4px;
}

.container__dropdown {
  position: relative;
  width: 392px;
  color: var(--black);
  user-select: none;
}

.container__dropdown__box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 392px;
  height: 48px;
  padding-left: 12px;
  cursor: pointer;
  background-color: var(--white);
  border: 2px solid var(--black);
  border-radius: 4px;
  transition: border-color 0.3s;
  box-sizing: border-box;
}

.container__dropdown__box:hover,
.container__dropdown__box.open {
  border-color: var(--blurple);
}

.container__dropdown__items {
  position: absolute;
  display: none;
  width: 100%;
  background-color: var(--white);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  list-style-type: none;
  padding: 4px 0 0 0;
  margin-top: 0;
  max-height: 0;
  overflow: hidden;
}

.container__dropdown__box.open+.container__dropdown__items {
  display: block;
  animation: dropdownAnimation 0.2s forwards;
}

.container__dropdown__items li {
  display: flex;
  align-items: center;
  height: 40px;
  padding-left: 16px;
  cursor: pointer;
  transition: 0.3s;
}

.container__dropdown__items li:hover {
  background-color: var(--neutral-20);
}

.container__dropdown__box svg {
  margin-right: 12px !important;
  transition: transform 0.3s ease-in-out;
  transform-origin: center;
}

.container__dropdown__box__icon {
  transform: rotate(180deg);
}

@keyframes dropdownAnimation {
  from {
    max-height: 0;
  }

  to {
    max-height: 200px;
  }
}
</style>