<script setup>
import { ref, onMounted, onUnmounted, defineEmits } from 'vue';
import { NavArrowDown } from '@iconoir/vue';

const props = defineProps({
  hasLabel: {
    type: Boolean,
    default: false
  },
  label: {
    type: String,
    default: 'Select an option'
  },
  placeholder: {
    type: String,
    default: 'Select an option'
  },
  options: {
    type: Array,
    default: () => []
  },
  localStorageKey: {
    type: String,
    default: ''
  },
});

const isOpen = ref(false);
const selectedOption = ref(props.placeholder);
const inputId = 'container__dropdown__box-' + Math.random().toString(36).substring(2, 15);
let dropdownContainer = null;
const optionSelected = ref(false);

const emit = defineEmits(['optionSelected']);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const selectOption = (option) => {
  console.log('Selected option:', option);
  selectedOption.value = option;
  isOpen.value = false;
  optionSelected.value = true;

  emit('optionSelected', option);
};

const closeDropdownOnClickOutside = (event) => {
  if (dropdownContainer && !dropdownContainer.contains(event.target)) {
    isOpen.value = false;
  }
};

onMounted(() => {
  dropdownContainer = document.querySelector('.container');
  document.addEventListener('click', closeDropdownOnClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', closeDropdownOnClickOutside);
});
</script>

<template>
  <div class="container" ref="dropdownContainer">
    <label v-if="props.hasLabel" class="text-reg-normal" :for="inputId">{{ props.label }}</label>
    <div class="container__dropdown text-reg-normal">
      <div class="container__dropdown__box" @click="toggleDropdown" :class="{ 'open': isOpen }">
        <span :class="['placeholder', { 'placeholder-black': optionSelected }]">{{ selectedOption }}</span>
        <NavArrowDown :class="{ 'container__dropdown__box__icon': isOpen }" />
      </div>
      <ul v-if="isOpen" class="container__dropdown__items" @click.stop>
        <li v-if="props.options.length === 0" class="placeholder">{{ props.placeholder }}</li>
        <li v-else v-for="option in props.options" :key="option" @click="selectOption(option)">
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
  width: 100%;
  color: var(--black);
  user-select: none;
}

.container__dropdown__box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
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
  cursor: pointer;
  z-index: 990;
  transition: 0.3s;
}

.container__dropdown__box.open+.container__dropdown__items {
  display: block;
  overflow-y: auto;
  animation: dropdownAnimation 0.2s forwards;
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

.container__dropdown__items li {
  padding: 0 16px;
  height: 40px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: 0.3s;
  font-family: var(--font-body);
}

.placeholder,
.placeholder-black {
  font-family: var(--font-body);
  font-size: 20px;
}

.placeholder {
  color: var(--neutral-30);
}

.placeholder-black {
  color: var(--black);
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