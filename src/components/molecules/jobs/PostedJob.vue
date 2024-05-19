<script setup>
import NormalButton from '../../atoms/buttons/NormalButton.vue';
import { onMounted, ref } from 'vue';
import setupAxios from '../../../setupAxios';

</script>

<template>
    <div id="posted__job" class="surface-tertiary radius-xs">
        <div id="posted__job__top">
            <div id="posted__job__top__business">
                <div id="posted__job__top__business__image">
                    <img class="radius-full" src="https://placehold.co/56x56" alt="Business logo">
                </div>
                <div id="posted__job__top__business__name">
                    <p>Business</p>
                </div>

            </div>
        </div>

        <div id="posted__job__jobTitle">
            <p class="text-bold-l">title</p>
        </div>

        <div id="posted__job__info">
            <div id="posted__job__info__date">
                <div id="posted__job__info__date__day">
                    <p>date</p>
                </div>
            </div>
            <div id="posted__job__info__place">
                <div id="posted__job__info__place__city">
                    <p class="text-reg-normal">city</p>
                </div>
                <div id="posted__job__info__place__country">
                    <p class="text-reg-s">country</p>
                </div>
            </div>
        </div>

        <div id="posted__job__buttons">
            <NormalButton id="normalButton__cancel" class="button--tertiary button__stroke" :hasIcon="false"
                :hasLabel="true" label="Unsave" />
            <NormalButton id="normalButton__details" class="button--primary" :hasIcon="false" :hasLabel="true"
                label="Details" :hasRequest="false" />
        </div>
    </div>
</template>

<style scoped>
p {
    margin: 0;
}

img {
    max-width: 24px;
}

#posted__job {
    display: flex;
    flex-direction: column;
    width: 360px;
    padding: 20px;
    box-sizing: border-box;
    gap: 12px;
}

#posted__job__top {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

#posted__job__top__business {
    display: flex;
    align-items: center;
    gap: 8px;
}

#posted__job__jobTitle p {
    margin: 0;
    margin-top: 12px;
}

#posted__job__info {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

#posted__job__info__place {
    text-align: right;
}

#posted__job__buttons {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-top: 12px;
    gap: 16px;
}

#normalButton__cancel,
#normalButton__details {
    flex: 1;
}
</style>