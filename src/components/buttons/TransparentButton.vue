<template>
    <button
      :class="[
        'TransparentButton',
      ]"
      :disabled="state === 'disabled'"
    >
      <span v-if="hasIcon">></span>
      <span v-if="hasLabel && label">{{ label }}</span>
    </button>
  </template>
  
  <script>
export default {
    props: {
        hasIcon: {
            type: Boolean,
            default: true
        },
        hasLabel: {
            type: Boolean,
            default: true
        },
        label: String
    }
};
</script>
  
  <style scoped>
  .TransparentButton {
    font-size: 16px;
    width: 96px;
    height: 40px;
    background-color: transparent;
  }

    /* Transparent button */
    .TransparentButton.button--primary {
    color: var(--blurple);
  }
  
  .TransparentButton.button--secondary {
    color: var(--green);
  }
  
  .TransparentButton.button--tertiary {
    color: var(--black);
  }

  .TransparentButton.button--primary:hover {
  color: var(--blurple-30); 
  background-color: transparent;
  transition: 0.3s;
}

.TransparentButton.button--secondary:hover {
  color: var(--green-30); 
  background-color: transparent;
  transition: 0.3s;
}

.TransparentButton.button--tertiary:hover {
  color: var(--blurple-30); 
  background-color: transparent;
  transition: 0.3s;
}
  
  </style>
  