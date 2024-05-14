<script setup>
import NormalButton from '../../atoms/buttons/NormalButton.vue';
import { IconoirProvider, Calendar } from '@iconoir/vue';
</script>

<template>
    <IconoirProvider :icon-props="{
        'color': 'var(--black)',
        'width': '16',
        'height': '16',
        'stroke-width': '1.5'
    }">

        <div id="offered__job" class="surface-tertiary radius-xs">
            <div id="offered__job__top">
                <div id="offered__job__top__business">
                    <div>
                        <img class="radius-full" src="https://placehold.co/56x56" alt="">
                    </div>
                    <div id="offered__job__top__business__name">
                        <p>name</p>
                    </div>
                </div>

                <div id="offered__job__top__right">
                    <div id="offered__job__top__right__calendar">
                        <Calendar />
                    </div>
                    <div id="offered__job__top__right__days">
                        <p>days</p>
                    </div>
                </div>
            </div>

            <div id="offered__job__jobTitle">
                <p class="text-bold-l">job title</p>
            </div>

            <div id="offered__job__info">
                <div id="offered__job__info__date">
                    <div id="offered__job__info__date__day">
                        <p>day</p>
                    </div>
                    <div id="offered__job__info__date__month">
                        <p>month</p>
                    </div>
                </div>
                <div id="offered__job__info__place">
                <div id="offered__job__info__place__city">
                    <p class="text-reg-normal">city</p>
                </div>
                <div id="offered__job__info__place__country">
                    <p class="text-reg-s">country</p>
                </div>
            </div>
            </div>

            <div id="offered__job__bottom">
                <div>
                    <p class="button-l">€ #/hr</p>
                </div>
                <div id="offered__job__bottom__buttons">
                    <NormalButton id="normalButton__details"
                        class="button--tertiary offered__job__bottom__buttons_details" :hasIcon="false" :hasLabel="true"
                        label="Details" iconName="" />
                    <NormalButton id="normalButton__accept" class="button--primary offered__job__bottom__buttons_accept"
                        :hasIcon="false" :hasLabel="true" label="Accept" iconName="" />
                </div>
            </div>
        </div>
    </IconoirProvider>
</template>

<style scoped>
p {
    margin: 0;
}

img {
    max-width: 24px;
}

#offered__job {
    display: flex;
    flex-direction: column;
    width: 360px;
    padding: 20px;
    box-sizing: border-box;
    gap: 12px;
}

#offered__job__top {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

#offered__job__top__business {
    display: flex;
    align-items: center;
    gap: 8px;
}

#offered__job__jobTitle p {
    margin: 0;
    margin-top: 12px;
}

#offered__job__info {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

#offered__job__top__right {
    display: flex;
    align-items: center;
    gap: 8px;
}

#offered__job__bottom {
    display: flex;
    align-items: center;
    gap: 24px;
    margin-top: 12px;
}

#offered__job__info__place {
    text-align: right;
}

#offered__job__bottom__buttons {
    display: flex;
    flex: 1;
    gap: 16px;
}

.offered__job__bottom__buttons_details,
.offered__job__bottom__buttons_accept {
    flex: 1;
}
</style>
