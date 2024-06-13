<script setup>
import SearchJob from '../jobs/SearchJob.vue';
import JobList from '../../organisms/list/JobList.vue';

</script>

<template>
    <div class="about">
        <div class="about__top">
            <div class="about__top__bio surface-tertiary radius-s">
                <p>Lorem ipsum dolor sit amet consectetur. Nulla nulla semper elit blandit purus. Tincidunt sit arcu donec cursus volutpat luctus volutpat. 
                    Sed scelerisque ut tincidunt purus nunc et vestibulum vitae facilisi. Sollicitudin lorem egestas etiam amet commodo vestibulum. Lorem 
                    ipsum dolor sit amet consectetur. Nulla nulla semper elit blandit purus. Tincidunt sit arcu donec cursus volutpat luctus volutpat. Sed 
                    scelerisque ut tincidunt purus nunc et vestibulum vitae facilisi. Sollicitudin lorem egestas etiam amet commodo vestibulum. Lorem ipsum 
                    dolor sit amet consectetur. Nulla nulla semper elit blandit purus. Tincidunt sit arcu donec cursus volutpat luctus volutpat. Sed scelerisque 
                    ut tincidunt purus nunc et vestibulum vitae facilisi. Sollicitudin lorem egestas etiam amet commodo vestibulum. Lorem ipsum dolor sit amet 
                    consectetur. Nulla nulla semper elit blandit purus. Tincidunt sit arcu donec cursus volutpat luctus volutpat. Sed scelerisque ut tincidunt 
                    purus nunc et vestibulum vitae facilisi. Sollicitudin lorem egestas etiam amet commodo vestibulum. Tincidunt sit arcu donec cursus volutpat 
                    luctus volutpat Tincidunt sit arcu donec cursus volutpat luctus volutpat.</p>
            </div>
            <div class="about__top__work">
                <img class="radius-s work" src="https://fakeimg.pl/1086x1177" alt="portfolio work">
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

.about__top {
    display: flex;
    gap: 20px;
    flex-direction: row;
    max-height: 300px;
}

.about__top__bio {
    padding: 32px;
}

.about__top__bio {
    max-width: 794px;
}

.about__jobs {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
}

.work {
    object-fit: cover;
    max-height: 300px;

}

</style>