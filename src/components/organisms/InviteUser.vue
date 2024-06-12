<script setup>
import NormalButton from '../atoms/buttons/NormalButton.vue';
import InputField from '../atoms/inputs/InputField.vue';

</script>

<template>
    <div class="invite__container radius-s">
        <div class="invite__container__header">
            <h4>Invite new members</h4> 
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dicta quasi aspernatur deleniti natus nobis minus quos expedita repudiandae beatae ea, odio perspiciatis esse similique error rerum unde eveniet quia fuga?</p>
        </div>
        <div class="invite__container__inputs">
                <InputField class="invite__field" :hasIconLeft=true iconLeftName="Mail" placeholder="Email" />
                <NormalButton class="button--primary invite__button" :hasIcon=true iconName="ShareAndroid" label="Send invite"></NormalButton>
        </div>
    </div>
</template>

<style scoped>

.invite__container {
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 600px;
    border: 2px solid var(--black);
}

.invite__container__inputs {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 16px;
    width: 100%;
}

.invite__button {
    height: 48px !important;
    width: 200px;
}

.invite__field {
    width: 100%;
    border-radius: 8px;
}

</style>