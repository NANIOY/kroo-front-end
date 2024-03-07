<script setup>

import { IconoirProvider, Iconoir, ReportColumns, Calendar, Search, Tools, User, Bookmark, Bell, Settings, HelpCircle} from '@iconoir/vue';

</script>


<template>

<IconoirProvider
    :icon-props="{
      'color': '#F5F5F5',
      'width': '24',
      'height': '24'
    }"
  >
  </IconoirProvider>

    <div id="navbar">
      <div id="navbar__contents">
        <div id="navbar_contents__logo">
          <img src="../assets/logomark-color.webp" alt="Logo" width="40" height="40" />
        </div>
        <div id="navbar_contents--items">

        <div id="navbar_item--items_menu">

          <div class="navbar_item">
            <a href="../views/Dashboard.vue"><ReportColumns/></a>
          </div>

          <div class="navbar_item">
            <a href="../views/Calendar.vue"><Calendar/></a>
          </div>

          <div class="navbar_item"> 
            <a href="../views/Search.vue"><Search/></a>
          </div>

          <div class="navbar_item">
            <a href="../views/Tracker.vue"><Bookmark/></a>
          </div>
          
          <div class="navbar_item">
            <a href="../views/Tools.vue"><Tools/></a>
          </div>

        </div>

        <div id="navbar_contents--items_account">

          <div class="navbar_item">
            <a href="../views/User.vue"><User/></a>
          </div>
          
          <div class="navbar_item">
            <a href="#"><Bell/></a>
          </div>

          <div class="navbar_item">
            <a href="../views/Settings.vue"><Settings/></a>
          </div>

          <div class="navbar_item">
            <a href="../views/Help.vue"><HelpCircle/></a>
          <div>

          </div>

              </div>
            </div>
        </div>
      </div>
    </div>
  </template>
  
  <style>
  
    #navbar {
      background-color: #0E0F0F;
      display: flex;
      flex-direction: column; /* Set the direction to column for vertical layout */
      width: 96px; 
      height: 100dvh;
      position: fixed;
      top: 0%;
      left: 0%;
      padding: 1rem 0.1rem 0rem 0.1rem;
      text-align: center;
      line-height: 1.5;
    }

    #navbar_contents__logo {
      padding-bottom: 3.5rem;
    }

    #navbar__contents {
      padding: 10px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;

    }

    #navbar_contents--logo {
      font-size: 1.5rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    #navbar_contents--items {
      display: flex;
      flex-direction: column; /* Set the direction to column for vertical layout */
      justify-content: space-between;
      height: 100%;
    }

    .navbar_item {
      cursor: pointer;
    }

    #navbar_contents--items_account, #navbar_item--items_menu {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
    }

    #navbar_contents--items_account {
      margin-bottom: 3.5rem;
}

</style>