<script setup>
import { ref } from 'vue';
import { NavArrowDown, NavArrowUp } from '@iconoir/vue';
import NormalButton from '../../atoms/buttons/NormalButton.vue';

/* state sorting */
const sortField = ref('');
const sortDirection = ref('asc');

const props = defineProps({
    data: {
        type: Array,
        required: true
    }
});

/* sort data */
function sortData(field) {
    if (sortField.value === field) {
        sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
    } else {
        sortField.value = field;
        sortDirection.value = 'asc';
    }

    props.data.sort((a, b) => {
        let aValue = a[field];
        let bValue = b[field];

        if (field === 'date') {
            aValue = new Date(aValue).getTime();
            bValue = new Date(bValue).getTime();
        } else {
            aValue = aValue.toLowerCase();
            bValue = bValue.toLowerCase();
        }

        if (aValue < bValue) return sortDirection.value === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortDirection.value === 'asc' ? 1 : -1;
        return 0;
    });
}

function getArrowIcon(field) {
    if (sortField.value === field) {
        return sortDirection.value === 'asc' ? NavArrowUp : NavArrowDown;
    }
    return NavArrowDown;
}


</script>

<template>
    <div class="list__container radius-s">
        <div class="list__header">
            <div class="list__header__item list__jobs">
                <div>
                    <h6>Job</h6>
                </div>
            </div>
            <div class="list__header__item list__role">
                <div>
                    <h6>Location</h6>
                </div>
            </div>
            <div class="list__header__item list__date" @click="sortData('date')">
                <div>
                    <h6>Date</h6>
                </div>
                <div>
                    <component :is="getArrowIcon('date')"></component>
                </div>
            </div>
            <div class="list__header__item list__action">
            </div>
        </div>
        <div class="list__body">
            <div v-for="(item, index) in props.data" :key="index">
                <div class="list__body__row">
                    <div class="text-bold-normal list__job">
                        {{ linkedJobs.title }}
                    </div>
                    <div class="text-reg-normal list__body__item">
                        {{ linkedJobs.location.city }}, {{ item.location.country }}
                    </div>
                    <div class="text-reg-normal">{{ new Date(item.date).toLocaleDateString() }}</div>
                    <div class="list__actions">
                        <NormalButton class="button--tertiary button__savejob" label="Save job"/>
                        <NormalButton class="button--primary button__apply" label="Apply"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<style scoped>

h6 {
    font-size: 16px !important;
}

p {
    margin: 0;
}

.list__container {
    border: 2px solid var(--gray);
    display: flex;
    flex-direction: column;
    height: 462px;
    overflow-x: hidden;
    overflow-y: scroll ;
}

.list__header,
.list__body__row {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 8px;
}

.list__header {
    font-weight: bold;

    border-top-left-radius: 8px;
    position: sticky;
    top: 0;
    background-color: var(--gray);
}

.list__header__item,
.list__body__row div {
    display: flex;
    align-items: center;
    padding: 8px;
    overflow: hidden;
}

.list__body__row {
    padding: 8px;
    border-top: 1px solid var(--gray);
}

.list__header__item {
    gap: 8px;
    color: var(--neutral-50)
}

.list__header {
    padding: 8px 16px 8px 16px;
}

.list__body__row div:first-child {
    justify-content: flex-start;
    display: flex;
    align-items: center;
}

.list__date {
    cursor: pointer;
    user-select: none;
    width: fit-content;
}

.list__actions {
    display: flex;
    gap: 16px;
}

.button__apply, .button__savejob {
    padding: 4px 24px;
}

.list__job {
    word-break: break-word;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
}

</style>
