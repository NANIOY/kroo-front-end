<script setup>
 import { IconoirProvider, Iconoir, NavArrowDown, NavArrowUp} from '@iconoir/vue';

 


</script>

<template>

<IconoirProvider
    :icon-props="{
      'color': 'var(--black)',
      'width': '24',
      'height': '24'
    }"
  >
  </IconoirProvider>

  <p >Hello Navbar top</p>

  <div>

    <div>

            <div class="navbarTop_left">

                <div>
                <p>datum</p>
                </div>

                <div>
                    <p>dag</p>
                </div>

            </div>

            <div>

                <div class="nav-right">
                <p>profielfoto</p>
                </div>

                <div>
                    <p>Name</p>
                </div>

                <div>
                    <p>Function</p>
                </div>

          <div class="navbarTop_item">
            <a href="#"><NavArrowUp/></a>
          </div>
                
          <div class="navbarTop_item">
            <a href="#"><NavArrowDown/></a>
          </div>

            </div>

        </div>

    </div>

</template>

<style>

.navbarTop_left{
    display: flex;
    flex-direction: row;
    gap: 0.5rem
}



</style>
