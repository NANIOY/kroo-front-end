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
            type: String
        },
        hasRequest: {
            type: Boolean,
            default: true
        }
    },
    setup(props) {
        const router = useRouter();
        const axiosInstance = setupAxios(router);

        const handleClick = async () => {
            if (props.hasRequest) {
                try {
                    const response = await axiosInstance[props.method.toLowerCase()](props.endpoint, props.postData);
                    console.log('Response:', response);


                } catch (error) {
                    console.error('Error making POST request:', error);
                }
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
    width: 100%;
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