<script setup>
import { ref, defineProps, defineEmits } from 'vue';
import FormHeader from '../../molecules/login/FormHeader.vue';

// INPUTS
import InputField from '../../atoms/inputs/InputField.vue';
import InputCombo from '../../atoms/inputs/InputCombo.vue';
import DropDown from '../../atoms/inputs/DropDown.vue';
import MultiDropdown from '../../atoms/inputs/MultiDropdown.vue';
import InputPortfolio from '../../atoms/inputs/InputPortfolio.vue';
import ImageUploadButton from '../../atoms/inputs/ImageUploadButton.vue';
import UploadFile from '../../atoms/inputs/UploadFile.vue';
import Slider from '../../atoms/inputs/Slider.vue';
import InputUrl from '../../atoms/inputs/InputUrl.vue';
import SocialInput from '../../atoms/inputs/SocialInput.vue';
import Checkbox from '../../atoms/selectors/Checkbox.vue';

// BUTTONS
import LargeButton from '../../atoms/buttons/LargeButton.vue';
import NormalButton from '../../atoms/buttons/NormalButton.vue';
import AuthButton from '../../atoms/buttons/AuthButton.vue';

const props = defineProps({
    hasSelectors: Boolean,
    hasBack: Boolean,
    hasText: Boolean,
    hasSteps: Boolean,
    hasSkip: Boolean,
    header: String,
    steps: String,
    text: String,
    inputNoteText: String,
    noteText: String,
    noteLink: String,
    forgotPassword: Boolean,
    endpoint: String,

    hasInputPortfolio: Boolean,
    inputPortfolios: {
        type: Array,
        default: () => []
    },

    inputFields: {
        type: Array,
        default: () => []
    },

    hasImageUpload: Boolean,
    imageUploads: {
        type: Array,
        default: () => []
    },

    hasMultiDropdown: Boolean,
    multidropdowns: {
        type: Array,
        default: () => []
    },

    hasSocialInput: Boolean,
    inputCombo: Object,
    uploadFile: Object,
    slider: Object,
    dropdown: Object,
    inputUrl: Object,
    checkbox: Object,
    imageUpload: Object,
    buttonLabel: String,
    rememberMe: Boolean,
    redirect: String,
    isRegistration: Boolean,
    hasLargeButton: Boolean,
    hasAuthButton: Boolean,

    selectedRole: String,
    postData: Object
});

const postData = ref({});

const emit = defineEmits(['update:selectedRole']);

const handleButtonSelect = (role) => {
    emit('update:selectedRole', role);
    updatePostData('role', role);
};

const updatePostData = (field, value) => {
    postData.value[field] = value;
};

const handleRememberMeChange = (value) => {
    updatePostData('rememberMe', value);
};
</script>

