<template>
  <div>
    <!--<NavBar />-->
    <!--<topNavDash/>-->
    <topNav pageName="Dashboard" />
    <largeButton class="button--primary" :hasIcon="true" :hasLabel="true" label="Label" iconName="User" />
    <normalButton class="button--secondary" :hasIcon="true" :hasLabel="true" label="Label" iconName="User" />
    <transparentButton class="button--tertiary" :hasIcon="true" :hasLabel="true" label="Label" iconName="User" />
    <appliedJobs />
    <offeredJobs />
    <ongoingJobs />

    <div>
      <router-view v-if="$route.path === '/dashboard'"></router-view>
    </div>

    <div>
      <router-view v-if="$route.path === '/calendar'"></router-view>
    </div>

    <div>
      <router-view v-if="$route.path === '/help'"></router-view>
    </div>

    <div>
      <router-view v-if="$route.path === '/login'"></router-view>
    </div>

    <div>
      <router-view v-if="$route.path === '/profile'"></router-view>
    </div>

    <div>
      <router-view v-if="$route.path === '/search'"></router-view>
    </div>

    <div>
      <router-view v-if="$route.path === '/settings'"></router-view>
    </div>

    <div>
      <router-view v-if="$route.path === '/tools'"></router-view>
    </div>

    <div>
      <router-view v-if="$route.path === '/tracker'"></router-view>
    </div>


    <div>
      Fake Dashboard
    </div>
  </div>
</template>

<script setup>
import NavBar from './components/NavBar.vue';
import router from '../router';
import topNavDash from './components/topNav/topNavDash.vue';
import topNav from './components/topNav/topNav.vue';
import largeButton from './components/buttons/LargeButton.vue';
import transparentButton from './components/buttons/TransparentButton.vue';
import normalButton from './components/buttons/NormalButton.vue';
import appliedJobs from './components/jobs/appliedJobs.vue';
import offeredJobs from './components/jobs/offeredJobs.vue';
import savedJobs from './components/jobs/savedJobs.vue';
import ongoingJobs from './components/jobs/ongoingJobs.vue';
</script>

<style scoped></style>
