<script setup>
import HelpList from '../../components/molecules/help/HelpList.vue';
import Labels from '../../components/molecules/help/Labels.vue';

const customDropdownItems = [
  { label: 'What is Kroo?', textOptions: 'The audiovisual industry struggles with complex planning, tight deadlines, and limited talent discovery due to reliance on personal networks. kroo tackles these challenges by connecting crew members with production houses. Crew can showcase their skills on detailed profiles, while production houses can quickly post vacancies to a pool of qualified candidates. Integrations with popular calendar and collaboration tools further streamline workflows. Developed through industry research and analysis, kroo aims to level the playing field, improve accessibility, and redefine efficiency standards in the audiovisual sector.' },
  { label: 'Is Kroo free to use?', textOptions: 'Yes, Kroo is free to use. We also provide optional subscriptions to offer extra features or to expand your profile. ' },
  { label: 'What devices can I use Kroo on?', textOptions: 'Kroo is currently only accesible through a web browser on your computer. We\'re currently still under development, future devices will be added soon.' },
  { label: 'Where can I see my job offers?', textOptions: 'Anything job related for crew and businesses can be found on the tracker page.' },
  { label: 'Oops! I accidentally applied to a job. How can I withdraw my application?', textOptions: 'Don\'t worry, mistakes happen! You can easily withdraw your application by clicking on the job details or going to the tracker and canceling it there.' },
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