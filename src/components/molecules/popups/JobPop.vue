<script setup>
import { ref, defineProps, defineEmits, watch } from 'vue';
import { Xmark } from '@iconoir/vue';
import LargeButton from '../../atoms/buttons/LargeButton.vue';
import IconLabel from '../../atoms/items/IconLabel.vue';
import Tag from '../../atoms/items/Tag.vue';
import Overlay from './Overlay.vue';

const props = defineProps({
    job: Object,
    jobType: String, // 'search', 'schedule', 'saved', 'applied', 'ongoing'
    isVisible: {
        type: Boolean,
        default: false,
    },
    jobId: String, // Add this line
});

const emits = defineEmits(['close', 'unsave']);

const formatDateTime = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const timeOptions = { hour: 'numeric', minute: 'numeric', hour12: true };
    const formattedDate = dateTime.toLocaleDateString(undefined, dateOptions);
    const formattedTime = dateTime.toLocaleTimeString(undefined, timeOptions);
    return `${formattedDate} | ${formattedTime}`;
};

const closePopup = () => {
    emits('close');
};

const handleUnsaveSuccess = () => {
    emits('unsave', props.job._id);
    closePopup();
};

watch(props, () => {
    if (props.job) {
    }
}, { immediate: true });

</script>

<template>
    <Overlay class="modal__overlay" v-if="isVisible" @overlayClick="closePopup">
        <div class="jobpop modal" @click.stop>
            <!-- Top Section -->
            <div class="jobpop__top">
                <div class="jobpop__top__row">
                    <h3>{{ job.title }}</h3>
                    <Xmark class="jobpop__top__row__button" @click="closePopup"></Xmark>
                </div>
                <div class="jobpop__top__business" v-if="job.employer">
                    <img :src="job.employer.image" alt="Employer Image" />
                    <span class="text-reg-normal">{{ job.employer.name }}</span>
                </div>
                <div class="jobpop__top__details">
                    <p class="jobpop__top__details__desc text-reg-normal">{{ job.description }}</p>
                    <p class="jobpop__top__details__rate text-bold-normal">€ {{ (job.wage).toFixed(2) }}/hr</p>
                    <p class="jobpop__top__details__time text-bold-normal">{{ formatDateTime(job.date) }}</p>
                    <div class="jobpop__top__details__tags">
                        <Tag class="jobpop__top__details__tags__tag" v-for="(skill, index) in job.skills" :key="index"
                            type="default">{{ skill }}</Tag>
                    </div>
                </div>
            </div>

            <!-- Middle Section -->
            <div class="jobpop__mid">
                <div class="jobpop__mid__details">
                    <p class="jobpop__mid__details__heading text-bold-l">Details</p>
                    <IconLabel iconName="Learning" :label="job.jobFunction" />
                    <IconLabel iconName="MapPin" :label="`${job.location.city}, ${job.location.country}`" />
                    <IconLabel iconName="CinemaOld" :label="job.production_type" />
                    <IconLabel iconName="DragHandGesture" :label="job.union_status" />
                </div>
                <div class="jobpop__attachments">
                    <p class="jobpop__attachments__head text-bold-normal">Attachments</p>
                    <div class="jobpop__attachments__links">
                        <IconLabel v-for="(attachment, index) in job.attachments" :key="index" :label="attachment"
                            iconName="Attachment" />
                    </div>
                </div>
            </div>

            <!-- Bottom Section -->
            <div class="jobpop__bottom">
                <div class="jobpop__bottom__buttons" v-if="jobType !== 'schedule'">
                    <!-- SEARCH BUTTONS -->
                    <LargeButton v-if="jobType === 'search'" label="Apply"
                        class="jobpop__bottom__button button--primary" :endpoint="`/crewJobInt/${job.id}/apply`"
                        :postData="{}" />
                    <LargeButton v-if="jobType === 'search'" label="Save"
                        class="jobpop__bottom__button button--tertiary" :endpoint="`/crewJobInt/${job.id}/save`"
                        :postData="{}" />

                    <!-- SAVED BUTTONS -->
                    <LargeButton v-if="jobType === 'saved'" label="Apply" class="jobpop__bottom__button button--primary"
                        :endpoint="`/crewJobInt/${job._id}/apply`" :postData="{}" />
                    <LargeButton v-if="jobType === 'saved'" label="Unsave"
                        class="jobpop__bottom__button button--tertiary" method="DELETE"
                        :endpoint="`/crewJobInt/${job._id}/unsave`" :postData="{}" :onSuccess="handleUnsaveSuccess" />

                    <!-- APPLIED BUTTONS -->
                    <LargeButton v-if="jobType === 'applied'" label="Cancel"
                        class="jobpop__bottom__button button--tertiary " method="DELETE"
                        :endpoint="`/crewJobInt/${job.applicationId}`" />

                    <!-- ONGOING BUTTONS -->
                    <LargeButton v-if="jobType === 'ongoing'" label="Cancel"
                        class="jobpop__bottom__button button--tertiary " method="POST"
                        :endpoint="`/crewJobInt/ongoing/${jobId}/cancel`" />
                </div>
            </div>
        </div>
    </Overlay>
</template>

<style scoped>
/* GENERAL */
.jobpop {
    width: 600px;
    height: 920px;
    padding: 48px;
    border-radius: 8px;
    box-sizing: border-box;
    background-color: var(--white);
    box-shadow: 0px 0px 16px 0 rgba(14, 15, 15, 0.04);
    color: var(--black);
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 50%;
    transform: translateY(-50%);
    right: 64px;
}

/* TOP */
.jobpop__top {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 24px;
}

.jobpop__top__row {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.jobpop__top__row h3 {
    margin: 0;
    font-weight: 100;
}

.jobpop__top__row__button {
    cursor: pointer;
}

.jobpop__top__business {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 8px;
}

.jobpop__top__business img {
    width: 28px;
    height: 28px;
    border-radius: 50%;
}

p {
    margin: 0;
}

.jobpop__top__details {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.jobpop__top__details__desc {
    margin-bottom: 4px;
}

.jobpop__top__details__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    max-width: 600px;
    margin-top: 4px;
}


/* MIDDLE */
.jobpop__mid {
    display: flex;
    flex-direction: column;
    gap: 24px;
    margin-bottom: 48px;
}

.jobpop__mid__details {
    display: flex;
    flex-direction: column;
    gap: 16px;

}

.jobpop__mid__details__heading {
    border-bottom: 1.5px solid var(--black);
    padding-bottom: 2px;
}

.jobpop__attachements {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.jobpop__attachments__head {
    margin: 0;
}

.jobpop__attachments__links {
    display: flex;
    flex-direction: column;
    gap: 16px;

}

/* BOTTOM */
.jobpop__bottom {
    display: flex;
    flex-direction: column;
    gap: 24px;
}

.jobpop__bottom__buttons {
    display: flex;
    gap: 24px;
}

.jobpop__bottom__button {
    width: 100%;
}
</style>