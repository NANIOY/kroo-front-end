<script setup>
import IconLabel from '../../atoms/items/IconLabel.vue';
import TransparentButton from '../../atoms/buttons/TransparentButton.vue';

const props = defineProps({
    date: String,
    title: String,
    func: String,
    applicants: String,
    status: String,
    cardType: {
        type: String,
        default: 'default'
    }
});
</script>

<template>
    <div :class="[`jobCard jobCard--${cardType}`]">
        <div class="jobCard__content">
            <div class="jobCard__topSection">
                <div class="jobCard__topSection__labels">
                    <IconLabel :iconName="'User'" :label="applicants" size="small"
                        :textColor="cardType === 'highlight' ? 'var(--white)' : null" />
                    <IconLabel :iconName="'InfoCircle'" :label="status" size="small"
                        :textColor="cardType === 'highlight' ? 'var(--white)' : null" />
                </div>
                <TransparentButton class="jobCard__topSection__button no-label" :hasIcon="true" iconName="MoreHoriz"
                    :color="cardType === 'highlight' ? 'var(--white)' : null" />
            </div>
            <div class="jobCard__bottomSection">
                <div class="jobCard__bottomSection__function">{{ date }}</div>
                <div class="jobCard__bottomSection__location">
                    <h3 class="jobCard__bottomSection__location__title">{{ title }}</h3>
                    <h5 class="jobCard__bottomSection__location__func">{{ func }}</h5>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
/*  JOB CARD  */
.jobCard,
.jobCard__topSection,
.jobCard__topSection__labels,
.jobCard__bottomSection,
.jobCard__bottomSection__location {
    display: flex;
    flex-direction: column;
}

.jobCard {
    border-radius: 4px;
    background-color: var(--neutral-20);
    height: 304px;
    transition: 0.3s ease-in-out;
    cursor: pointer;
}

.jobCard--default {
    width: 276px;
    color: var(--black);
}

.jobCard--highlight {
    width: 552px;
    background-color: var(--blurple);
    color: var(--white);
}

.jobCard__content {
    display: flex;
    flex: 1;
    flex-direction: column;
    padding: 24px;
}

/*  TOP SECTION  */
.jobCard__topSection {
    display: flex;
    flex-direction: row;
    align-items: start;
    justify-content: space-between;
}

.jobCard__topSection__labels {
    gap: 12px;
}

/*  BOTTOM SECTION  */
.jobCard__bottomSection {
    margin-top: auto;
    gap: 12px;
}

.jobCard__bottomSection__function {
    font-family: var(--font-header);
    font-size: 16px;
    text-transform: uppercase;
}

.jobCard__bottomSection__location {
    gap: 6px;
}

h3,
h5 {
    margin: 0;
    font-weight: 100;
    word-break: break-word;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
}

/*  PSEUDO CLASSES  */
.jobCard--default:hover {
    filter: brightness(92%);
}

.jobCard--highlight:hover {
    filter: brightness(112%);
}
</style>