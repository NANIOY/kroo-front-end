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
                // make POST request to endpoint with postData using axios instance
                const response = await axiosInstance.post(props.endpoint, props.postData);
                console.log('Response:', response);

                if (!response.data || !response.data.data) {
                    throw new Error("Invalid response structure");
                }

                // extract userId from response data based on endpoint
                let userId;
                let role;
                if (props.isRegistration) {
                    userId = response.data.data.user._id;
                    role = response.data.data.activeRole;
                } else {
                    userId = response.data.data.userId;
                    role = response.data.data.activeRole;
                }

                // log response data
                console.log('Response data:', response.data);

                // store userId in sessionStorage
                sessionStorage.setItem('userId', userId);
                sessionStorage.setItem('role', role);

                if (props.redirect) {
                    router.push(props.redirect);
                }

                // check if button is for registration
                if (props.isRegistration) {
                    await loginAfterRegistration({
                        email: props.postData.email,
                        password: props.postData.password,
                        role: role
                    });
                }
            } catch (error) {
                console.error('Error making POST request:', error);
            }
        };

        const loginAfterRegistration = async (registrationData) => {
            try {
                const loginResponse = await axiosInstance.post('/auth/login', registrationData);
                console.log('Login response:', loginResponse);
                sessionStorage.setItem('role', loginResponse.data.data.activeRole);

                if (props.redirect) {
                    router.push(props.redirect);
                }
            } catch (error) {
                console.error('Error logging in after registration:', error);
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