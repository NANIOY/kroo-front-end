<script setup>
import { ref, defineProps, defineEmits } from 'vue';

const props = defineProps({
    label: {
        type: String,
        default: 'Custom URL'
    },
    hasLabel: {
        type: Boolean,
        default: true
    },
    placeholder: {
        type: String,
        default: 'Enter your custom URL'
    },
    isError: {
        type: Boolean,
        default: false
    },
    inputWidth: {
        type: String,
        default: '100%'
    },
    type: {
        type: String,
        default: 'user',
        validator: value => ['user', 'business'].includes(value)
    },
    localStorageKey: String
});

const inputValue = ref('');

const urlPrefix = ref('');

if (props.type === 'user') {
    urlPrefix.value = 'kroo.site/user/';
} else if (props.type === 'business') {
    urlPrefix.value = 'kroo.site/business/';
}

const inputType = 'text';

const emit = defineEmits(['urlChanged']);

const handleUrlChange = (value) => {
    inputValue.value = value;
    const postData = localStorage.getItem('postData') ? JSON.parse(localStorage.getItem('postData')) : {};
    postData.userUrl = value;
    localStorage.setItem('postData', JSON.stringify(postData));
    emit('urlChanged', value);
};
</script>

<template>
    <div class="inputContainer">
        <label v-if="hasLabel">{{ label }}</label>
        <div class="inputContainer__wrapper text-reg-l">
            <div class="inputContainer__wrapper__prefix">{{ urlPrefix }}</div>
            <input :type="inputType" :placeholder="placeholder" :class="{ error: isError }" v-model="inputValue"
                @input="handleUrlChange($event.target.value)" />
        </div>
    </div>
</template>


<style scoped>
/* GENERAL */
.inputContainer {
    display: flex;
    flex-direction: column;
    color: var(--black);
    gap: 4px;
}

.label {
    font-size: 16px;
    text-transform: capitalize;
}

.inputContainer__wrapper {
    display: flex;
    align-items: center;
    position: relative;
    width: 100%;
    font-family: var(--font-body);
}

.inputContainer__wrapper__prefix,
.inputContainer__wrapper input {
    height: 48px;
    border: 2px solid var(--black);
    background-color: var(--white);
    box-sizing: border-box;

}

.inputContainer__wrapper__prefix {
    display: flex;
    align-items: center;
    justify-content: center;
    border-right: none;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    padding: 0 0px 0 8px;
}

.inputContainer__wrapper input {
    flex: 1;
    box-sizing: border-box;
    padding: 2px 0 0 2px;
    border-left: none;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    transition: border-color 0.3s ease;
}

.inputContainer__wrapper input:focus {
    border-color: var(--blurple-50);
    outline: none;
}

input.error {
    border-color: var(--warning);
}

input::placeholder {
    color: var(--neutral-30);
}
</style>