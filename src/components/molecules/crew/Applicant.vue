<script setup>
import { defineProps, ref, onMounted } from 'vue';
import NormalButton from '../../atoms/buttons/NormalButton.vue';

const props = defineProps({
    applicant: {
        type: Object,
        required: true
    }
});
</script>

<template>
    <div class="applicant surface-tertiary radius-xs">
        <div class="applicant__top">
            <img :src="applicant.image || 'https://res.cloudinary.com/dqzaz6d2o/image/upload/v1715265202/user-images/jji0f5zxxzaop7kkihn7.png'"
                class="applicant__top__image" alt="Crew image" />
            <h4 class="applicant__top__name">{{ applicant.name }}</h4>
        </div>

        <div id="applicant__info">
            <div class="applicant__info__left">
                <p class="text-reg-normal">Job title</p>
            </div>
            <div id="applicant__info__right">
                <p>27/09</p>
            </div>
        </div>

        <div class="applicant__bot">
            <NormalButton label="Reject" class="applicant__bot__button button--tertiary" :endpoint="``" :postData="{}"
                @click.stop />
            <NormalButton label="Accept" class="applicant__bot__button button--primary" :endpoint="``" :postData="{}"
                @click.stop />
        </div>
    </div>
</template>

<style scoped>
/* GENERAL */
p {
    margin: 0;
}

.applicant {
    flex-direction: column;
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
    gap: 12px;
}

.applicant,
.applicant__info,
.applicant__top,
.applicant__mid,
.applicant__bot,
#applicant__info {
    display: flex;
}

.applicant__top {
    align-items: center;
    gap: 16px;
}

.applicant__top__image {
    width: 64px;
    height: 64px;
    border-radius: 4px;
}

/* INFO */
#applicant__info {
    align-items: flex-start;
    margin-top: 4px;
    justify-content: space-between;
    color: var(--neutral-70);
}

/* BOTTOM */
.applicant__bot {
    align-items: center;
    gap: 16px;
}

.applicant__bot__button {
    flex: 1;
}
</style>