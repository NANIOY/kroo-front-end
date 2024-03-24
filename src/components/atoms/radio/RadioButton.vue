<script>
export default {
    props: {
        hasLabel: {
            type: Boolean,
            default: true
        },
        label: {
            type: String,
            default: ''
        },
        isDisabled: {
            type: Boolean,
            default: false
        }
    }
}

</script>

<template>
    <label class="radio-button" :class="{ 'disabled': isDisabled }">
      <input type="radio" :disabled="isDisabled">
      <span class="radio-checkmark"></span>
      <span v-if="hasLabel" class="radio-label">{{ label }}</span>
    </label>

</template>

<style scoped>

.radio-button {
  display: flex;
  align-items: center;
  cursor: pointer;
}
.radio-button:hover, .radio-checkmark:hover {
    color: var(--blurple);
    opacity: 0.8;
    transition: 0.5s;
}

.radio-button:not(:hover), .radio-checkmark:not(:hover) {
    transition: 0.5s;
}

.radio-checkmark:hover {
    border: 2px solid var(--blurple);
    opacity: 0.8;
} 

.radio-button:hover .radio-checkmark,
.radio-button:hover .radio-checkmark:before {
    border-color: var(--blurple); 
    color: var(--blurple);
    opacity: 0.8;
    transition: 0.5s;
}

.radio-checkmark:hover {
    border-color: var(--blurple); 
    opacity: 0.8;
    transition: 0.5s;
}

.radio-button:hover .radio-checkmark:before {
    background-color: var(--blurple); 
    
}

.radio-button input[type="radio"] {
  display: none;
}

.radio-checkmark {
  display: inline-block;
  position: relative;
  width: 16px;
  height: 16px;
  margin-right: 8px;
  border: 2px solid var(--black);
  border-radius: 50%;
}

.radio-button input[type="radio"]:checked ~ .radio-checkmark {
  border: 2px solid var(--blurple);
}

.radio-checkmark:before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0);
  width: 8px;
  height: 8px;
  border-radius: 100%;
  background-color: var(--blurple);
  transition: all 0.2s ease-in-out;
}

.radio-button input[type="radio"]:checked ~ .radio-checkmark:before {
  transform: translate(-50%, -50%) scale(1);
  border: 2px solid var(--blurple);
  
}

.radio-label {
  margin-top: 4px;
}

</style>