<script setup>
import IconLabel from '../../atoms/items/IconLabel.vue';
import TransparentButton from '../../atoms/buttons/TransparentButton.vue';

const props = defineProps({
  jobFunction: String,
  city: String,
  street: String,
  date: String,
  time: String,
  cardType: {
    type: String,
    default: 'default'
  }
});
</script>

<template>
  <div :class="[`jobCard jobCard--${cardType}`]">
    <div class="jobCard__content">
      <div class="jobCard__topSection">
        <div class="jobCard__topSection__labels">
          <IconLabel :iconName="'Calendar'" :label="date" size="small"
            :textColor="cardType === 'highlight' ? 'var(--white)' : null" />
          <IconLabel :iconName="'Clock'" :label="time" size="small"
            :textColor="cardType === 'highlight' ? 'var(--white)' : null" />
        </div>
        <TransparentButton class="jobCard__topSection__button no-label" :hasIcon="true" iconName="MoreHoriz"
          :color="cardType === 'highlight' ? 'var(--white)' : null" />
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
/*  JOB CARD  */
.jobCard,
.jobCard__topSection,
.jobCard__topSection__labels,
.jobCard__bottomSection,
.jobCard__bottomSection__location {
  display: flex;
  flex-direction: column;
}

.jobCard {
  border-radius: 4px;
  background-color: var(--neutral-20);
  height: 304px;
}

.jobCard--default {
  width: 276px;
  color: var(--black);
}

.jobCard--highlight {
  width: 552px;
  background-color: var(--blurple);
  color: var(--white);
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