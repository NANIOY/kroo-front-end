<script setup>
import Header from '../components/molecules/login/Header.vue';
</script>

<template>
  <div class="test">
    <Header :hasBack="true" :hasText="true" header="Header"
      text="Lorem ipsum dolor sit amet consectetur. Aenean id eu tellus adipiscing facilisis cras vivamus lectus lacinia. Risus." />

    <Header :hasSteps="true" :hasSkip="true" header="Header" steps="Step name: step #/#" />
  </div>
</template>

<style scoped>
.test {
  display: flex;
  flex-direction: row;
  gap: 128px;
}
</style>