<script setup>
import { defineProps, ref, watchEffect } from 'vue';
import ProfileImg from '../../atoms/profile/ProfileImg.vue';
import Tag from '../../atoms/items/Tag.vue';

const props = defineProps({
    business: {
        type: Object,
        required: true
    }
});

const companyName = ref('');
const bio = ref('');
const mediaTypes = ref([]);
const logo = ref('');

watchEffect(() => {
    if (props.business) {
        companyName.value = props.business.businessInfo.companyName;
        bio.value = props.business.businessInfo.bio;
        mediaTypes.value = props.business.businessInfo.mediaTypes || [];
        logo.value = props.business.businessInfo.logo || '';
    }
});
</script>

<template>
    <div class="profile__container">
        <div class="profile__container__wrapper text-white">
            <ProfileImg class="profile__container__wrapper__profile" :profileImage="logo" />
            <div class="profile__container__wrapper__info">
                <h4>{{ companyName }}</h4>
                <div class="profile__types">
                    <Tag class="types" v-for="(type, index) in mediaTypes" :key="index" type="colored">{{ type }}</Tag>
                </div>
                <div>
                    <p>{{ bio }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>


.profile__container__wrapper {
    display: flex;
    align-items: center;
    width: 100%;
    flex-direction: column;
    gap: 24px;
    text-align: center;
}

.profile__container__wrapper__info {
    display: flex;
    flex-direction: column;
    gap: 24px;
    align-items: center;
}

.profile__types {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: center;
}

</style>