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
</style>