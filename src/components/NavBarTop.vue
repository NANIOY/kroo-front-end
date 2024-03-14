<script setup>
 import { Iconoir, NavArrowDown, NavArrowUp} from '@iconoir/vue';
</script>

<template>
  <div id="navbarTop">

    <div id="navbarTop_left">
      
      <div id="navbarTop_left_date">
        <p>date</p>
      </div>

      <div id="navbarTop_left_day">
        <p>day</p>
      </div>

    </div>

    <div id="navbarTop_right">

      <div id="navbarTop_right_account">
        
        <div id="navbarTop_right_account_profile">
          <img src="https://placehold.co/40x40" alt="">
        </div>

        <div id="navbarTop_right_account_name">
          <p>name</p>
        </div>

        <div id="navbarTop_right_account_function">
          <p>function</p>
        </div>

      </div>

      <div>

        <div>

          <div class="navbarTop_right_up">
            <a href="#"><NavArrowUp/></a>
          </div>

          <div class="navbarTop_right_down">
            <a href="#"><NavArrowDown/></a>
          </div>

        </div>

      </div>

    </div>

  </div>

</template>

<style>

</style>
