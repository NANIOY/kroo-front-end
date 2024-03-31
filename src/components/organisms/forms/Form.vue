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

        <div class="form__inputFields">
            <InputField v-for="(field, index) in inputFields" :key="index" :label="field.label"
                :hasLabel="field.hasLabel" :iconLeftName="field.iconLeftName" :hasIconLeft="field.hasIconLeft"
                :iconRightName="field.iconRightName" :hasIconRight="field.hasIconRight" :placeholder="field.placeholder"
                :isError="field.isError" :isPassword="field.isPassword" />
        </div>

        <DropDown class="form__dropdown" v-if="dropdown" :label="dropdown.label" :placeholder="dropdown.placeholder"
            :items="dropdown.items" />

        <Checkbox class="form__checkbox" v-if="checkbox" :label="checkbox.label" />

        <LargeButton class="form__button button--primary" :label="buttonLabel" />
    </div>
</template>

<style scoped>
.form {
    display: flex;
    flex-direction: column;
    width: 536px;
}

.form__button,
.form__dropdown,
.form__inputFields {
    width: 100%;
}
</style>