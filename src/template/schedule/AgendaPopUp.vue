<script>
import NormalButton from '../../components/atoms/buttons/NormalButton.vue';
import { Xmark } from '@iconoir/vue';

export default {
  props: {
    button1Label: {
      type: String,
      default: 'Button 1'
    },
    button2Label: {
      type: String,
      default: 'Button 2'
    }
  },
  components: {
    NormalButton,
    Xmark,
  },
};
</script>

<template>
    <div class="backPlate">
      <div class="buttonicon-container">
        <div class="button-left">
          <NormalButton :label="button1Label" />
          <NormalButton :label="button2Label" />
        </div>
        <div class="icon-coontainer">
          <Xmark class="icon" />
        </div>
      </div>
    </div>
  </template>
  
  <style>
  .backPlate {
    width: 600px;
    height: 674px;
    background-color: var(--white);
    border-radius: 8px;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  }
  
  .buttonicon-container {
    display: flex;
    justify-content: space-between; 
    padding-top: 48px;
  }
  
  .button-left {
    display: flex;
    margin-left: 48px; 
    gap:12px;
  }
  
  .icon-coontainer{
    display: flex;
    margin-right: 48px; 
  }
  
  .icon {
    font-size: 24px;
  }
  </style>