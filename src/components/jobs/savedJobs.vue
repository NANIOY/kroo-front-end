<script setup>
import transparentButton from '../buttons/TransparentButton.vue';
import normalButton from '../buttons/NormalButton.vue';


</script>


<template>

<div id="saved__job" class="border radius-xs">
    <div id="saved__job__top">
        <div id="saved__job__top__business">
            <div id="saved__job__top__business__image">
                <img class="radius-full" src="https://placehold.co/56x56" alt="">
            </div>
            <div id="saved__job__top__business__name">
                <p>name</p>
            </div>
        </div>
        <div id="saved__job__top__settings">
            <transparentButton
            class="button--tertiary"
                :hasIcon="true"
                :hasLabel="false"
                label="Details"
                iconName="MoreHoriz" 
            />
        </div>
    </div>

    <div id="saved__job__jobTitle">
        <p class="text-bold-l">job title</p>
    </div>

    <div id="saved__job__info">
        <div id="saved__job__info__date">
            <div id="saved__job__info__date__day">
                <p>day</p>
            </div>
            <div id="saved__job__info__date__month">
                <p>month</p>
            </div>
        </div>
        <div id="saved__job__info__place">
            <div id="saved__job__info__place__code">
                <p>zip code</p>
            </div>
            <div id="saved__job__info__place__country">
                <p>country</p>
            </div>
        </div>
    </div>

    <normalButton id="saved__job__details"
    class="button--tertiary button__stroke"
      :hasIcon="false"
      :hasLabel="true"
      label="Details"
      iconName="" 
      />

</div>

</template>
  
<style scoped>

p {
    margin: 0;
}

img {
    max-width: 24px;
}

#saved__job {
    display: flex;
    flex-direction: column;
    width: 360px;
    padding: 12px;
}

#saved__job__top {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

#saved__job__top__business {
    display: flex;
    align-items: center;
}

#saved__job__top__business__image {
    margin-right: 8px;
}

#saved__job__jobTitle p {
    margin: 0;
    margin-top: 12px;
}



#saved__job__info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 12px;
    margin-bottom: 12px;
}

#saved__job__details {
    width: 100%;
}



</style>