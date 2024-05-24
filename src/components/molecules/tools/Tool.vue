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
        <!-- Icon with round glowing border radius -->
        <img src="../../../../public/assets/paymentMethod/Bancontact.webp" alt="icon" class="icon">
      </div>
      <div class="content">
        <!-- Title -->
        <h2>{{ title }}</h2>
        <!-- Text -->
        <p>{{ text }}</p>
      </div>
      <!-- Replace the toggle button with the toggle component -->
      <toggle :isDisabled="false" @toggle="toggleVisibility"></toggle>
    </div>
  </template>

  <style scoped>
  .tool-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
  }
  
  .icon-container {
    border: 2px solid #00f;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 255, 0.5);
  }
  
  .icon {
    width: 50px; /* Adjust size as needed */
    height: 50px; /* Adjust size as needed */
  }
  
  .content {
    margin-left: 20px; /* Adjust spacing as needed */
  }
  </style>  