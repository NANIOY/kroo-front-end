<script setup>
import UsersList from '../../components/organisms/list/UsersList.vue';
import InviteUser from '../../components/organisms/InviteUser.vue';
</script>

<template>
    <div class="team__container">
        <div class="team__container__header">
            <div class="team__title">
                <h4>Team members</h4>
                <p>Manage team members</p>
            </div>
            <div class="team__invite">
                <InviteUser />
            </div>
        </div>
        <div class="team__users">
            <UsersList />
        </div>
    </div>
</template>

<style scoped>

.team__container {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.team__container__header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 16px;
}

.team__invite {
    margin-top: -8px;
}

.team__users {
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;
}

</style>