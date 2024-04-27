<script setup>
import ProfileImg from '../../atoms/profile/ProfileImg.vue';
import Tag from '../../atoms/items/Tag.vue';
import LargeButton from '../../atoms/buttons/LargeButton.vue';
</script>

<template>
    <ProfileImg :showBadge=true />
    <h4>Name</h4>
    <div>
        <span>Function</span>
        <span>Function</span>
    </div>
    <div>
        <Tag type="colored">Skill</Tag>
        <Tag type="colored">Skill</Tag>
        <Tag type="colored">Skill</Tag>
    </div>
    <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget
        ultricies nunc. Nullam eget ultricies nunc. Nullam eget ultricies nunc.
    </p>
    <LargeButton label="Send a job offer" class="button--primary" />
</template>

<style scoped></style>