<template>
  <div class="search-filter">
    <div class="search-input">
      <input type="text" v-model="searchText" :placeholder="placeholderText" />
    </div>
    <div class="filter-options">
      <div class="filter-option">
        <span @click="toggleDropdown('sort')">Sort by</span>
        <ul v-if="activeDropdown === 'sort'" class="dropdown">
          <li @click="sortBy('time')">Sort by Time</li>
          <li @click="sortBy('name')">Sort by Name</li>
          <li @click="sortBy('category')">Sort by Category</li>
        </ul>
      </div>
      <div class="filter-option">
        <span @click="toggleDropdown('time')">Time</span>
        <ul v-if="activeDropdown === 'time'" class="dropdown">
          <li v-for="(option, index) in timeOptions" :key="index" @click="toggleOption(index)">
            <input type="checkbox" :checked="selectedOptions.includes(index)" @click.stop />
            <span>{{ option }}</span>
          </li>
          <li @click="toggleMoreOptions('time')">more</li>
        </ul>
      </div>
      <div class="filter-option">
        <span @click="toggleDropdown('distance')">Distance (km)</span>
        <ul v-if="activeDropdown === 'distance'" class="dropdown">
          <li>
            <div class="slider">
              <input type="range" min="0" max="100" v-model="sliderValue" />
              <span>{{ sliderValue }}</span>
            </div>
          </li>
        </ul>
      </div>
      <div class="filter-option">
        <span @click="toggleDropdown('function')">Function</span>
        <ul v-if="activeDropdown === 'function'" class="dropdown">
          <!-- Dropdown items for function -->
          <li v-for="(option, index) in functionOptions" :key="index" @click="toggleOption(index)">
            <input type="checkbox" :checked="selectedOptions.includes(index)" @click.stop />
            <span>{{ option }}</span>
          </li>
          <li @click="toggleMoreOptions('function')">more</li>
        </ul>
      </div>
      <div class="filter-option">
        <span @click="toggleDropdown('urgency')">Urgency</span>
        <ul v-if="activeDropdown === 'urgency'" class="dropdown">
          <!-- Dropdown items for urgency -->
          <li v-for="(option, index) in urgencyOptions" :key="index" @click="toggleOption(index)">
            <input type="checkbox" :checked="selectedOptions.includes(index)" @click.stop />
            <span>{{ option }}</span>
          </li>
          <li @click="toggleMoreOptions('urgency')">more</li>
        </ul>
      </div>
      <div class="filter-option">
        <span @click="toggleDropdown('productionType')">Production type</span>
        <ul v-if="activeDropdown === 'productionType'" class="dropdown">
          <!-- Dropdown items for production type -->
          <li v-for="(option, index) in productionTypeOptions" :key="index" @click="toggleOption(index)">
            <input type="checkbox" :checked="selectedOptions.includes(index)" @click.stop />
            <span>{{ option }}</span>
          </li>
          <li @click="toggleMoreOptions('productionType')">more</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeDropdown: null,
      functionOptions: ['Option 1', 'Option 2', 'Option 3'],
      urgencyOptions: ['Option 1', 'Option 2', 'Option 3'],
      productionTypeOptions: ['Option 1', 'Option 2', 'Option 3'],
      timeOptions: ['Only show when I’m available', 'Option 2', 'Option 3', 'more'],
      selectedOptions: [], // Array to store the selected options
      sliderValue: 0 // Slider value
    };
  },
  methods: {
    toggleDropdown(option) {
      this.activeDropdown = (this.activeDropdown === option) ? null : option;
    },
    toggleOption(index) {
      if (this.selectedOptions.includes(index)) {
        this.selectedOptions = this.selectedOptions.filter(optionIndex => optionIndex !== index);
      } else {
        this.selectedOptions.push(index);
      }
    },
    toggleMoreOptions(option) {
      // Handle showing more options if needed
    },
    sortBy(option) {
      // Handle sorting logic based on the selected option
      console.log('Sorting by:', option);
    }
  }
};
</script>

<style scoped>
.search-filter {
  display: flex;
  flex-direction: column;
  /* Ensure items are displayed in a column */
}

.filter-options {
  display: flex;
  flex-direction: column;
  /* Ensure items are displayed in a column */
}

.filter-option {
  margin-bottom: 20px;
  /* Add margin between each option */
}

.dropdown {
  list-style: none;
  padding: 0;
}

.dropdown li {
  cursor: pointer;
}

.slider {
  margin-top: 20px;
}

.more-options {
  margin-top: 20px;
}

.more-dropdown {
  list-style: none;
  padding: 0;
}

.more-dropdown li {
  cursor: pointer;
}
</style>
