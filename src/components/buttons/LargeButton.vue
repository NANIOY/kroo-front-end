<template>
    <button :class="[
        'largeButton',
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
.largeButton {
    font-size: 20px;
    width: 160px;
    height: 48px;
}

.largeButton.no-label {
  width: 28px;
  height: 28px;
}
</style>