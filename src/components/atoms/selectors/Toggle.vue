<script setup>

</script>

<template>
    <label class="switch" :class="{ 'disabled': isDisabled }">
        <input type="checkbox" :disabled="isDisabled">
        <span class="slider round"></span>
    </label>
</template>

<style scoped>
.switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
}

.switch input {
    opacity: 0;
    width: 0;
    height: 0;
}

.slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: transparent;
    border: var(--black) solid 2px;
    -webkit-transition: 0.3s;
    transition: 0.3s;
}

.slider:hover {
    opacity: 0.8;
    transition: 0.3s;
    border: var(--blurple) solid 2px;
}

.slider:before:hover {
    opacity: 0.8;
    transition: 0.3s;
    background-color: var(--blurple);
}

.slider:not(:hover),
.slider:before:not(:hover) {
    transition: 0.3s;
}

.slider:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 2px;
    background-color: var(--black);
    -webkit-transition: 0.3s;
    transition: 0.3s;
}

input:checked+.slider {
    background-color: var(--blurple);
    border: var(--blurple) solid 2px;
}

input:checked+.slider:before {
    -webkit-transform: translateX(22px);
    -ms-transform: translateX(22px);
    transform: translateX(22px);
    background-color: var(--white);
}

.slider.round {
    border-radius: 34px;
}

.slider.round:before {
    border-radius: 50%;
}

.slider:hover:before {
    opacity: 0.8;
    background-color: var(--blurple);
}
</style>