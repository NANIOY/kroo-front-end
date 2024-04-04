<script>
import { NavArrowDown, NavArrowUp, NavArrowLeft, NavArrowRight, User, HandCard, Bell, Accessibility, Behance, Tiktok, Threads, X, Linkedin, Youtube, Instagram, Facebook, Dribbble, MapPin, AtSign, CheckCircle, MoreHoriz, Xmark, Learning, CinemaOld, DragHandGesture, Attachment, Calendar, Search, Plus, Clock, BadgeCheck } from '@iconoir/vue';
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

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
            required: true
        },
        postData: {
            type: Object,
            required: true
        },
        redirect: {
            type: String,
        },
    },
    setup(props) {
        const router = useRouter();

        const handleClick = () => {
            console.log('Sending POST data:', props.postData);
            axios.post(props.endpoint, props.postData)
                .then(response => {
                    console.log('POST request successful:', response.data);
                    if (props.redirect) {
                        handleSuccessResponse(response.data, router);
                    }
                })
                .catch(error => {
                    console.error('Error making POST request:', error);
                });
        };

        const handleSuccessResponse = (responseData, router) => {
            if (props.storeTokens) {
            }
            if (props.redirect) {
                router.push(props.redirect);
            }
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