<template>
    <div class="form">
        <!-- HEADER -->
        <FormHeader :hasBack="hasBack" :hasText="hasText" :hasSteps="hasSteps" :hasSkip="hasSkip" :header="header"
            :steps="steps" :text="text" />

        <!-- SELECTORS -->
        <div class="form__selectors" v-if="hasSelectors">
            <NormalButton label="Crew" :hasRequest="false" class="form__selectors__button button--tertiary"
                :class="{ 'button--active': selectedRole === 'crew' }" @click="handleButtonSelect('crew')" />
            <NormalButton label="Business" :hasRequest="false" class="form__selectors__button button--tertiary"
                :class="{ 'button--active': selectedRole === 'business' }" @click="handleButtonSelect('business')" />
        </div>

        <!-- INPUTS -->
        <div class="form__inputs">
            <div v-if="hasInputPortfolio" class="form__inputs__portfolio">
                <InputPortfolio v-for="(inputPortfolio, index) in inputPortfolios" :key="index"
                    :haslabel="inputPortfolio.hasLabel" :label="inputPortfolio.label" />
            </div>
            <SocialInput v-if="hasSocialInput" />
            <InputCombo v-if="inputCombo" :label="inputCombo.label" :input1Placeholder="inputCombo.input1Placeholder"
                :input2Placeholder="inputCombo.input2Placeholder" :dropdownOptions="inputCombo.dropdownOptions"
                :showCounter="inputCombo.showCounter" :showDropdown="inputCombo.showDropdown"
                :buttonLabel="inputCombo.buttonLabel" :buttonIcon="inputCombo.buttonIcon" class="form__inputs__field"
                @click="handleButtonClick" />
            <UploadFile v-if="uploadFile" :label="uploadFile.label" :hasLabel="uploadFile.hasLabel"
                :placeholder="uploadFile.placeholder" :isError="uploadFile.isError"
                :inputWidth="uploadFile.inputWidth" />
            <InputField v-for="(field, index) in inputFields" :key="index" :label="field.label"
                :hasLabel="field.hasLabel" :iconLeftName="field.iconLeftName" :hasIconLeft="field.hasIconLeft"
                :iconRightName="field.iconRightName" :hasIconRight="field.hasIconRight" :placeholder="field.placeholder"
                :isError="field.isError" :isPassword="field.isPassword" class="form__inputs__field"
                @input="updatePostData(field.label, $event.target.value)" />
            <div v-if="hasImageUpload" class="form__inputs__image">
                <ImageUploadButton v-for="(imageUpload, index) in imageUploads" :key="index" :shape="imageUpload.shape"
                    :label="imageUpload.label" />
            </div>
            <Slider v-if="slider" class="form__inputs__slider" :label="slider.label" :maxValue="slider.maxValue" />
            <DropDown v-if="dropdown" :hasLabel="dropdown.hasLabel" :label="dropdown.label"
                :placeholder="dropdown.placeholder" :options="dropdown.options" class="form__inputs__dropdown" />
            <MultiDropdown v-if="hasMultiDropdown" v-for="(multidropdown, index) in multidropdowns" :key="index"
                :hasLabel="multidropdown.hasLabel" :label="multidropdown.label" :placeholder="multidropdown.placeholder"
                :options="multidropdown.options" class="form__inputs__dropdown" />
            <InputUrl v-if="inputUrl" :label="inputUrl.label" :hasLabel="inputUrl.hasLabel" :placeholder="inputUrl.placeholder"
                :isError="inputUrl.isError" :inputWidth="inputUrl.inputWidth" :type="inputUrl.type" />
            <div v-if="checkbox" class="form__inputs__bot">
                <Checkbox v-if="checkbox" :label="checkbox.label" size="small" class="form__checkbox"
                    :checked="rememberMe" @change="handleRememberMeChange" />
                <router-link v-if="forgotPassword" :to="'/forgot-password'"
                    class="form__inputs__bot__forgot button-normal">Forgot password?</router-link>
            </div>
            <div class="form__inputs__note" v-if="inputNoteText">
                <span class="form__inputs__note__static text-bold-s">Note</span>
                <span class="form__inputs__note__dynamic text-reg-s">{{ inputNoteText }}</span>
            </div>
        </div>

        <!-- BUTTONS -->
        <div class="form__buttons">
            <LargeButton v-if="(hasLargeButton)" :label="buttonLabel" :endpoint="endpoint" :postData="postData"
                :redirect="redirect" :isRegistration="isRegistration" class="form__buttons__button button--primary" />
            <AuthButton v-if="(hasAuthButton)" :label="buttonLabel" :endpoint="endpoint" :postData="postData"
                :redirect="redirect" :isRegistration="isRegistration" class="form__buttons__button button--primary" />

            <div class="form__buttons__note" v-if="noteLink">
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

.form__inputs__portfolio {
    display: flex;
    gap: 16px;
}

.form__inputs__image {
    display: flex;
    justify-content: space-between;
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

.form__inputs__note {
    display: flex;
    gap: 8px;
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