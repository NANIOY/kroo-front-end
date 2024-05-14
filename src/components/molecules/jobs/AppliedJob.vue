<script setup>
import NormalButton from '../../atoms/buttons/NormalButton.vue';
</script>

<template>
    <div id="applied__job" class="surface-tertiary radius-xs">
        <div id="applied__job__top">
            <div id="applied__job__top__business">
                <div>
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
            <NormalButton id="normalButton__cancel" class="button--tertiary button__stroke" :hasIcon="false" :hasLabel="true"
                label="Cancel" iconName="" />
            <NormalButton id="normalButton__details" class="button--primary" :hasIcon="false" :hasLabel="true"
                label="Details" iconName="" />
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
    padding: 20px;
    box-sizing: border-box;
    gap: 12px;
}

#applied__job__top {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

#applied__job__top__business {
    display: flex;
    align-items: center;
    gap: 8px;
}

#applied__job__jobTitle p {
    margin: 0;
    margin-top: 12px;
}

#applied__job__buttons {
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
