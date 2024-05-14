<script setup>
import NormalButton from '../../atoms/buttons/NormalButton.vue';
import { IconoirProvider, Calendar } from '@iconoir/vue';
import { computed, onMounted, ref } from 'vue';
import setupAxios from '../../../setupAxios';

const props = defineProps({
    type: {
        type: String,
        required: true,
        validator: value => ['Saved', 'Applied', 'Ongoing', 'Offered'].includes(value)
    }
});

const isOffered = computed(() => props.type === 'Offered');
const jobs = ref([]);
const axiosInstance = setupAxios();

const fetchJobs = async () => {
    const token = sessionStorage.getItem('sessionToken') || sessionStorage.getItem('rememberMeToken');
    if (!token) {
        console.error('Authentication token is missing');
        return;
    }

    try {
        const savedResponse = await axiosInstance.get(`/crewJobInt/saved`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        jobs.value = savedResponse.data.savedJobs.map(job => ({ ...job, type: 'Saved' }));
    } catch (error) {
        console.error(`Failed to fetch saved jobs:`, error);
    }

    try {
        const applicationsResponse = await axiosInstance.get(`/crewJobInt/applications`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const applications = applicationsResponse.data.applications;

        const jobDetailsPromises = applications.map(application =>
            axiosInstance.get(`/crewjob/jobs/${application.job}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            })
        );

        const jobDetailsResponses = await Promise.all(jobDetailsPromises);
        const appliedJobs = jobDetailsResponses.map((response, index) => ({
            ...response.data.job,
            type: 'Applied',
            applicationDate: applications[index].date,
            applicationStatus: applications[index].status
        }));

        jobs.value = [...jobs.value, ...appliedJobs];
    } catch (error) {
        console.error(`Failed to fetch applied jobs:`, error);
    }
};


onMounted(fetchJobs);
</script>

<template>
    <IconoirProvider v-if="isOffered"
        :icon-props="{ color: 'var(--black)', width: '16', height: '16', 'stroke-width': '1.5' }">
        <div :id="`${props.type.toLowerCase()}__job`" class="surface-tertiary radius-xs">
            <div :id="`${props.type.toLowerCase()}__job__top`">
                <div :id="`${props.type.toLowerCase()}__job__top__business`">
                    <div>
                        <img class="radius-full" src="https://placehold.co/56x56" alt="">
                    </div>
                    <div :id="`${props.type.toLowerCase()}__job__top__business__name`">
                        <p>name</p>
                    </div>
                </div>
                <div v-if="isOffered" id="offered__job__top__right">
                    <div id="offered__job__top__right__days">
                        <p>0</p>
                    </div>
                    <div id="offered__job__top__right__calendar">
                        <Calendar />
                    </div>
                </div>
            </div>

            <div :id="`${props.type.toLowerCase()}__job__jobTitle`">
                <p class="text-bold-l">job title</p>
            </div>

            <div v-if="props.type !== 'Applied'" :id="`${props.type.toLowerCase()}__job__info`">
                <div :id="`${props.type.toLowerCase()}__job__info__date`">
                    <div :id="`${props.type.toLowerCase()}__job__info__date__day`">
                        <p>day</p>
                    </div>
                    <div :id="`${props.type.toLowerCase()}__job__info__date__month`">
                        <p>month</p>
                    </div>
                </div>
                <div :id="`${props.type.toLowerCase()}__job__info__place`">
                    <div :id="`${props.type.toLowerCase()}__job__info__place__city`">
                        <p>city</p>
                    </div>
                    <div :id="`${props.type.toLowerCase()}__job__info__place__country`">
                        <p>country</p>
                    </div>
                </div>
            </div>

            <div v-if="props.type === 'Offered'" id="offered__job__bottom">
                <div id="offered__job__bottom__price">
                    <p class="button-l">€ #/hr</p>
                </div>
                <div id="offered__job__bottom__buttons">
                    <NormalButton id="normalButton__details"
                        class="button--tertiary offered__job__bottom__buttons_details" :hasIcon="false" :hasLabel="true"
                        label="Details" iconName="" />
                    <NormalButton id="normalButton__accept" class="button--primary offered__job__bottom__buttons_accept"
                        :hasIcon="false" :hasLabel="true" label="Accept" iconName="" />
                </div>
            </div>

            <div v-else :id="`${props.type.toLowerCase()}__job__buttons`">
                <NormalButton v-if="props.type !== 'Offered'" id="normalButton__cancel"
                    class="button--tertiary button__stroke" :hasIcon="false" :hasLabel="true"
                    :label="props.type === 'Saved' ? 'Unsave' : 'Cancel'" iconName="" />
                <NormalButton id="normalButton__details" class="button--primary" :hasIcon="false" :hasLabel="true"
                    label="Details" iconName="" />
            </div>
        </div>
    </IconoirProvider>
    <div v-else :id="`${props.type.toLowerCase()}__job`" class="surface-tertiary radius-xs">
        <div :id="`${props.type.toLowerCase()}__job__top`">
            <div :id="`${props.type.toLowerCase()}__job__top__business`">
                <div>
                    <img class="radius-full" src="https://placehold.co/56x56" alt="">
                </div>
                <div :id="`${props.type.toLowerCase()}__job__top__business__name`">
                    <p>name</p>
                </div>
            </div>
        </div>

        <div :id="`${props.type.toLowerCase()}__job__jobTitle`">
            <p class="text-bold-l">job title</p>
        </div>

        <div v-if="props.type !== 'Applied'" :id="`${props.type.toLowerCase()}__job__info`">
            <div :id="`${props.type.toLowerCase()}__job__info__date`">
                <div :id="`${props.type.toLowerCase()}__job__info__date__day`">
                    <p>day</p>
                </div>
                <div :id="`${props.type.toLowerCase()}__job__info__date__month`">
                    <p>month</p>
                </div>
            </div>
            <div :id="`${props.type.toLowerCase()}__job__info__place`">
                <div :id="`${props.type.toLowerCase()}__job__info__place__city`">
                    <p>city</p>
                </div>
                <div :id="`${props.type.toLowerCase()}__job__info__place__country`">
                    <p>country</p>
                </div>
            </div>
        </div>

        <div :id="`${props.type.toLowerCase()}__job__buttons`">
            <NormalButton v-if="props.type !== 'Offered'" id="normalButton__cancel"
                class="button--tertiary button__stroke" :hasIcon="false" :hasLabel="true"
                :label="props.type === 'Saved' ? 'Unsave' : 'Cancel'" iconName="" />
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

#saved__job,
#applied__job,
#ongoing__job,
#offered__job {
    display: flex;
    flex-direction: column;
    width: 360px;
    padding: 20px;
    box-sizing: border-box;
    gap: 12px;
}

#saved__job__top,
#applied__job__top,
#ongoing__job__top,
#offered__job__top {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

#saved__job__top__business,
#applied__job__top__business,
#ongoing__job__top__business,
#offered__job__top__business {
    display: flex;
    align-items: center;
    gap: 8px;
}

#saved__job__jobTitle p,
#applied__job__jobTitle p,
#ongoing__job__jobTitle p,
#offered__job__jobTitle p {
    margin: 0;
    margin-top: 12px;
}

#saved__job__info,
#ongoing__job__info,
#offered__job__info {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

#saved__job__info__place,
#applied__job__info__place,
#ongoing__job__info__place,
#offered__job__info__place {
    text-align: right;
}

#saved__job__buttons,
#applied__job__buttons,
#ongoing__job__buttons,
#offered__job__bottom__buttons {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-top: 12px;
    gap: 16px;
}

#normalButton__cancel,
#normalButton__details,
.offered__job__bottom__buttons_details,
.offered__job__bottom__buttons_accept {
    flex: 1;
}

#offered__job__top__right {
    display: flex;
    align-items: center;
    gap: 8px;
}

#offered__job__bottom {
    display: flex;
    align-items: center;
    gap: 24px;
    margin-top: 12px;
}
</style>
