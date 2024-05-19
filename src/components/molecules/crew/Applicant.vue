<script setup>

</script>

<template>
    <div class="applicant surface-tertiary radius-xs">
      <div class="applicant__top">
        <p>Applicant Name</p>
        <p>Applied for Job Title</p>
        <p>Applied Date</p>
      </div>
    </div>
  </template>
  
  <style scoped>
  .applicant {
    display: flex;
    flex-direction: column;
    width: 360px;
    padding: 20px;
    box-sizing: border-box;
    gap: 12px;
  }
  
  .applicant__top {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  </style>
  