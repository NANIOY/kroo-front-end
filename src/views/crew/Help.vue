<script setup>
import HelpList from '../../components/molecules/help/HelpList.vue';
import Labels from '../../components/molecules/help/Labels.vue';

// First set of data
const customDropdownItems = [
  { label: 'Dropdown A', textOptions: 'Option A' },
  { label: 'Dropdown B', textOptions: 'Option B' },
  { label: 'Dropdown A', textOptions: 'Option A' },
  { label: 'Dropdown B', textOptions: 'Option B' },
  { label: 'Dropdown B', textOptions: 'Option B' },
];
const titleLabel = 'Getting started';

const customDropdownItems2 = [
  { label: 'How do I switch from a crew account to a business account?', textOptions: 'You can seamlessly switch accounts by clicking on your profile picture or icon in the top right corner of the screen. A dropdown menu will appear, providing the option to switch account type' },
  { label: 'Can I delete my account?', textOptions: 'No, the account deletion function is currently under development. We understand the importance of user control, and we\'re working on implementing this feature as soon as possible. In the meantime, if you\'d like to take a break from the platform, you can simply log out.' },
  { label: 'Is there a way to edit my profile after it has been created?', textOptions: 'Absolutely! You can easily edit your profile information. Simply click on your profile picture or icon in the top right corner, select profile, and then click the edit button. This will allow you to update details like your name, bio, contact information, and more.' },
  { label: 'I have a problem with my account, where can I get some help?', textOptions: '"You can always send us a mail at Kroo.site@gmail.com and we will gladly help you solve the problem"' },
  { label: 'How can I upgrade my account? ', textOptions: 'You can directly access the upgrade option on your Kroo dashboard. Look for a button or link labeled "Unlock Pro". Clicking on this button will take you to the subscription page where you can see the available subscription tiers and their benefits.' },
];
const customTitleLabel = 'Account';

</script>

<template>
  <div class="main-container">
    <div class="side-by-side-container">
      <Labels />
      <div class="section-container">
        <HelpList :titleLabel="titleLabel" :dropdownItems="customDropdownItems" />
        <HelpList :titleLabel="customTitleLabel" :dropdownItems="customDropdownItems2" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.main-container {
  display: flex;
  flex-direction: column;
  width: 1440px;
  align-items: flex-start;
  gap: 80px;
}

.side-by-side-container {
  display: flex;
  align-items: flex-start;
  gap: 80px;
  width: 100%;
}

.side-by-side-container> :first-child {
  flex-shrink: 0;
  width: 200px;
}

.section-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 48px;
  width: 100%;
  height: 870px;
  flex: 1 0 0;
}
</style>