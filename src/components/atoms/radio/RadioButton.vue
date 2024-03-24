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
    <div>
        <label :class="{ 'container': true, 'disabled': isDisabled }">
            <input type="radio" :disabled="isDisabled">
            <span v-if="hasLabel" class="checkbox-label">{{ label }}</span>
        </label>
    </div>
</template>

<style scoped>
</style>