<script setup>
import { defineProps } from 'vue';
import { Check } from '@iconoir/vue';

const props = defineProps({
  numberOfCheckboxes: Number,
});
</script>

<template>
  <div class="drop-filter">
    <div v-if="numberOfCheckboxes > 0"> <!-- Display checkboxes -->
      <label v-for="(checkbox, index) in numberOfCheckboxes" :key="index" class="checkbox">
        <input type="checkbox">
        <Check class="checkmark" />
        <span class="checkbox-label">Checkbox {{ index + 1 }}</span>
      </label>
    </div>
  </div>
</template>

<style scoped>
.checkbox {
  display: flex;
  align-items: center;
  position: relative;
  padding-left: 31px;
  margin-right: 8px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 16px;
}

.checkbox input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 20px;
  width: 20px;
  border: 2px solid var(--black);
  border-radius: 3px;
  color: transparent;
  transition: background-color 0.3s;
  stroke-width: 2;
  vertical-align: middle;
}

.checkbox-label {
  display: inline-block;
  vertical-align: middle;
  margin-top: 3px;
}

.checkbox:hover .checkmark {
  border-color: var(--blurple-20);
}

.checkbox:hover .checkbox-label {
  color: var(--blurple-20);
}

.checkbox input:checked~.checkmark {
  background-color: var(--blurple);
  border-color: transparent;
  color: var(--white);
}

.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

.checkbox input:checked~.checkmark:after {
  display: block;
}

.checkbox .checkmark:after {
  left: 6px;
  top: 2px;
  width: 5px;
  height: 10px;
  border: solid var(--white);
  border-width: 0 2px 2px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
</style>
