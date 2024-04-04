<script setup>
import transparentButton from '../../atoms/buttons/TransparentButton.vue';
import normalButton from '../../atoms/buttons/NormalButton.vue';


</script>


<template>

    <div id="applied__job" class="radius-xs surface-tertiary">
        <div id="applied__job__top">
            <div id="applied__job__top__business">
                <div id="applied__job__top__business__image">
                    <img class="radius-full" src="https://placehold.co/56x56" alt="">
                </div>
                <div id="applied__job__top__business__name">
                    <p>name</p>
                </div>
            </div>
        </div>
        <div id="applied__job__jobTitle">
            <p class="text-bold-l">job title</p>
        </div>
        <div id="applied__job__buttons">
            <div id="applied_job__buttons-cancel">
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

#applied__job {
    display: flex;
    flex-direction: column;
    width: 360px;
    padding: 12px;
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
    margin-right: 8px;
}

#applied__job__jobTitle p {
    margin: 0;
    margin-top: 12px;
}

#applied__job__buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 24px;
}

#normalButton__cancel,
#normalButton__details {
    width: 168px;
}
</style>