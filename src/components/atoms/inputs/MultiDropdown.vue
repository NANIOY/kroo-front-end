<script setup>
import { ref, onMounted, onBeforeUnmount, defineEmits, defineProps } from 'vue';
import { NavArrowDown } from '@iconoir/vue';

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => []
  },
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
  group: String,
  localStorageKey: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['update:modelValue']);

let isOpen = ref(false);
let selectedOptions = ref([...props.modelValue]);
const inputId = 'multidrop__container__box-' + Math.random().toString(36).substring(2, 15);
let dropdownContainer = ref(null);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const selectOption = (option) => {
  const optionIndex = selectedOptions.value.indexOf(option);
  if (optionIndex === -1) {
    selectedOptions.value.push(option);
  } else {
    selectedOptions.value.splice(optionIndex, 1);
  }

  if (props.localStorageKey && props.group) {
    const sectionData = JSON.parse(localStorage.getItem('postData')) || {};
    sectionData[props.group] = sectionData[props.group] || {};
    sectionData[props.group][props.localStorageKey] = selectedOptions.value;
    localStorage.setItem('postData', JSON.stringify(sectionData));
  }

  emit('update:modelValue', [...selectedOptions.value]);
};

const closeDropdownOnClickOutside = (event) => {
  if (dropdownContainer.value && !dropdownContainer.value.contains(event.target)) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', closeDropdownOnClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', closeDropdownOnClickOutside);
});
</script>

<template>
  <div class="multidrop" ref="dropdownContainer">
    <label v-if="hasLabel" class="text-reg-normal" :for="inputId">{{ label }}</label>
    <div class="multidrop__container text-reg-normal">
      <div class="multidrop__container__box" @click="toggleDropdown" :class="{ 'open': isOpen }">
        <span v-if="selectedOptions.length === 0" class="multidrop__container__box__placeholder text-reg-l">{{ placeholder }}</span>
        <span v-else class="multidrop__container__box__selected text-reg-l">
          {{ selectedOptions.join(', ') }}
        </span>
        <NavArrowDown :class="{ 'multidrop__container__box__icon': isOpen }" />
      </div>
      <ul v-if="isOpen" class="multidrop__container__items text-reg-normal" @click.stop>
        <li v-for="option in options" :key="option" @click="selectOption(option)">
          <span :class="{ 'selected': selectedOptions.includes(option) }">{{ option }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.multidrop {
    display: inline-block;
    width: 100%;
}

label {
    display: inline-block;
    margin-bottom: 4px;
}

.multidrop__container {
    position: relative;
    width: 100%;
    color: var(--black);
    user-select: none;
}

.multidrop__container__box {
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

.multidrop__container__box:hover,
.multidrop__container__box.open {
    border-color: var(--blurple);
}

.multidrop__container__items {
    position: absolute;
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

.multidrop__container__box.open+.multidrop__container__items {
    max-height: 200px;
    overflow-y: auto;
    animation: dropdownAnimation 0.2s forwards;
}

.multidrop__container__items li:hover {
    background-color: var(--neutral-20);
}

.multidrop__container__box svg {
    margin-right: 12px !important;
    transition: transform 0.3s ease-in-out;
    transform-origin: center;
}

.multidrop__container__box__icon {
    transform: rotate(180deg);
}

.multidrop__container__items li {
    padding: 0 16px;
    height: 40px;
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: 0.3s;
}

.multidrop__container__box__placeholder {
    color: var(--neutral-30);
}

.multidrop__container__box__selected {
    display: flex;
    flex-wrap: wrap;
    max-width: calc(100% - 40px);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.selected {
    font-weight: bold;
    color: var(--blurple);
}
</style>