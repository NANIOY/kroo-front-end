<script setup>
import { ref } from 'vue';
import { NavArrowDown, NavArrowUp, UserXmark } from '@iconoir/vue';
import NormalButton from '../../atoms/buttons/NormalButton.vue';

/* state sorting */
const sortField = ref('');
const sortDirection = ref('asc');

const data = ref([
    { image:'https://placehold.co/32x32', name: 'John Doe', role: 'Producer', email: 'john@example.com', dateAdded: new Date('2023-01-01') },
    { image:'https://placehold.co/32x32', name: 'Jane Smith', role: 'Editor', email: 'jane@example.com', dateAdded: new Date('2023-02-15') },
    { image:'https://placehold.co/32x32', name: 'Alice Johnson', role: 'Audience', email: 'alice@example.com', dateAdded: new Date('2024-03-20') },
    { image:'https://placehold.co/32x32', name: 'Mark Haas', role: 'Producer', email: 'mark@example.com', dateAdded: new Date('2021-03-20') },
    { image:'https://placehold.co/32x32', name: 'Miranda Van Tielen', role: 'Editor', email: 'miranda@example.com', dateAdded: new Date('2019-03-20') },
    { image:'https://placehold.co/32x32', name: 'Pedro Duprez', role: 'Audience', email: 'pedro.duprez1999@example.com', dateAdded: new Date('2018-03-20') },
    { image:'https://placehold.co/32x32', name: 'Pascale Colman', role: 'Producer', email: 'pascale2014@example.com', dateAdded: new Date('2023-09-20') },
    { image:'https://placehold.co/32x32', name: 'Christiane Rotthier', role: 'Editor', email: 'christy.rotthier1998@example.com', dateAdded: new Date('2023-05-20') },
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

        if (field === 'dateAdded') {
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

function removeUser(index) {
    data.value.splice(index, 1);
}

</script>

<template>
    <div class="list__container radius-s">
        <div class="list__header">
            <div class="list__header__item list__name" @click="sortData('name')">
                <div>
                    <h6>Job</h6>
                </div>
                <div>
                    <component :is="getArrowIcon('name')"></component>
                </div>
            </div>
            <div class="list__header__item list__role" @click="sortData('role')">
                <div>
                    <h6>Location</h6>
                </div>
                <div>
                    <component :is="getArrowIcon('role')"></component>
                </div>
            </div>
            <div class="list__header__item list__date" @click="sortData('dateAdded')">
                <div>
                    <h6>Date</h6>
                </div>
                <div>
                    <component :is="getArrowIcon('dateAdded')"></component>
                </div>
            </div>
                <div class="list__header__item list__action">
            </div>
        </div>
        <div class="list__body">
            <div v-for="(item, index) in data" :key="item.email" class="list__body__row">
                <div class="text-bold-normal ">
                    {{ item.name }}
                </div>
                <div class="text-reg-normal list__body__item">
                    {{ item.role }}
                </div>
                <div class="text-reg-normal">{{ item.dateAdded.toLocaleDateString() }}</div>
                <div>
                    <NormalButton class="button--tertiary button__savejob" label="Save job"/>
                    <NormalButton class="button--primary button__apply" label="Apply"/>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.list__body__row > div:nth-child(5), .list__action {
    margin-left: auto;
    margin-right: 8px;
}

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
}

.list__header,
.list__body__row {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    align-items: center;
    gap: 8px;
}

.list__header {
    font-weight: bold;
    border-top-right-radius: 8px;
    border-top-left-radius: 8px;
}

.list__header__item,
.list__body__row div {
    display: flex;
    align-items: center;
    padding: 8px;
    text-align: center;
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

.list__body__row div:last-child {
    cursor: pointer;
}

.list__name, .list__email, .list__date, .list__role {
    cursor: pointer;
    user-select: none;
    width: fit-content;
}

.list__action {
    width: fit-content;
}


</style>
