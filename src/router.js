import { createRouter, createWebHashHistory } from 'vue-router';

// LOGIN / REGISTER ROUTES
import Login from './views/Login.vue';
import Register from './views/Register.vue';
import ForgotPassword from './views/ForgotPassword.vue';

// REGISTER CREW
import RegisterCrewStep1 from './views/registerCrew/RegisterCrewStep1.vue';
import RegisterCrewStep2 from './views/registerCrew/RegisterCrewStep2.vue';
import RegisterCrewStep3 from './views/registerCrew/RegisterCrewStep3.vue';
import RegisterCrewStep4 from './views/registerCrew/RegisterCrewStep4.vue';
import RegisterCrewStep5 from './views/registerCrew/RegisterCrewStep5.vue';

// REGISTER BUSINESS
import RegisterBusiness from './views/registerBusiness/RegisterBusiness.vue';
import RegisterBusinessStep1 from './views/registerBusiness/RegisterBusinessStep1.vue';
import RegisterBusinessStep2 from './views/registerBusiness/RegisterBusinessStep2.vue';
import RegisterBusinessStep3 from './views/registerBusiness/RegisterBusinessStep3.vue';
import RegisterBusinessStep4 from './views/registerBusiness/RegisterBusinessStep4.vue';
import RegisterBusinessStep5 from './views/registerBusiness/RegisterBusinessStep5.vue';

// MAIN CREW ROUTES
import CrewCalendar from './views/crew/Calendar.vue';
import CrewDashboard from './views/crew/Dashboard.vue';
import CrewHelp from './views/crew/Help.vue';
import CrewProfile from './views/crew/Profile.vue';
import CrewSearch from './views/crew/Search.vue';
import CrewSettings from './views/crew/Settings.vue';
import CrewTools from './views/crew/Tools.vue';
import CrewTracker from './views/crew/Tracker.vue';
import CrewUpgrade from './views/crew/Upgrade.vue';

// MAIN BUSINESS ROUTES
import BusinessCalendar from './views/business/Calendar.vue';
import BusinessDashboard from './views/business/Dashboard.vue';
import BusinessHelp from './views/business/Help.vue';
import BusinessProfile from './views/business/Profile.vue';
import BusinessSearch from './views/business/Search.vue';
import BusinessSettings from './views/business/Settings.vue';
import BusinessTools from './views/business/Tools.vue';
import BusinessTracker from './views/business/Tracker.vue';
import BusinessUpgrade from './views/business/Upgrade.vue';
import BusinessTeam from './views/business/Team.vue';

// REMOVE FROM PRODUCTION
import Test from './views/Test.vue';

function loadComponentForRole(crewComponent, businessComponent) {
    const role = sessionStorage.getItem('role');
    console.log('Role:', role); // Debugging line
    const component = role === 'business' ? businessComponent : crewComponent;
    console.log('Loading component:', component); // Debugging line
    return role === 'business' ? businessComponent : crewComponent;
}

const routes = [
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/forgot-password', component: ForgotPassword },

    { path: '/register/crew/step-1', component: RegisterCrewStep1 },
    { path: '/register/crew/step-2', component: RegisterCrewStep2 },
    { path: '/register/crew/step-3', component: RegisterCrewStep3 },
    { path: '/register/crew/step-4', component: RegisterCrewStep4 },
    { path: '/register/crew/step-5', component: RegisterCrewStep5 },

    { path: '/register/business', component: RegisterBusiness },
    { path: '/register/business/step-1', component: RegisterBusinessStep1 },
    { path: '/register/business/step-2', component: RegisterBusinessStep2 },
    { path: '/register/business/step-3', component: RegisterBusinessStep3 },
    { path: '/register/business/step-4', component: RegisterBusinessStep4 },
    { path: '/register/business/step-5', component: RegisterBusinessStep5 },

    { path: '/calendar', component: () => loadComponentForRole('Calendar', 'Calendar') },
    { path: '/dashboard', component: () => loadComponentForRole('Dashboard', 'Dashboard') },
    { path: '/help', component: () => loadComponentForRole('Help', 'Help') },
    { path: '/profile', component: () => loadComponentForRole('Profile', 'Profile') },
    { path: '/search', component: () => loadComponentForRole('Search', 'Search') },
    { path: '/settings', component: () => loadComponentForRole('Settings', 'Settings') },
    { path: '/tools', component: () => loadComponentForRole('Tools', 'Tools') },
    { path: '/tracker', component: () => loadComponentForRole('Tracker', 'Tracker') },
    { path: '/upgrade', component: () => loadComponentForRole('Upgrade', 'Upgrade') },
    { path: '/team', component: BusinessTeam },
    
    { path: '/test', component: Test }, // REMOVE FROM PRODUCTION
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const sessionToken = sessionStorage.getItem('sessionToken');
    const secret = '&1te7W]%0N@0(3C=LNh[Z&;{1nhFr4Znk9N=egN}4U@0o$zCCg';
    if (to.path === '/login' || to.path === '/register' || to.path === '/forgot-password') {
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