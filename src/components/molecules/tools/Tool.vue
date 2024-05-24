<script>
// Import the toggle component
import Toggle from '../../atoms/selectors/Toggle.vue';
import Tag from '../../atoms/items/Tag.vue';

export default {
    components: {
        Toggle,
        Tag
    },
    props: {
        tagText: {
            type: String,
            default: 'Custom Tag'
        }
    },
    data() {
        return {
            isVisible: true,
            title: 'Title',
            text: 'Text'
        };
    },
    methods: {
        toggleVisibility() {
            this.isVisible = !this.isVisible;
        }
    }
};
</script>

<template>
    <div class="tool-container">
        <div class="icon-and-tag-container">
            <div class="icon-container">
                <!-- Circle for image with the specified dimensions and style -->
                <div class="circle"></div>
            </div>
            <!-- Tag component -->
            <div class="tag-container">
                <tag type="default">{{ tagText }}</tag>
            </div>
        </div>
        <div class="content">
            <!-- Title with class "custom-title" -->
            <h2 class="custom-title">{{ title }}</h2>
            <!-- Text with class "custom-text" -->
            <p class="custom-text">{{ text }}</p>
        </div>
        <!-- Toggle component -->
        <div class="toggle-container">
            <toggle :isDisabled="false" @toggle="toggleVisibility"></toggle>
        </div>
    </div>
</template>

<style scoped>
.tool-container {
    width: 400px;
    height: 289px;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    padding: 20px;
    border-radius: var(--radius-radius-XS, 4px);
    background: var(--neutral-20);
}

.icon-and-tag-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
}

.icon-container {
    width: 33.6px;
    height: 33.6px;
    flex-shrink: 0;
    border-radius: 5999.4px;
    border: 0.6px solid #4A52BD;
    background: rgba(74, 82, 189, 0.15);
    box-shadow: 0px 0px 4.8px 0.6px #4A52BD;
    display: flex;
    align-items: center;
    justify-content: center;
}

.circle {
    width: 18px;
    height: 18px;
    flex-shrink: 0;
    border-radius: 50%;
    background: url('../../../../public/assets/paymentMethod/Bancontact.webp') lightgray -6.667px -6.429px / 171.429% 171.429% no-repeat;
}

.tag-container {
    display: flex;
    align-items: center;
    height: 20px;
    padding: 6px 8px;
    border-radius: 2px;
    background: var(--color-button-background-button-bg-disabled, #4E4E4E);
}

.content {
    margin-top: 20px;
}

.custom-title {
    width: 221px;
    color: var(--color-text-text-primary, #0E0F0F);
    line-height: 1.4em;
}

.custom-text {
    width: 360px;
    color: var(--color-text-text-secondary, #333);
    line-height: 1.4em;
}

.toggle-container {
    display: flex;
    align-items: center;
    margin-left: auto; 
}
</style>