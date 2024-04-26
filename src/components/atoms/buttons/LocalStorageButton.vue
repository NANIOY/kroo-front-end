<script>
import { NavArrowDown, NavArrowUp, NavArrowLeft, NavArrowRight, User, HandCard, Bell, Accessibility, Behance, Tiktok, Threads, X, Linkedin, Youtube, Instagram, Facebook, Dribbble, MapPin, AtSign, CheckCircle, MoreHoriz, Xmark, Learning, CinemaOld, DragHandGesture, Attachment, Calendar, Search, Plus, Clock, BadgeCheck } from '@iconoir/vue';
import { useRouter } from 'vue-router';
import setupAxios from '../../../setupAxios.js'

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
        isRegistration: {
            type: Boolean,
            default: false
        }
    },
    setup(props) {
        const router = useRouter();
        const axiosInstance = setupAxios(router);

        const handleClick = async () => {
            try {
                const userId = sessionStorage.getItem('userId');
                if (!userId) {
                    throw new Error('No user ID found in session storage.');
                }

                const localData = JSON.parse(localStorage.getItem('postData')) || {};

                const payload = {
                    userId,
                    ...props.postData,
                    ...localData,
                };

                console.log('Payload:', payload);
                const response = await axiosInstance.post(props.endpoint, payload);
                console.log('Response data:', response.data);

                if (props.redirect) {
                    router.push(props.redirect);
                }
            } catch (error) {
                console.error('Error during the request:', error);
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
        'authButton',
        { 'no-label': !hasLabel }
    ]" @click="handleClick">
        <component :is="iconName" v-if="hasIcon" />
        <span v-if="hasLabel && label" class="authButton__label">{{ label }}</span>
    </button>
</template>

<style scoped>
.authButton {
    font-size: 20px;
    height: 48px;
}

.authButton.no-label {
    width: 28px;
    height: 28px;
}

.authButton__label {
    padding-top: 2px;
}
</style>