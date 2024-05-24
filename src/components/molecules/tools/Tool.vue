<script>
import Toggle from '../../atoms/selectors/Toggle.vue';
import Tag from '../../atoms/items/Tag.vue';

// Define a mapping between tool names and their configurations
const toolConfigurations = {
    'Microsoft Teams': {
        title: 'Microsoft Teams',
        text: 'Microsoft Teams is the ultimate messaging app for your organization — a workspace for real-time collaboration and communication.',
        iconUrl: '/assets/microsoft-teams-icon.png',
        tagText: 'COMMUNICATION'
    },
    'Google Drive': {
        title: 'Google Drive',
        text: 'Google Drive is a cloud-based storage service that enables users to store and access files online.',
        iconUrl: '/assets/google-drive-icon.png',
        tagText: 'FILE STORAGE'
    },
    'Microsoft OneDrive': {
        title: 'Microsoft OneDrive',
        text: 'Easily store, access, and discover your individual and shared work files in Microsoft 365, including Microsoft Teams, from all your devices.',
        iconUrl: '/assets/microsoft-onedrive-icon.png',
        tagText: 'FILE STORAGE'
    },
    'Zoom': {
        title: 'Zoom',
        text: 'Empower your employees, teams, and customers to work better together and get more done.',
        iconUrl: '/assets/zoom-icon.png',
        tagText: 'COMMUNICATION'
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
    created() {
        // Set the properties of the Tool component based on the provided tool name
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
            <div class="icon-container radius-full">
                <div class="tool-icon"></div>
            </div>
            <div class="tag-container .button--disabled radius-xxs ">
                <tag type="default">{{ tagText }}</tag>
            </div>
        </div>
        <div class="content">
            <h2 class="custom-title .text-primary">{{ title }}</h2>
            <p class="custom-text .text-secondary">{{ text }}</p>
        </div>
        <div class="toggle-container">
            <toggle :isDisabled="false" @toggle="toggleVisibility"></toggle>
        </div>
    </div>
</template>

<style scoped>
.tool-container {
    width: 400px;
    height: 290px;
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
    border: 0.6px solid #4A52BD;
    background: rgba(74, 82, 189, 0.15);
    box-shadow: 0px 0px 4.8px 0.6px #4A52BD;
    display: flex;
    align-items: center;
    justify-content: center;
}

.tool-icon {
    width: 18px;
    height: 18px;
    flex-shrink: 0;
    background: url('../../../../public/assets/paymentMethod/Bancontact.webp') lightgray -6.667px -6.429px / 171.429% 171.429% no-repeat;
}

.tag-container {
    display: flex;
    align-items: center;
    height: 20px;
    padding: 6px 8px;
    box-sizing: border-box;
}

.content {
    margin-top: 20px;
}

.custom-title {
    width: 100%;
    line-height: 1.4em;
}

.custom-text {
    width: 100%;
    line-height: 1.4em;
}

.toggle-container {
    display: flex;
    align-items: center;
    margin-left: auto;
}
</style>