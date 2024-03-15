<script setup>
import transparentButton from '../buttons/TransparentButton.vue';
import normalButton from '../buttons/NormalButton.vue';


</script>


<template>

<div id="applied__job" class="border radius-xs">
    <div id="applied__job__top">
        <div id="applied__job__top__business">
            <div id="applied__job__top__business__image">
                <img class="radius-full" src="https://placehold.co/56x56" alt="">
            </div>
            <div id="applied__job__top__business__name">
                <p>name</p>
            </div>
        </div>
        <div id="applied__job__top__settings">
            <transparentButton
            class="button--tertiary"
                :hasIcon="true"
                :hasLabel="false"
                label="Details"
                iconName="MoreHoriz" 
            />
        </div>
    </div>

    <div id="applied__job__jobTitle">
        <p class="text-bold-l">job title</p>
    </div>

    <div id="applied__job__info">
        <div id="applied__job__info__date">
            <div id="applied__job__info__date__day">
                <p>day</p>
            </div>
            <div id="applied__job__info__date__month">
                <p>month</p>
            </div>
        </div>
        <div id="applied__job__info__place">
            <div id="applied__job__info__place__code">
                <p>zip code</p>
            </div>
            <div id="applied__job__info__place__country">
                <p>country</p>
            </div>
        </div>
    </div>

    <normalButton
    class="button--tertiary button__stroke"
      :hasIcon="false"
      :hasLabel="true"
      label="Details"
      iconName="" 
      />

</div>

</template>
  
<style>
#applied__job {
    display: flex;
    flex-direction: column;
    width: 360px;
}

#applied__job__top {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

#applied__job__top__business {
    display: flex;
    align-items: center;
}

#applied__job__top__business__image {
    margin-right: 16px;
}

#applied__job__jobTitle p {
    margin: 0;
}

#applied__job__info {
    display: flex;
    justify-content: space-between;
    align-items: center;
}



</style>