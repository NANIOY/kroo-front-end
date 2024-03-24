<script setup>
import NavbarLabel from '../../atoms/items/NavbarLabel.vue';

</script>


<template>
    <div id="navbar">
      <div id="navbar__contents">
        <div id="navbar_contents__logo">
          <img src="../../../assets/logomark-color.webp" alt="Logo" width="40" height="40" />
        </div>
        <div id="navbar_contents--items">
          <div id="navbar_item--items_menu">
            <NavbarLabel iconName="ReportColumns" :hasLabel=false darkMode />
            <NavbarLabel iconName="Calendar" :hasLabel=false darkMode />
            <NavbarLabel iconName="Search" :hasLabel=false darkMode />
            <NavbarLabel iconName="Bookmark" :hasLabel=false darkMode />
            <NavbarLabel iconName="Tools" :hasLabel=false darkMode />
          </div>
          <div id="navbar_contents--items_account">
            <NavbarLabel iconName="User" :hasLabel=false darkMode />
            <NavbarLabel iconName="Bell" :hasLabel=false darkMode />
            <NavbarLabel iconName="Settings" :hasLabel=false darkMode />
            <NavbarLabel iconName="HelpCircle" :hasLabel=false darkMode />
          </div>
        </div>
      </div>
    </div>
</template>

<style>
#navbar {
  background-color: var(--black);
  display: flex;
  flex-direction: column;
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
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.navbar_item {
  cursor: pointer;
}

#navbar_contents--items_account,
#navbar_item--items_menu {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  align-items: center;
}

#navbar_contents--items_account {
  margin-bottom: 3.5rem;
}
</style>