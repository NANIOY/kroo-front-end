import { createRouter, createWebHashHistory } from 'vue-router';

// LOGIN / REGISTER ROUTES
import Login from './views/Login.vue';
import Register from './views/Register.vue';
import ForgotPassword from './views/ForgotPassword.vue';

// MAIN APP ROUTES
import Calendar from './views/Calendar.vue';
import Dashboard from './views/Dashboard.vue';
import Help from './views/Help.vue';
import Profile from './views/Profile.vue';
import Search from './views/Search.vue';
import Settings from './views/Settings.vue';
import Tools from './views/Tools.vue';
import Tracker from './views/Tracker.vue';
import Upgrade from './views/Upgrade.vue';

// REMOVE FROM PRODUCTION
import Test from './views/Test.vue';

const routes = [
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/forgot-password', component: ForgotPassword },
    { path: '/calendar', component: Calendar },
    { path: '/dashboard', component: Dashboard },
    { path: '/help', component: Help },
    { path: '/profile', component: Profile },
    { path: '/search', component: Search },
    { path: '/settings', component: Settings },
    { path: '/tools', component: Tools },
    { path: '/tracker', component: Tracker },
    { path: '/upgrade', component: Upgrade },
    { path: '/test', component: Test }, // REMOVE FROM PRODUCTION
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const sessionToken = sessionStorage.getItem('sessionToken');
    const secret = '&1te7W]%0N@0(3C=LNh[Z&;{1nhFr4Znk9N=egN}4U@0o$zCCg';
    if (to.path === '/login' || to.path === '/register') {
        next();
    } else if (!sessionToken) {
        next('/login');
    } else if (!isValidToken(sessionToken, secret)) {
        next('/login');
    } else {
        next();
    }
});

function isValidToken(token, secret) {
    try {
        const decodedToken = decodeJwt(token);
        if (!decodedToken) {
            console.error('Token decoding failed');
            return false;
        }
        const currentTimestamp = Math.floor(Date.now() / 1000);
        const isValid = decodedToken.exp > currentTimestamp;
        return isValid;
    } catch (error) {
        console.error('Token validation error:', error);
        return false;
    }
}

function decodeJwt(token) {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    } catch (error) {
        return null;
    }
}

export default router;
