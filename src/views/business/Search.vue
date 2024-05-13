<script setup>
import { ref, onMounted, computed } from 'vue';
import SearchCrew from '../../components/molecules/crew/SearchCrew.vue';
import SearchFilter from '../../components/molecules/filter/SearchFilter.vue';
import NormalButton from '../../components/atoms/buttons/NormalButton.vue';
import TransparentButton from '../../components/atoms/buttons/TransparentButton.vue';
import setupAxios from '../../setupAxios';

const axiosInstance = setupAxios();

const fetchedCrew = ref([]);
const crewList = ref([]);

const currentPage = ref(1);
const crewPerPage = 12;

const paginatedCrew = computed(() => {
    const startIndex = (currentPage.value - 1) * crewPerPage;
    const endIndex = startIndex + crewPerPage;
    return fetchedCrew.value.slice(startIndex, endIndex);
});

const totalPages = computed(() => Math.ceil(fetchedCrew.value.length / crewPerPage));

const visiblePages = computed(() => {
    const pages = [];
    let startPage = currentPage.value - 3;
    let endPage = currentPage.value + 3;
    if (startPage < 1) {
        startPage = 1;
        endPage = Math.min(totalPages.value, 7);
    }
    if (endPage > totalPages.value) {
        endPage = totalPages.value;
        startPage = Math.max(1, endPage - 6);
    }
    for (let page = startPage; page <= endPage; page++) {
        pages.push(page);
    }
    return pages;
});


const fetchCrewData = async () => {
    try {
        const { data } = await axiosInstance.get('/user');
        const crewMembers = data.data.users.filter(user => user.crewData);
        const crewDetails = await Promise.all(crewMembers.map(async member => {
            const crewResponse = await axiosInstance.get(`/crew/${member.crewData}`);
            const crewData = crewResponse.data.data;
            return {
                img: crewData.basicInfo.profileImage,
                name: member.username,
                city: crewData.profileDetails.location,
                functions: crewData.basicInfo.functions
            };
        }));

        crewList.value = crewDetails;
    } catch (error) {
        console.error('Error fetching crew data:', error);
    }
};

const openCrew = (crew) => {
    selectedCrew.value = crew;
};

const closeCrew = () => {
    selectedCrew.value = null;
};

const previousPage = () => {
    if (currentPage.value > 1) {
        currentPage.value--;
    }
};

const nextPage = () => {
    if (currentPage.value < totalPages.value) {
        currentPage.value++;
    }
};

const goToPage = (page) => {
    currentPage.value = page;
};

onMounted(() => {
    fetchCrewData();
});
</script>

<template>
    <div class="viewcontainer">
        <SearchFilter />

        <div class="crew-container">
            <div class="viewcontainer__crews">
                <SearchCrew v-for="crew in crewList" :key="crew.name" :img="crew.img" :name="crew.name"
                    :city="crew.city" :country="crew.country" :functions="crew.functions" />
            </div>

            <div class="pagination">
                <NormalButton @click="previousPage" :disabled="currentPage === 1" iconName="NavArrowLeft"
                    class="pagination__button pagination__button--arrow button--tertiary" />
                <template v-for="(page, index) in visiblePages" :key="index">
                    <template v-if="index === 0">
                        <TransparentButton @click="goToPage(1)" :class="{ active: 1 === currentPage }" :label="1"
                            class="pagination__button" />
                    </template>
                    <template v-if="index === 1 && page !== 2">
                        <span class="pagination__ellipsis">...</span>
                    </template>
                    <template v-if="index !== 0 && index !== visiblePages.length - 1">
                        <TransparentButton @click="goToPage(page)" :class="{ active: page === currentPage }"
                            :label="page" class="pagination__button" />
                    </template>
                    <template v-if="index === visiblePages.length - 1">
                        <span class="pagination__ellipsis">...</span>
                    </template>
                    <template v-if="index === visiblePages.length - 1">
                        <TransparentButton @click="goToPage(totalPages)" :class="{ active: totalPages === currentPage }"
                            :label="totalPages" class="pagination__button" />
                    </template>
                </template>
                <NormalButton @click="nextPage" :disabled="currentPage === totalPages" iconName="NavArrowRight"
                    class="pagination__button pagination__button--arrow button--tertiary" />
            </div>
        </div>


    </div>
</template>

<style scoped>
.viewcontainer {
    display: flex;
    flex-direction: row;
}

.crew-container {
    display: flex;
    flex-direction: column;
}

.viewcontainer__crews {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    gap: 24px;
    margin-bottom: 48px;
}

/* PAGINATION */
.pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 24px;
    gap: 12px;
}

.pagination__button {
    width: 40px;
    height: 40px;
    font-weight: 100;
}

.no-label {
    padding: 0;
}

.pagination__button--arrow {
    margin: 0 16px;
}

.pagination__button.active {
    font-weight: 900;
    color: var(--blurple) !important;
}

.pagination__button:disabled {
    opacity: 0;
}
</style>
