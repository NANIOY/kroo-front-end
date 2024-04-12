<script setup>

</script>

<template>
    <div class="navbarlogo">
        <a href="http://kroo.site/" target="_blank" class="navbarlogo__container">
            <img src="../../../assets/horizontal-color-dark.webp" alt="Logo" class="navbarlogo__container__logo" />
        </a>
    </div>
</template>

<style scoped>
.navbarlogo {
    background: linear-gradient(to right, rgba(245, 245, 245, 0.3) 30%, rgba(245, 245, 245, 0.1) 100%);
    box-shadow: 0 4px 24px 0 rgba(14, 15, 15, 0.1);
    backdrop-filter: blur(20px);
    height: 88px;
    padding-left: 300px;
    margin-bottom: 48px;
}

.navbarlogo__container {
    display: flex;
    align-items: center;
    height: 100%;
}

.navbarlogo__container__logo {
    width: 180px;
}
</style>