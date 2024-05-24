<script>
// Import the toggle component
import Toggle from '../../atoms/selectors/Toggle.vue';

export default {
  components: {
    Toggle
  },
  data() {
    return {
      isVisible: true,
      title: 'Title',
      text: 'Text'
    };
  },
  methods: {
    toggleVisibility() {
      this.isVisible = !this.isVisible;
    }
  }
};
</script>

<template>
  <div class="tool-container">
    <div class="icon-container">
      <!-- Circle for image with the specified dimensions and style -->
      <div class="circle"></div>
    </div>
    <div class="content">
      <!-- Title with class "custom-title" -->
      <h2 class="custom-title .text-bold-l">{{ title }}</h2>
      <!-- Text -->
      <p>{{ text }}</p>
    </div>
    <!-- Replace the toggle button with the toggle component -->
    <toggle :isDisabled="false" @toggle="toggleVisibility"></toggle>
  </div>
</template>

<style scoped>
.tool-container {
  width: 400px;
  height: 289px;
  flex-shrink: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  border-radius: var(--radius-radius-XS, 4px);
  background: var(--neutral-20);
}

.icon-container {
  width: 33.6px;
  height: 33.6px;
  flex-shrink: 0;
  border-radius: 5999.4px;
  border: 0.6px solid #4A52BD;
  background: rgba(74, 82, 189, 0.15);
  box-shadow: 0px 0px 4.8px 0.6px #4A52BD;
  display: flex;
  align-items: center;
  justify-content: center;
}

.circle {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  border-radius: 50%;
  background: url('../../../../public/assets/paymentMethod/Bancontact.webp') lightgray -6.667px -6.429px / 171.429% 171.429% no-repeat;
}

.content {
  margin-left: 20px; 
}

.custom-title {
  width: 221px;
  color: var(--color-text-text-primary, #0E0F0F);
  line-height: 140%; /* 28px */
}
</style>