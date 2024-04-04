<script>
import { NavArrowDown, NavArrowUp, NavArrowLeft, NavArrowRight, User, HandCard, Bell, Accessibility, Behance, Tiktok, Threads, X, Linkedin, Youtube, Instagram, Facebook, Dribbble, MapPin, AtSign, CheckCircle, MoreHoriz, Xmark, Learning, CinemaOld, DragHandGesture, Attachment, Calendar, Search, Plus, Clock, BadgeCheck } from '@iconoir/vue';
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import setupAxios from '../../../setupAxios';

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
        storeTokens: {
            type: Boolean,
            default: false
        },
    },
    setup(props) {
        const router = useRouter();
        const axiosInstance = setupAxios(router);

        const handleClick = () => {
            // check if token are in session storage
            const sessionToken = sessionStorage.getItem('sessionToken');
            const rememberMeToken = sessionStorage.getItem('rememberMeToken');

            // redirect to login page if tokens are not available
            if (!sessionToken || !rememberMeToken) {
                router.push('/login');
                return;
            }

            // set tokens in headers and cookies
            const headers = {
                'Authorization': sessionToken,
                'Cookie': `rememberMeToken=${rememberMeToken}`
            };

            console.log('Sending POST data:', props.postData);
            axiosInstance.post(props.endpoint, props.postData, { headers })
                .then(response => {
                    console.log('POST request successful:', response);
                    handleSuccessResponse(response, router);
                })
                .catch(error => {
                    console.error('Error making POST request:', error);
                });
        };

        const handleSuccessResponse = (response, router) => {
            console.log('Entire Response Object:', response);

            if (response && Object.keys(response).length !== 0) {
                console.log('Response Data:', response);
                if (response.sessionToken) {
                    sessionStorage.setItem('sessionToken', response.sessionToken);
                }
                if (response.rememberMeToken) {
                    sessionStorage.setItem('rememberMeToken', response.rememberMeToken);
                }
            } else {
                console.error('Empty or undefined response:', response);
            }

            // Redirect if needed
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