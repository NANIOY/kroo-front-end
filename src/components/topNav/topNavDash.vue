<script>
import { Iconoir, NavArrowDown, NavArrowUp } from '@iconoir/vue';

export default {
  setup() {
    const currentDate = new Date();
    const options = { day: 'numeric', month: 'long' };
    const formattedDate = currentDate.toLocaleDateString('en-GB', options);
    const dayName = currentDate.toLocaleDateString('en-GB', { weekday: 'long' });

    return {
      formattedDate,
      dayName
    };
  }
};
</script>

<template>
  <div id="navbarTop">

    <div id="navbarTop_left">

      <div id="navbarTop_left_date">
        <p class="text-bold-l">{{ formattedDate }}</p>
      </div>

      <div id="navbarTop_left_day">
        <p class="text-reg-normal">{{ dayName }}</p>
      </div>

    </div>

    <div id="navbarTop_right">

      <div id="navbarTop_right_account">

        <div id="navbarTop_right_account_image">

          <div id="navbarTop_right_account_image_wrapper">
            <img class="radius-full" src="https://placehold.co/56x56" alt="">
          </div>

        </div>

        <div id="navbarTop_right_account_info">

          <div id="navbarTop_right_account_info_name">
            <p class="text-bold-l">name</p>
          </div>

          <div id="navbarTop_right_account_info_function">
            <p class="text-reg-normal">function</p>
          </div>
        </div>

      </div>

      <div>

        <div id="navbarTop__right__switch">

          <div id="navbarTop__right__switch__arrowUp">
            <a href="#">
              <NavArrowUp />
            </a>
          </div>

          <div id="navbarTop__right__switch__arrowDown">
            <a href="#">
              <NavArrowDown />
            </a>
          </div>

        </div>

      </div>

    </div>

  </div>

</template>

<style>
#navbarTop {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  margin-bottom: 16px;
  border-bottom: 1px solid var(--black);
  margin: 32px 48px 32px 48px;
}

#navbarTop_left {
  display: flex;
  flex-direction: column;
}

#navbarTop_left_day p,
#navbarTop_left_date p {
  margin: 0;
}

#navbarTop_right {
  display: flex;
  align-items: center;
}

#navbarTop_right_account {
  display: flex;
  align-items: center;
}

#navbarTop_right_account_image {
  margin-right: 16px;
}

#navbarTop_right_account_image_wrapper img {
  max-width: 56px;
  max-height: 56px;
}

#navbarTop_right_account_info {
  margin-right: 8px;
}

#navbarTop_right_account_info_name p,
#navbarTop_right_account_info_function p {
  margin: 0;
}

#navbarTop__right__switch {
  display: flex;
  flex-direction: column;

}

#navbarTop__right__switch__arrowUp a,
#navbarTop__right__switch__arrowDown a {
  color: var(--black);
}
</style>
