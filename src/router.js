import { createRouter, createWebHashHistory } from 'vue-router'
import Login from './views/Login.vue'
import Register from './views/Register.vue'
import Calendar from './views/Calendar.vue'
import Dashboard from './views/Dashboard.vue'
import Help from './views/Help.vue'
import Profile from './views/Profile.vue'
import Search from './views/Search.vue'
import Settings from './views/Settings.vue'
import Tools from './views/Tools.vue'
import Tracker from './views/Tracker.vue'
import Upgrade from './views/Upgrade.vue'
import Test from './views/Test.vue' // REMOVE FROM PRODUCTION

const routes = [
    { path: '/', component: Login },
    { path: '/register', component: Register },
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

export default router;