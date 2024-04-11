<script setup>
import FormHeader from '../../molecules/login/FormHeader.vue';
import InputField from '../../atoms/inputs/InputField.vue';
import DropDown from '../../atoms/inputs/DropDown.vue';
import Checkbox from '../../atoms/selectors/Checkbox.vue';
import LargeButton from '../../atoms/buttons/LargeButton.vue';
import NormalButton from '../../atoms/buttons/NormalButton.vue';
import { defineProps, ref, computed } from 'vue';

const props = defineProps({
    hasSelectors: Boolean,
    hasBack: Boolean,
    hasText: Boolean,
    hasSteps: Boolean,
    hasSkip: Boolean,
    header: String,
    steps: String,
    text: String,
    noteText: String,
    noteLink: String,
    forgotPassword: Boolean,
    endpoint: String,

    inputFields: {
        type: Array,
        default: () => []
    },

    dropdown: Object,
    checkbox: Object,
    buttonLabel: String,
    rememberMe: Boolean,
    redirect: String,
    selectedRole: String
});

const postData = ref({});
const rememberMe = ref(false);

const updatePostData = (field, value) => {
    console.log('Updating postData:', field, value);
    postData.value[field] = value;
    console.log('Updated postData:', postData.value);
};

const handleButtonSelect = (role) => {
    updatePostData('role', role);
};

const handleRememberMeChange = (value) => {
    updatePostData('rememberMe', value);
};
</script>

<template>
    <div class="form">
        <FormHeader :hasBack="hasBack" :hasText="hasText" :hasSteps="hasSteps" :hasSkip="hasSkip" :header="header"
            :steps="steps" :text="text" />

        <div class="form__selectors" v-if="hasSelectors">
            <NormalButton label="crew" class="form__selectors__button button--tertiary"
                :class="{ 'button--active': selectedRole === 'crew' }" @click="handleButtonSelect('crew')" />
            <NormalButton label="business" class="form__selectors__button button--tertiary"
                :class="{ 'button--active': selectedRole === 'business' }" @click="handleButtonSelect('business')" />
        </div>

        <div class="form__inputs">
            <InputField v-for="(field, index) in inputFields" :key="index" :label="field.label"
                :hasLabel="field.hasLabel" :iconLeftName="field.iconLeftName" :hasIconLeft="field.hasIconLeft"
                :iconRightName="field.iconRightName" :hasIconRight="field.hasIconRight" :placeholder="field.placeholder"
                :isError="field.isError" :isPassword="field.isPassword" class="form__inputs__field"
                @input="updatePostData(field.label, $event.target.value)" />
            <DropDown v-if="dropdown" :label="dropdown.label" :placeholder="dropdown.placeholder"
                :items="dropdown.items" class="form__inputs__dropdown" />
            <div v-if="checkbox" class="form__inputs__bot">
                <Checkbox v-if="checkbox" :label="checkbox.label" size="small" class="form__checkbox"
                    :checked="rememberMe" @change="handleRememberMeChange" />
                <router-link v-if="forgotPassword" :to="'/forgot-password'"
                    class="form__inputs__bot__forgot button-normal">Forgot password?</router-link>
            </div>
        </div>

        <div class="form__buttons">
            <LargeButton :label="buttonLabel" :endpoint="endpoint" :postData="postData" :redirect="redirect"
                class="form__buttons__button button--primary" />

            <div class="form__buttons__note">
                <p class="button-normal" v-if="!noteLink">{{ noteText }}</p>
                <router-link class="button-normal form__buttons__note__link" v-else :to="noteLink">{{ noteText
                    }}</router-link>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* GENERAL */
.form {
    display: flex;
    flex-direction: column;
    width: 536px;
    gap: 28px;
    color: var(--black);
}

.form__inputs,
.form__inputs__field,
.form__inputs__dropdown,
.form__buttons,
.form__buttons__button,
.form__buttons__note,
.form__selectors__button {
    width: 100%;
}

/* SELECTORS */
.form__selectors {
    display: flex;
    gap: 32px;
    justify-content: space-between;
}

.button--active {
    background-color: var(--blurple);
    color: var(--white);
}

/* INPUTS */
.form__inputs {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

/* INPUTS BOTTOM */
.form__inputs__bot {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.form__inputs__bot__forgot {
    color: inherit;
    margin-top: 2px;
}

/* BUTTONS */
.form__buttons {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.form__buttons__note .form__buttons__note__link {
    text-decoration: none;
    color: inherit;
}
</style>