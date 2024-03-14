<template>
    <button :class="[
        'NormalButton',
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
.NormalButton {
    font-size: 16px;
    width: 160px;
    height: 40px;
}
</style>