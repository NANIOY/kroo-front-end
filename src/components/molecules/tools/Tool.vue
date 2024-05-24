<script>
import Toggle from '../../atoms/selectors/Toggle.vue';
import Tag from '../../atoms/items/Tag.vue';

const toolConfigurations = {
    'Microsoft Teams': {
        title: 'Microsoft Teams',
        text: 'Microsoft Teams is the ultimate messaging app for your organization — a workspace for real-time collaboration and communication.',
        iconUrl: '../../../../public/assets/tools/Microsoft-Teams-logo.webp',
        tagText: 'COMMUNICATION',
        borderColor: '#4A52BD',
        backgroundColor: 'rgba(74, 82, 189, 0.15)',
        shadowColor: '#4A52BD'
    },
    'Google Drive': {
        title: 'Google Drive',
        text: 'Google Drive is a cloud-based storage service that enables users to store and access files online.',
        iconUrl: '../../../../public/assets/tools/Google-Drive-logo.webp',
        tagText: 'FILE STORAGE',
        borderColor: '#3BA55D',
        backgroundColor: 'rgba(59, 165, 93, 0.15)',
        shadowColor: '#3BA55D'
    },
    'Microsoft OneDrive': {
        title: 'Microsoft OneDrive',
        text: 'Easily store, access, and discover your individual and shared work files in Microsoft 365, including Microsoft Teams, from all your devices.',
        iconUrl: '../../../../public/assets/tools/Microsoft-OneDrive-logo.webp',
        tagText: 'FILE STORAGE',
        borderColor: '#FEBD0C',
        backgroundColor: 'rgba(254, 189, 12, 0.15)',
        shadowColor: '#FEBD0C'
    },
    'Zoom': {
        title: 'Zoom',
        text: 'Empower your employees, teams, and customers to work better together and get more done.',
        iconUrl: '../../../../public/assets/tools/Zoom-logo.webp',
        tagText: 'COMMUNICATION',
        borderColor: '#D43900',
        backgroundColor: 'rgba(212, 57, 0, 0.15)',
        shadowColor: '#D43900'
    }
};

export default {
    components: {
        Toggle,
        Tag
    },
    props: {
        toolName: {
            type: String,
            default: 'Custom Tag'
        }
    },
    data() {
        return {
            isVisible: true,
            title: '',
            text: '',
            iconUrl: '',
            tagText: ''
        };
    },
    computed: {
        iconContainerStyle() {
            const toolConfig = toolConfigurations[this.toolName];
            return {
                border: `0.6px solid ${toolConfig.borderColor}`,
                background: toolConfig.backgroundColor,
                boxShadow: `0px 0px 4.8px 0.6px ${toolConfig.shadowColor}`
            };
        }
    },
    created() {
        const toolConfig = toolConfigurations[this.toolName];
        if (toolConfig) {
            this.title = toolConfig.title;
            this.text = toolConfig.text;
            this.iconUrl = toolConfig.iconUrl;
            this.tagText = toolConfig.tagText;
        }
    },
    methods: {
        toggleVisibility() {
            this.isVisible = !this.isVisible;
        }
    }
};
</script>

<template>
    <div class="tool-container radius-xs">
        <div class="icon-and-tag-container">
            <div :style="iconContainerStyle" class="icon-container radius-full">
                <img :src="iconUrl" alt="Tool Icon" class="tool-icon" />
            </div>
            <div class="tag-container button--disabled radius-xxs">
                <tag type="default">{{ tagText }}</tag>
            </div>
        </div>
        <div class="content">
            <p class="custom-title text-bold-l">{{ title }}</p>
            <p class="custom-text text-reg-normal">{{ text }}</p>
        </div>
        <div class="toggle-container">
            <toggle :isDisabled="false" @toggle="toggleVisibility"></toggle>
        </div>
    </div>
</template>

<style scoped>
.tool-container {
    width: 365px;
    height: 250px;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    padding: 20px;
    background: var(--neutral-20);
}

.icon-and-tag-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
}

.icon-container {
    width: 34px;
    height: 34px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
}

.tool-icon {
    width: 18px;
    height: 18px;
    flex-shrink: 0;
    object-fit: cover;
}

.tag-container {
    display: flex;
    align-items: center;
    height: 20px;
    box-sizing: border-box;
}

.content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    align-self: stretch;
    height: 100px;
}

.custom-title {
    width: 100%;
    line-height: 1.4em;
    margin-bottom: 0;
}

.custom-text {
    width: 100%;
    line-height: 1.4em;
    margin-top: 0;
}

.toggle-container {
    display: flex;
    align-items: center;
    margin-left: auto;
}
</style>