<script setup>
import SearchJob from '../jobs/SearchJob.vue';
import JobList from '../../organisms/list/JobList.vue';

</script>

<template>
    <div class="about">
        <div class="about__top">
            <div class="about__top__bio surface-tertiary radius-s">
                <p>Lorem ipsum dolor sit amet consectetur. Nulla nulla semper elit blandit purus. Tincidunt sit arcu donec cursus volutpat luctus volutpat. Sed scelerisque ut tincidunt purus nunc et vestibulum vitae facilisi. Sollicitudin lorem egestas etiam amet commodo vestibulum. Lorem ipsum dolor sit amet consectetur. Nulla nulla semper elit blandit purus. Tincidunt sit arcu donec cursus volutpat luctus volutpat. Sed scelerisque ut tincidunt purus nunc et vestibulum vitae facilisi. Sollicitudin lorem egestas etiam amet commodo vestibulum. Lorem ipsum dolor sit amet consectetur. Nulla nulla semper elit blandit purus. Tincidunt sit arcu donec cursus volutpat luctus volutpat. Sed scelerisque ut tincidunt purus nunc et vestibulum vitae facilisi. Sollicitudin lorem egestas etiam amet commodo vestibulum. Lorem ipsum dolor sit amet consectetur. Nulla nulla semper elit blandit purus. Tincidunt sit arcu donec cursus volutpat luctus volutpat. Sed scelerisque ut tincidunt purus nunc et vestibulum vitae facilisi. Sollicitudin lorem egestas etiam amet commodo vestibulum.</p>
            </div>
        </div>
        <JobList />
    </div>
</template>

<style scoped>

.about {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

p {
    margin: 0;
}

.about__top__bio {
    padding: 32px;
}

.about__top__bio {
    max-width: 794px;
    max-height: 350px;
}

.about__jobs {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
}


</style>