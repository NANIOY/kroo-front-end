<script setup>
import { ref } from 'vue';
import { NavArrowDown, NavArrowUp, UserXmark } from '@iconoir/vue';
import NormalButton from '../../atoms/buttons/NormalButton.vue';

/* state sorting */
const sortField = ref('');
const sortDirection = ref('asc');

const data = ref([
    { job: 'Actor needed!', location: 'Brussels, Belgium', date: new Date('2024-12-01') },
    { job: 'Network systems engineer needed!', location: 'Berlin, Germany', date: new Date('2024-12-15') },
    { job: 'On-set tutor', location: 'Paris, France', date: new Date('2024-12-01') },
    { job: 'Looking for a senior technical project manager!', location: 'Leuven, Belgium', date: new Date('2025-03-02') },
    { job: 'Studio assistant needed', location: 'London, UK', date: new Date('2025-03-05') },
    { job: 'Good security where?', location: 'Gent, Belgium', date: new Date('2025-03-10') },
    { job: 'Is there a music editor available somewhere?', location: 'Rome, Italy', date: new Date('2025-05-22') },
    { job: 'Looking for a good sound designer!', location: 'Marseille, France', date: new Date('2025-05-19') },
]);


/* sort data */
function sortData(field) {
    if (sortField.value === field) {
        sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
    } else {
        sortField.value = field;
        sortDirection.value = 'asc';
    }

    data.value.sort((a, b) => {
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
            <div v-for="(item, index) in data" :key="item.email" class="list__body__row">
                <div class="text-bold-normal list__job">
                    {{ item.job }}
                </div>
                <div class="text-reg-normal list__body__item">
                    {{ item.location }}
                </div>
                <div class="text-reg-normal">{{ item.date.toLocaleDateString() }}</div>
                <div class="list__actions">
                    <NormalButton class="button--tertiary button__savejob" label="Save job"/>
                    <NormalButton class="button--primary button__apply" label="Apply"/>
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
    border-top-right-radius: 8px;
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
