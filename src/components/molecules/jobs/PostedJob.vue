<script setup>
import { onMounted, ref } from 'vue';
import { IconoirProvider, User } from '@iconoir/vue';
import NormalButton from '../../atoms/buttons/NormalButton.vue';
import setupAxios from '../../../setupAxios';

</script>

<template>
    <IconoirProvider :icon-props="{
        'color': 'var(--black)',
        'width': '20',
        'height': '20',
        'stroke-width': '1.8'
    }">
        <div id="posted__job" class="surface-tertiary radius-xs">
            <div id="posted__job__top">
                <div id="posted__job__top__left">
                    <div id="posted__job__top__left__title">
                        <p class="text-bold-l">Title</p>
                    </div>
                    <div id="posted__job__top__left__function">
                        <p class="text-reg-s">Function</p>
                    </div>
                </div>

                <div id="posted__job__top__right">
                    <div id="posted__job__top__right__count">
                        <p>0</p>
                    </div>
                    <div id="posted__job__top__right__applicants">
                        <User />
                    </div>
                </div>
            </div>

            <div id="posted__job__info">
                <div id="posted__job__info__date">
                    <div id="posted__job__info__date__day">
                        <p>date</p>
                    </div>
                    <div id="posted__job__info__date__month">
                        <p class="text-reg-s">month</p>
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
                <NormalButton id="normalButton__details" class="button--primary" :hasIcon="false" :hasLabel="true"
                    label="Details" :hasRequest="false" />
            </div>
        </div>
    </IconoirProvider>
</template>

<style scoped>
/* GENERAL */
p {
    margin: 0;
}

#posted__job {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
    gap: 12px;
}

/* TOP */
#posted__job__top {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

#posted__job__top__left {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

#posted__job__top__left__function {
    color: var(--neutral-70);
}

#posted__job__top__right {
    display: flex;
    align-items: center;
    gap: 8px;
}

/* INFO */
#posted__job__info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 4px;
}

#posted__job__info__place {
    text-align: right;
}

/* BUTTONS */
#posted__job__buttons {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-top: 12px;
    gap: 16px;
}

#normalButton__details {
    flex: 1;
}
</style>