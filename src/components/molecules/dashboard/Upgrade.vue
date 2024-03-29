<script setup>
import NormalButton from '../../atoms/buttons/NormalButton.vue';
</script>

<template>
    <div class="upgrade">
        <div class="upgrade__bg">
        </div>
        <div class="upgrade__content">
            <div class="upgrade__content__text">
                <h4>Upgrade to Pro</h4>
                <p>Unlock new way to make your profile shine!</p>
            </div>
            <NormalButton text="Upgrade" />
        </div>
    </div>
</template>

<style scoped>
.upgrade {
    width: 496px;
    height: 200px;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
}

.upgrade__bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url('../../../assets/img/upgrade.png');
    background-size: cover;
}

.upgrade__content, .upgrade__content__text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.upgrade__content {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(20px);
    color: var(--white);
    gap: 16px;
}

.upgrade__content__text {
    gap: 8px;
}

h4,
p {
    margin: 0;
}
</style>