<script setup>
import FormHeader from '../../molecules/login/FormHeader.vue';
import InputField from '../../atoms/inputs/InputField.vue';
import DropDown from '../../atoms/inputs/DropDown.vue';
import Checkbox from '../../atoms/selectors/Checkbox.vue';
import LargeButton from '../../atoms/buttons/LargeButton.vue';

const props = defineProps({
    hasBack: Boolean,
    hasText: Boolean,
    hasSteps: Boolean,
    hasSkip: Boolean,
    header: String,
    steps: String,
    text: String,

    inputFields: {
        type: Array,
        default: () => []
    },

    dropdown: Object,
    checkbox: Object,
    buttonLabel: String
});
</script>

<template>
    <div class="form">
        <FormHeader :hasBack="hasBack" :hasText="hasText" :hasSteps="hasSteps" :hasSkip="hasSkip" :header="header"
            :steps="steps" :text="text" />

        <div class="form__inputs">
            <InputField v-for="(field, index) in inputFields" :key="index" :label="field.label"
                :hasLabel="field.hasLabel" :iconLeftName="field.iconLeftName" :hasIconLeft="field.hasIconLeft"
                :iconRightName="field.iconRightName" :hasIconRight="field.hasIconRight" :placeholder="field.placeholder"
                :isError="field.isError" :isPassword="field.isPassword" class="form__inputs__field" />
            <DropDown v-if="dropdown" :label="dropdown.label" :placeholder="dropdown.placeholder"
                :items="dropdown.items" class="form__inputs__dropdown" />
            <Checkbox v-if="checkbox" :label="checkbox.label" size="small" class="form__checkbox" />
        </div>

        <LargeButton :label="buttonLabel" class="form__button button--primary" />
    </div>
</template>

<style scoped>
/* GENERAL */
.form {
    display: flex;
    flex-direction: column;
    width: 536px;
    gap: 32px
}

.form__inputs,
.form__inputs__field,
.form__inputs__dropdown,
.form__button {
    width: 100%;
}

/* INPUTS */
.form__inputs {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

/* CHECKBOX */
.form__checkbox {}
</style>