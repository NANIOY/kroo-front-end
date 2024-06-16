<script setup>
import { defineProps, ref, watchEffect } from 'vue';
import Tag from '../../atoms/items/Tag.vue';
import IconLabel from '../../atoms/items/IconLabel.vue';
import { Trophy, Medal } from '@iconoir/vue';

const props = defineProps({
  user: {
    type: Object,
    required: true
  },
  currentUser: {
    type: Object,
    required: true
  },
  isCurrentUserProfile: {
    type: Boolean,
    required: true
  }
});

const crewData = ref(null);
const skills = ref([]);
const educationTrainings = ref([]);
const certificationsLicenses = ref([]);
const activeJobsCount = ref(0);
const completedJobsCount = ref(0);
const bannerImage = ref(null);

const trainings = ref([
    {
        _id: "1",
        year: "2024",
        school: "THOMAS MORE MECHELEN",
        course: "Media and Entertainment Business"
      },
      {
        _id: "2",
        year: "2021",
        school: "PXL MAD SCHOOL",
        course: "PR & Media Influencer"
      },
      {
        _id: "3",
        year: "2018",
        school: "SINT-LUCAS BRUSSEL",
        course: "Journalistiek"
      }
]);

const education = ref([
    {
        _id: "1",
        year: "2024",
        school: "THOMAS MORE MECHELEN",
        course: "Media and Entertainment Business"
      },
      {
        _id: "2",
        year: "2021",
        school: "THOMAS MORE MECHELEN",
        course: "PR & Media Influencer"
      },
      {
        _id: "3",
        year: "2018",
        school: "THOMAS MORE MECHELEN",
        course: "Journalistiek"
      }
]);

watchEffect(() => {
  if (props.user && props.user.crewData) {
    crewData.value = props.user.crewData;
    skills.value = props.user.crewData.profileDetails.skills || [];
    educationTrainings.value = props.user.crewData.careerDetails.educationTraining || [];
    certificationsLicenses.value = props.user.crewData.careerDetails.certificationsLicenses || [];
    activeJobsCount.value = props.user.userJobs.active_jobs.length;
    bannerImage.value = props.user.crewData.basicInfo.bannerImage;
  }
});

console.log(props.user.crewData);
</script>

<template>
  <div v-if="crewData" class="about">
    <div class="about__top">
      <div class="about__info">
        <div>
            <img :src="bannerImage" alt="banner image" class="about__banner radius-s"/>
        </div>
        <div class="about__jobs radius-s">
            <Tag class="tag--colored">QUICK RESPONDER</Tag>
            <div class="about__jobs__container">
          <div class="about__job">
            <p class="text-reg-l">Active jobs</p>
            <div class="about__job-count">
              <span class="text-bold-xl">{{ activeJobsCount }}</span>
              <Trophy class="icon-active" />
            </div>
          </div>
          <div class="about__job">
            <p class="text-reg-l">Completed jobs</p>
            <div class="about__job-count">
              <span class="text-bold-xl">{{ completedJobsCount }}</span>
              <Medal class="icon-active" />
            </div>
          </div>
        </div>
        </div>
        
        <div class="about__certifications radius-s">
        <h6 class="about__section-title">Certifications</h6>
        <ul class="about__items">
            <li v-for="(certification, index) in certificationsLicenses" :key="certification" class="about__item">
            <IconLabel :iconName="'Attachment'" :label="'Certification ' + (index + 1)" size="small" :isLink="true" :href="certification"/>
          </li>
        </ul>
      </div>
      <div class="about__licenses radius-s">
        <h6 class="about__section-title">Licenses</h6>
        <ul class="about__items">
            <li v-for="(license, index) in certificationsLicenses" :key="license" class="about__item">
            <IconLabel :iconName="'Attachment'" :label="'License ' + (index + 1)" size="small" :isLink="true" :href="license" />
          </li>
        </ul>
      </div>
      </div>
    </div>
    <div class="about__bottom">
        <div class="about__bio surface-tertiary radius-s">
        <p>{{ crewData.profileDetails.bio }}</p>
      </div>
      <div class="about__education radius-s">
        <h6 class="about__section-title">Education</h6>
        <div class="about__items">
          <div v-for="education in educationTrainings" :key="education._id" class="about__item">
            <p class="about__item-year">{{ education.year }}</p>
            <p class="about__item-school text-bold-normal">{{ education.school }}</p>
            <p class="about__item-course">{{ education.course }}</p>
          </div>
        </div>
      </div>
      <div class="about__training radius-s">
        <h6 class="about__section-title">Trainings</h6>
        <div class="about__items">
          <div v-for="training in educationTrainings" :key="training._id" class="about__item">
            <p class="about__item-year">{{ training.year }}</p>
            <p class="about__item-school text-bold-normal">{{ training.school }}</p>
            <p class="about__item-course">{{ training.course }}</p>
          </div>
        </div>
      </div>
      <div class="about__skills">
          <div class="about__tags radius-s">
            <div class="skills">
                <Tag v-for="skill in skills" :key="skill">{{ skill }}</Tag>
            </div>
            <div class="languages">
                <Tag v-for="language in crewData.profileDetails.languages" :key="language" class="tag--transparent">{{ language }}</Tag>
            </div>
          </div>
        </div>
    </div>
  </div>
  <div v-else>
    <p>No crew data available</p>
  </div>
</template>

<style scoped>
p {
    margin: 0;
}

ul {
    padding: 0%;
}
.about__jobs, .about__certifications, .about__licenses {
    width: 307px;
}

.about__jobs {
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
}

.about__jobs__container {
    display: flex;
    flex-direction: column;
    gap: 24px;
}

.about__banner {
    width: 355px;
    height: 150px;
    object-fit: cover;
}

.about {
    display: flex;
    gap: 24px;
    flex-direction: row-reverse;
    justify-content: flex-end;
    max-width: 1166px;
    max-height: 826px;
}

.about__top {
  display: flex;
  gap: 32px;
}

.about__bio {
  flex: 2;
  background-color: var(--gray);
  padding: 24px;
  height: 286px;
}

.about__bio, .about__education, .about__training, .about__skills {
    max-width: 700px;
} 

.about__info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.about__skills, .about__languages, .about__jobs {
  background-color: var(--gray);
  padding: 24px;
}

.about__tags {
    display: flex;
    gap: 8px;
    flex-direction: column;
}

.skills, .languages {
    display: flex;
    gap: 8px;
}

.about__job {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    background-color: var(--gray);
    flex-direction: column;
}

.about__job-count {
  display: flex;
  align-items: center;
  gap: 8px;
}

.about__bottom {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.about__education, .about__training, .about__certifications, .about__licenses {
  background-color: var(--gray);
  padding: 24px;
}

.about__section-title {
  color: var(--blurple);
  text-transform: uppercase;
  margin-bottom: 16px;
}

.about__items {
  display: flex;
  flex-direction: row;
  gap: 16px;
  margin: 0%;
}


.about__item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.about__item-year {
  color: var(--neutral-80);
  font-size: 14px;
}

.about__item-school {
  color: var(--blurple-70);
  font-size: 16px;
  text-transform: uppercase;
}

.about__item-course {
  font-size: 16px;
}
</style>
