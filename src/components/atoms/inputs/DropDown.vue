<template>
  <div style="margin-left: 20%;">
    <label class="text-reg-" for="standard-select">Standard Select</label>
    <div class="select">
      <select id="standard-select" class="custom-select">
        <option value="Option 1">Option 1</option>
        <option value="Option 2">Option 2</option>
        <option value="Option 3">Option 3</option>
        <option value="Option 4">Option 4</option>
        <option value="Option 5">Option 5</option>
        <option value="Option length">Option that has too long of a value to fit</option>
      </select>
      <span class="focus"></span>
    </div>
  </div>
</template>

<style scoped>
.select {
  font-family: var(--font-body);
  color: var(--black);
}

.custom-select {
  width: 392px;
  height: 48px;
  border: 2px solid var(--black);
  border-radius: 4px;
  cursor: pointer;
  padding-left: 12px;
  background-color: var(--your-custom-background-color); /* Customize background color */
}

.custom-select:hover {
  border-color: var(--blurple);
}

.custom-select option {
  color: var(--blurple); /* Customize option text color */
  padding: 10px; /* Customize option padding */
  background-color: var(--your-custom-option-background-color); /* Customize option background color */
}
</style>
