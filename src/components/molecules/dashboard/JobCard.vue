<script setup>
import IconLabel from '../../atoms/items/IconLabel.vue';
import TransparentButton from '../../atoms/buttons/TransparentButton.vue';

const props = defineProps({
  jobFunction: String,
  city: String,
  street: String,
  date: String,
  time: String
});
</script>

<template>
  <div class="jobCard jobCard--default">
    <div class="jobCard__content">
      <div class="jobCard__topSection">
        <div class="jobCard__topSection__labels">
          <IconLabel :iconName="'Calendar'" :label="date" size="small" />
          <IconLabel :iconName="'Clock'" :label="time" size="small" />
        </div>
        <TransparentButton class="jobCard__topSection__button no-label" :hasIcon="true" iconName="MoreHoriz" />
      </div>
      <div class="jobCard__bottomSection">
        <div class="jobCard__bottomSection__function">{{ jobFunction }}</div>
        <div class="jobCard__bottomSection__location">
          <h3 class="jobCard__bottomSection__location__city">{{ city }}</h3>
          <h5 class="jobCard__bottomSection__location__street">{{ street }}</h5>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.jobCard,
.jobCard__topSection,
.jobCard__topSection__labels,
.jobCard__bottomSection,
.jobCard__bottomSection__location {
  display: flex;
  flex-direction: column;
}

.jobCard {
  width: 276px;
  height: 304px;
  border-radius: 4px;
  background-color: var(--neutral-20);
}

.jobCard__content {
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 24px;
}

/*  TOP SECTION  */
.jobCard__topSection {
  display: flex;
  flex-direction: row;
  align-items: start;
  justify-content: space-between;
}

.jobCard__topSection__labels {
  gap: 12px;
}

/*  BOTTOM SECTION  */
.jobCard__bottomSection {
  margin-top: auto;
  gap: 12px;
}

.jobCard__bottomSection__function {
  font-family: var(--font-header);
  font-size: 16px;
  text-transform: uppercase;
}

.jobCard__bottomSection__location {
  gap: 6px;
}

h3,
h5 {
  margin: 0;
  font-weight: 100;
}
</style>