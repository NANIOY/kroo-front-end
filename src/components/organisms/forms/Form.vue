<script setup>
import FormHeader from '../../molecules/login/FormHeader.vue';
import InputField from '../../atoms/inputs/InputField.vue';
import DropDown from '../../atoms/inputs/DropDown.vue';
import Slider from '../../atoms/inputs/Slider.vue';
import Checkbox from '../../atoms/selectors/Checkbox.vue';
import LargeButton from '../../atoms/buttons/LargeButton.vue';
</script>

<template>
    <FormHeader :hasBack="true" :hasText="true" :hasSteps="true" :hasSkip="true" header="Header"
        steps="Step 1: Step name" text="Text content" />


</template>

<style scoped></style>