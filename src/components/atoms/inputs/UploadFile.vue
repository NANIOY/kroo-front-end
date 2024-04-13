<script>
import { Upload } from '@iconoir/vue';

export default {
    props: {
        label: String,
        hasLabel: {
            type: Boolean,
            default: false
        },
        placeholder: {
            type: String,
            default: 'Upload file'
        },
        isError: {
            type: Boolean,
            default: false
        },
        inputWidth: {
            type: String,
            default: '100%'
        }
    },
    components: {
        Upload
    },
    data() {
        return {
            file: null
        };
    },
    methods: {
        triggerFileInput() {
            this.$refs.fileInput.click();
        },
        handleFileUpload(event) {
            this.file = event.target.files[0];
            console.log('Uploaded file:', this.file);
        }
    }
};
</script>

<template>
    <div class="inputContainer">
        <label v-if="hasLabel">{{ label }}</label>
        <div class="inputContainer__wrapper">
            <input type="file" style="display: none;" ref="fileInput" @change="handleFileUpload"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png">
            <input type="text" :value="file ? file.name : ''" :placeholder="file ? '' : placeholder"
                :class="{ error: isError }" :style="{ width: inputWidth }" readonly @click="triggerFileInput">
            <span class="icon">
                <Upload />
            </span>
        </div>
    </div>
</template>

<style scoped>
.inputContainer {
    display: flex;
    flex-direction: column;
}

.inputContainer__wrapper {
    display: flex;
    align-items: center;
    position: relative;
    width: 100%;
}

label {
    margin-bottom: 4px;
    font-size: 16px;
    text-transform: capitalize;
}

.inputContainer__wrapper input {
    box-sizing: border-box;
    padding-top: 2px;
    padding-left: 12px;
    font-size: 20px;
    height: 48px;
    border: 2px solid var(--black);
    background-color: transparent;
    border-radius: 4px;
    transition: border-color 0.3s ease;
    cursor: pointer;
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

.icon {
    position: absolute;
    display: flex;
    right: 12px;
    cursor: pointer;
}
</style>