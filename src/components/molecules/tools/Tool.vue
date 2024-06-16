<script>
import Toggle from '../../atoms/selectors/Toggle.vue';
import Tag from '../../atoms/items/Tag.vue';

const toolConfigurations = {
    'Discord': {
        title: 'Discord',
        text: 'Discord is the easiest way to talk over voice, video, and text. Talk, chat, hang out, and stay close with your friends and communities.',
        iconUrl: '/assets/tools/Discord-logo.webp',
        tagText: 'COMMUNICATION',
        borderColor: '#5765EC',
        backgroundColor: 'rgba(87, 101, 236, 0.15)',
        borderRadius: '5999.4px',
        boxShadow: '0px 0px 4.8px 0.6px #5765EC'
    },
    'Microsoft Teams': {
        title: 'Microsoft Teams',
        text: 'Microsoft Teams is the ultimate messaging app for your organization — a workspace for real-time collaboration and communication.',
        iconUrl: '/assets/tools/Microsoft-Teams-logo.webp',
        tagText: 'COMMUNICATION',
        borderColor: '#4A52BD',
        backgroundColor: 'rgba(74, 82, 189, 0.15)',
        borderRadius: '5999.4px',
        boxShadow: '0px 0px 4.8px 0.6px #4A52BD',
    },
    'Slack': {
        title: 'Slack',
        text: 'Slack is a new way to communicate with your team. It\'s faster, better organized, and more secure than email.',
        iconUrl: '/assets/tools/Slack-logo.webp',
        tagText: 'COMMUNICATION',
        borderColor: '#E01E5A',
        backgroundColor: 'rgba(224, 30, 90, 0.15)',
        borderRadius: '5999.4px',
        boxShadow: '0px 0px 4.8px 0.6px #E01E5A'
    },
    'Google Drive': {
        title: 'Google Drive',
        text: 'Google Drive is a cloud-based storage service that enables users to store and access files online.',
        iconUrl: '/assets/tools/Google-Drive-logo.webp',
        tagText: 'FILE STORAGE',
        borderColor: '#1DA362',
        backgroundColor: 'rgba(29, 163, 98, 0.15)',
        borderRadius: '5999.4px',
        boxShadow: '0px 0px 4.8px 0.6px #1DA362'
    },
    'Notion': {
        title: 'Notion',
        text: 'A new tool that blends your everyday work apps into one. It\'s the all-in-one workspace for you and your team.',
        iconUrl: '/assets/tools/Notion-logo.webp',
        tagText: 'WORKPLACE',
        borderColor: '#000000',
        backgroundColor: 'rgba(0, 0, 0, 0.15)',
        borderRadius: '5999.4px',
        boxShadow: '0px 0px 4.8px 0.6px #000000'
    },
    'Microsoft Outlook': {
        title: 'Microsoft Outlook',
        text: 'Email and calendar, together in one place. Send, receive, and manage your email.',
        iconUrl: '/assets/tools/Microsoft-Outlook-logo.webp',
        tagText: 'AGENDA SERVICE',
        borderColor: '#1490DF',
        backgroundColor: 'rgba(20, 144, 223, 0.15)',
        borderRadius: '5999.4px',
        boxShadow: '0px 0px 4.8px 0.6px #28A8EA'
    },
    'Zoom': {
        title: 'Zoom',
        text: 'Empower your employees, teams, and customers to work better together and get more done.',
        iconUrl: '/assets/tools/Zoom-logo.webp',
        tagText: 'COMMUNICATION',
        borderColor: '#2196F3',
        backgroundColor: 'rgba(33, 150, 243, 0.15)',
        borderRadius: '5999.4px',
        boxShadow: '0px 0px 4.8px 0.6px #2196F3'
    },
    'Microsoft OneDrive': {
        title: 'Microsoft OneDrive',
        text: 'Easily store, access, and discover your individual and shared work files in Microsoft 365, including Microsoft Teams, from all your devices.',
        iconUrl: '/assets/tools/Microsoft-OneDrive-logo.webp',
        tagText: 'FILE STORAGE',
        borderColor: '#0078D4',
        backgroundColor: 'rgba(0, 120, 212, 0.15)',
        borderRadius: '5999.4px',
        boxShadow: '0px 0px 4.8px 0.6px #0078D4'
    },
    'Trello': {
        title: 'Trello',
        text: 'Trello brings all your tasks, teammates, and tools together. Keep everything in the same place —even if your team isn’t.',
        iconUrl: '/assets/tools/Trello-logo.webp',
        tagText: 'WORKSPACE',
        borderColor: '#156EE9',
        backgroundColor: 'rgba(21, 110, 233, 0.15)',
        borderRadius: '5999.4px',
        boxShadow: '0px 0px 4.8px 0.6px #156EE9'
    },
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
                boxShadow: toolConfig.boxShadow
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
    width: 364px;
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
    object-fit: scale-down;
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
    margin-top: -10px;
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