<script>
import { NavArrowDown } from '@iconoir/vue';

export default {
  props: {
    placeholder: {
      type: String,
      default: 'Select an option'
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
      inputId: 'custom-select-' + Math.random().toString(36).substring(2, 15) // generate unique ID for input
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
  <label class="text-reg-" :for="inputId">{{ placeholder }}</label>
  <div class="select">
    <div class="custom-select" @click="toggleDropdown" :class="{ 'open': isOpen }">
      <span>{{ selectedOption || placeholder }}</span>
      <NavArrowDown />
    </div>
    <ul v-if="isOpen" class="dropdown" @click.stop>
      <li v-for="option in options" :key="option" @click="selectOption(option)">
        {{ option }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
.select {
  position: relative;
  width: 392px;
  font-family: var(--font-body);
  color: var(--black);
}

.custom-select {
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

.custom-select:hover, .custom-select.open {
  border-color: var(--blurple);
}

.dropdown {
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
  animation: dropdownAnimation 0.3s ease-out forwards;
}

.custom-select.open+.dropdown {
  display: block;
  animation: dropdownAnimation 0.3s ease-out forwards;
}

.dropdown li {
  display: flex;
  align-items: center;
  height: 40px;
  padding-left: 16px;
  cursor: pointer;
  transition: 0.3s;
}

.dropdown li:hover {
  background-color: var(--neutral-20);
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