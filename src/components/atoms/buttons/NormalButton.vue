<script>
import { NavArrowDown, NavArrowUp, NavArrowLeft, NavArrowRight, User, HandCard, Bell, Accessibility, Behance, Tiktok, Threads, X, Linkedin, Youtube, Instagram, Facebook, Dribbble, MapPin, AtSign, CheckCircle, MoreHoriz, Xmark, Learning, CinemaOld, DragHandGesture, Attachment, Calendar, Search, Plus, Clock, BadgeCheck, EditPencil } from '@iconoir/vue';
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
            default: () => ({})
        },
        redirect: {
            type: String,
        },
        hasRequest: {
            type: Boolean,
            default: true
        },
        onSuccess: {
            type: Function,
            default: null
        }
    },
    setup(props) {
        const router = useRouter();

        // call setupAxios to set up axios instance with router
        const axiosInstance = setupAxios(router);

        const handleClick = () => {
            if (props.hasRequest) {
                axiosInstance({
                    method: props.method,
                    url: props.endpoint,
                    data: props.postData
                }).then(response => {
                    if (props.onSuccess) {
                        props.onSuccess(response);
                    }
                }).catch(error => {
                    console.error(`Error making ${props.method} request:`, error);
                });
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
        BadgeCheck,
        EditPencil
    }
};
</script>

<template>
    <button :class="[
        'normalButton',
        { 'no-label': !hasLabel }
    ]" @click="handleClick">
        <component :is="iconName" v-if="hasIcon" />
        <span v-if="hasLabel && label" class="normalButton__label">{{ label }}</span>
    </button>
</template>

<style scoped>
.normalButton {
    font-size: 16px;
    height: 40px;
}

.normalButton.no-label {
    width: 28px;
    height: 28px;
}

.normalButton__label {
    padding-top: 2px;
}
</style>