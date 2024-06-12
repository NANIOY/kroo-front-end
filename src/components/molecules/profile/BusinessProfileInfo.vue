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
    <div>
        <div>
            <ProfileImg :profileImage="logo" />
            <div>
                <h4>{{ companyName }}</h4>
                <div>
                    <Tag class="function" v-for="(type, index) in mediaTypes" :key="index" type="colored">{{ type }}</Tag>
                </div>
                <div>
                    <p>{{ bio }}</p>
                </div>
            </div>
        </div>
    </div>
</template>