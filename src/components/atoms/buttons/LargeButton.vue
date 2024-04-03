<script>
import { NavArrowDown, NavArrowUp, NavArrowLeft, NavArrowRight, User, HandCard, Bell, Accessibility, Behance, Tiktok, Threads, X, Linkedin, Youtube, Instagram, Facebook, Dribbble, MapPin, AtSign, CheckCircle, MoreHoriz, Xmark, Learning, CinemaOld, DragHandGesture, Attachment, Calendar, Search, Plus, Clock, BadgeCheck } from '@iconoir/vue';
import { ref } from 'vue';

export default {
    props: {
        hasIcon: {
            type: Boolean,
            default: true
        },
        hasLabel: {
            type: Boolean,
            default: true
        },
        label: String,
        iconName: {
            type: String,
            default: ''
        },
        method: {
            type: String,
            default: 'POST'
        },
        endpoint: {
            type: String,
        }
    },
    setup(props) {
        const baseUrl = 'https://kroo-back-end.onrender.com/api/v1'; // base URL

        const handleClick = () => {
            console.log('Performing a POST request to:', baseUrl + props.endpoint);
        };

        return {
            handleClick
        };
    },
    components: {
        NavArrowDown,
        NavArrowUp,
        NavArrowLeft,
        NavArrowRight,
        User,
        HandCard,
        Bell,
        Accessibility,
        Behance,
        Tiktok,
        Threads,
        X,
        Linkedin,
        Youtube,
        Instagram,
        Facebook,
        Dribbble,
        MapPin,
        AtSign,
        CheckCircle,
        MoreHoriz,
        Xmark,
        Learning,
        CinemaOld,
        DragHandGesture,
        Attachment,
        Calendar,
        Search,
        Plus,
        Clock,
        BadgeCheck
    }
};
</script>

<template>
    <button :class="[
        'largeButton',
        { 'no-label': !hasLabel }
    ]" @click="handleClick">
        <!-- Dynamically render the icon based on the iconName prop -->
        <component :is="iconName" v-if="hasIcon" />
        <span v-if="hasLabel && label" class="largeButton__label">{{ label }}</span>
    </button>
</template>

<style scoped>
.largeButton {
    font-size: 20px;
    width: 160px;
    height: 48px;
}

.largeButton.no-label {
    width: 28px;
    height: 28px;
}

.largeButton__label {
    padding-top: 2px;
}
</style>