<script setup>
import { ref, onMounted, onUnmounted, defineEmits, defineProps } from 'vue';
import { NavArrowDown } from '@iconoir/vue';

const props = defineProps({
  modelValue: String,
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
  group: String,
  showDatepicker: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['update:modelValue']);

const isOpen = ref(false);
const selectedOption = ref(props.modelValue || props.placeholder);
const isDatepickerOpen = ref(false);
const selectedDate = ref(new Date().toISOString().split('T')[0]); // Default to today's date in YYYY-MM-DD format
const inputId = 'container__dropdown__box-' + Math.random().toString(36).substring(2, 15);
let dropdownContainer = ref(null);
const optionSelected = ref(false);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
  if (!isOpen.value) {
    isDatepickerOpen.value = false;
  }
};

const toggleDatepicker = () => {
  isDatepickerOpen.value = !isDatepickerOpen.value;
};

const selectOption = (option) => {
  selectedOption.value = option;
  isOpen.value = false;
  isDatepickerOpen.value = false;
  optionSelected.value = true;

  if (props.localStorageKey && props.group) {
    const sectionData = JSON.parse(localStorage.getItem('postData')) || {};
    sectionData[props.group] = sectionData[props.group] || {};
    sectionData[props.group][props.localStorageKey] = option;
    localStorage.setItem('postData', JSON.stringify(sectionData));
  }

  emit('update:modelValue', option);
};

const selectDate = (event) => {
  selectedDate.value = event.target.value;
  selectedOption.value = selectedDate.value;
  isDatepickerOpen.value = false;
  isOpen.value = false;
  optionSelected.value = true;
  emit('update:modelValue', selectedDate.value);
};

const closeDropdownOnClickOutside = (event) => {
  if (dropdownContainer.value && !dropdownContainer.value.contains(event.target)) {
    isOpen.value = false;
    isDatepickerOpen.value = false;
  }
};

onMounted(() => {
  dropdownContainer.value = document.querySelector('.container');
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
        <li v-if="props.showDatepicker" @click="toggleDatepicker">Pick a date</li>
        <li v-if="isDatepickerOpen" class="container__datepicker">
          <input type="date" v-model="selectedDate" @change="selectDate" />
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
  width: 100%;
  background-color: var(--white);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  list-style-type: none;
  padding: 4px 0;
  margin-top: 0;
  max-height: 200px;
  overflow-y: auto;
  z-index: 990;
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

.container__datepicker {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  background-color: var(--white);
}
</style>