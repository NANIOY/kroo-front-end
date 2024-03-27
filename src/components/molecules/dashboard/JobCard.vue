<script setup>
import IconLabel from '../../atoms/items/IconLabel.vue';
import TransparentButton from '../../atoms/buttons/TransparentButton.vue';

const props = defineProps({
  jobFunction: String,
  city: String,
  street: String
});
</script>

<template>
  <div class="jobCard">
    <div class="topSection">
      <div class="frame">
        <div class="iconLabelWrapper">
          <IconLabel icon="Icon1" label="Label1" />
          <IconLabel icon="Icon2" label="Label2" />
        </div>
        <TransparentButton
          class="button--tertiary--transparent, no-label" :hasIcon="true"
          iconName="MoreHoriz" />
      </div>
    </div>
    <div class="bottomSection">
      <div class="jobDetails">
        <div class="jobFunction">{{ jobFunction }}</div>
        <div class="jobLocation">
          <span>{{ city }}</span>, <span>{{ street }}</span>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
.jobCard {
  width: 276px;
  height: 304px;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
}

.topSection {
  padding: 20px;
  border-bottom: 1px solid #f0f0f0;
}

.frame {
  display: flex;
  align-items: center;
}

.iconLabelWrapper {
  margin-right: 10px;
}

.bottomSection {
  flex: 1;
  padding: 20px;
}

.jobDetails {
  display: flex;
  flex-direction: column;
}

.jobFunction {
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 8px;
}

.jobLocation {
  font-size: 14px;
  color: #666666;
}
</style>