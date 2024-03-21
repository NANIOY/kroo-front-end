<script setup>
import transparentButton from '../buttons/TransparentButton.vue';
import normalButton from '../buttons/NormalButton.vue';


</script>


<template>

    <div id="ongoing__job" class="surface-tertiary radius-xs">
        <div id="ongoing__job__top">
            <div id="ongoing__job__top__business">
                <div id="ongoing__job__top__business__image">
                    <img class="radius-full" src="https://placehold.co/56x56" alt="">
                </div>
                <div id="ongoing__job__top__business__name">
                    <p>name</p>
                </div>
            </div>
        </div>

        <div id="ongoing__job__jobTitle">
            <p class="text-bold-l">job title</p>
        </div>

        <div id="ongoing__job__info">
            <div id="ongoing__job__info__date">
                <div id="ongoing__job__info__date__day">
                    <p>day</p>
                </div>
                <div id="ongoing__job__info__date__month">
                    <p>month</p>
                </div>
            </div>
            <div id="ongoing__job__info__place">
                <div id="ongoing__job__info__place__code">
                    <p>zip code</p>
                </div>
                <div id="ongoing__job__info__place__country">
                    <p>country</p>
                </div>
            </div>
        </div>
        <div id="ongoing__job__buttons">
            <div id="ongoing_job__buttons-cancel">
                <normalButton id="normalButton__cancel" class="button--tertiary button__stroke" :hasIcon="false"
                    :hasLabel="true" label="Cancel" iconName="" />
            </div>
            <div id="applied_job__buttons-details">
                <normalButton id="normalButton__details" class="button--primary" :hasIcon="false" :hasLabel="true"
                    label="Details" iconName="" />
            </div>
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

#ongoing__job {
    display: flex;
    flex-direction: column;
    width: 360px;
    padding: 12px;
}

#ongoing__job__top {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

#ongoing__job__top__business {
    display: flex;
    align-items: center;
}

#ongoing__job__top__business__image {
    margin-right: 8px;
}

#ongoing__job__jobTitle p {
    margin: 0;
    margin-top: 12px;
}



#ongoing__job__info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 12px;
    margin-bottom: 12px;
}

#ongoing__job__details {
    width: 100%;
}

#ongoing__job__buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 24px;
}
</style>