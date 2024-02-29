<template>
    <div id="navbar">
      <div id="navbar_contents">
        <div id="navbar_contents--logo">Logo</div>
        <div id="navbar_contents--items">
          <div class="navbar_item--items_menu">Dashboard Icon</div>
          <div class="navbar_item">Schedule Icon</div>
          <div class="navbar_item">Search Icon</div>
          <div class="navbar_item">Tracker Icon</div>
          <div class="navbar_item">Tools Icon</div>
        </div>
        <div id="navbar_contents--items_account">
          <div class="navbar_item">User Icon</div>
          <div class="navbar_item">Notifications Icon</div>
          <div class="navbar_item">Settings Icon</div>
          <div class="navbar_item">Help & Support Icon</div>
        </div>
      </div>
    </div>
  </template>
  
  <style>
#navbar {
  background-color: #0E0F0F;
  color: white;
  display: flex;
  flex-direction: column; /* Set the direction to column for vertical layout */
}

#navbar_contents {
  padding: 10px;
}

#navbar_contents--logo {
  font-size: 1.5rem;
}

#navbar_contents--items {
  display: flex;
  flex-direction: column; /* Set the direction to column for vertical layout */
  gap: 10px;
}

.navbar_item {
  cursor: pointer;
}

.icon-space {
  margin-top: 20px; /* Adjust the margin as needed */
}
</style>