<script setup>
import SettingsList from '../../components/molecules/settings/SettingsList.vue';
import AccountSettings from '../../components/molecules/settings/AccountSettings.vue';
</script>

<template>
  <div class="settings-container">
    <SettingsList />
    <div class="gap"></div>
    <AccountSettings />
  </div>
</template>

<style scoped>
.settings-container {
  display: flex;
  align-items: flex-start;
  width: 100%;
}

.gap {
  width: 80px;
  flex-shrink: 0;
}

.SettingsList {
  flex: 1;
  min-width: 0;
  box-sizing: border-box;
}

.AccountSettings {
  flex: 1;
  min-width: 0;
  box-sizing: border-box;
}
</style>