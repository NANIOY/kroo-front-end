<script setup>
import { ref } from 'vue';
import Checkbox from '../../atoms/selectors/Checkbox.vue';
import { NavArrowDown, NavArrowUp, UserXmark } from '@iconoir/vue';

/* state sorting */
const sortField = ref('');
const sortDirection = ref('asc');

const data = ref([
    { name: 'John Doe', email: 'john@example.com', dateAdded: new Date('2023-01-01'), isChecked: false },
    { name: 'Jane Smith', email: 'jane@example.com', dateAdded: new Date('2023-02-15'), isChecked: false },
    { name: 'Alice Johnson', email: 'alice@example.com', dateAdded: new Date('2023-03-20'), isChecked: false }
]);

const isAllChecked = ref(false);

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

function toggleAllCheckboxes() {
    isAllChecked.value = !isAllChecked.value;
    data.value.forEach(item => {
        item.isChecked = isAllChecked.value;
    });
}

function toggleCheckbox(index) {
    data.value[index].isChecked = !data.value[index].isChecked;
    isAllChecked.value = data.value.every(item => item.isChecked);
}

function removeUser(index) {
    data.value.splice(index, 1);
    isAllChecked.value = data.value.length > 0 && data.value.every(item => item.isChecked);
}

</script>

<template>
    <div class="list__container">
        <div class="list__header">
            <div class="list__header__item">
                <Checkbox type="checkbox" :checked="isAllChecked" @change="toggleAllCheckboxes" />
            </div>
            <div class="list__header__item" @click="sortData('name')">
                <div class="text-reg-normal">Name</div>
                <div>
                    <component :is="getArrowIcon('name')"></component>
                </div>
            </div>
            <div class="list__header__item" @click="sortData('email')">
                <div class="text-reg-normal">Email</div>
                <div>
                    <component :is="getArrowIcon('email')"></component>
                </div>
            </div>
            <div class="list__header__item" @click="sortData('dateAdded')">
                <div class="text-reg-normal">Date Added</div>
                <div>
                    <component :is="getArrowIcon('dateAdded')"></component>
                </div>
            </div>
            <div class="list__header__item">
                <div class="text-reg-normal">Action</div>
            </div>
        </div>
        <div class="list__body">
            <div v-for="item in data" :key="item.email" class="list__body__row">
                <div>
                    <Checkbox class="checkbox" :checked="item.isChecked" @change="toggleCheckbox(index)" />
                </div>
                <div class="text-reg-normal">{{ item.name }}</div>
                <div class="text-reg-normal">{{ item.email }}</div>
                <div class="text-reg-normal">{{ item.dateAdded.toLocaleDateString() }}</div>
                <div @click="removeUser(index)" style="cursor: pointer;">
                    <UserXmark />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.list__container {
    border: 2px solid var(--gray);
}

.list__header,
.list__body__row {
    display: grid;
    grid-template-columns: 40px 1fr 1fr 1fr 60px;
    align-items: center;
    gap: 8px;
}

.list__header {
    background-color: var(--neutral-50);
    color: white;
    padding: 8px;
    font-weight: bold;
}

.list__header__item,
.list__body__row div {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px;
    text-align: center;
    overflow: hidden;
}

.list__body__row div:first-child {
    justify-content: flex-start;
}

.list__header__item:first-child,
.list__body__row div:first-child {
    justify-content: center;
}

.list__body__row div:last-child {
    cursor: pointer;
}

.list__header__item {
    cursor: pointer;
    user-select: none; 
}

.checkbox {
padding-left: 14px;
}

</style>