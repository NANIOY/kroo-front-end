<template>
  <button :class="[
    'transparentButton',
    { 'no-label': !hasLabel }
  ]">
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
.transparentButton {
  font-size: 16px;
  width: 96px;
  height: 40px;
  background-color: transparent;
}

/* Default styles */
.button--primary--transparent {
  color: var(--blurple);
}

.button--secondary--transparent {
  color: var(--green);
}

.button--tertiary--transparent {
  color: var(--black);
}

/* Pseudo classes */
.button--primary--transparent:hover {
  color: var(--blurple-20);
  background-color: transparent;
  transition: 0.3s;
}

.button--secondary--transparent:hover {
  color: var(--green-20);
  background-color: transparent;
  transition: 0.3s;
}

.button--tertiary--transparent:hover {
  color: var(--blurple-30);
  background-color: transparent;
  transition: 0.3s;
}

.button--disabled--transparent {
  color: var(--neutral-30);

}

.transparentButton.no-label {
  width: 28px;
  height: 28px;
}
</style>