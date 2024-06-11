<script setup>
import { ref, onMounted, computed } from 'vue';
import SearchCrew from '../../components/molecules/crew/SearchCrew.vue';
import SearchCrewFilter from '../../components/molecules/filter/SearchCrewFilter.vue';
import setupAxios from '../../setupAxios';

const axiosInstance = setupAxios();

const crewMembers = ref([]);
const loading = ref(true);
const searchTerm = ref('');

const fetchCrewData = async () => {
    try {
        const { data } = await axiosInstance.get('/user');
        const crewMembersData = data.data.users.filter(user => user.crewData);

        const crewData = await Promise.all(crewMembersData.map(async member => {
            const crewResponse = await axiosInstance.get(`/crew/${member.crewData}`);
            const crewDetails = crewResponse.data.data;
            return {
                img: crewDetails.basicInfo.profileImage,
                name: member.username,
                city: crewDetails.profileDetails.city,
                country: crewDetails.profileDetails.country,
                functions: crewDetails.basicInfo.functions,
                userUrl: member.userUrl
            };
        }));

        crewMembers.value = crewData;
    } catch (error) {
        console.error('Error fetching crew data:', error);
    } finally {
        loading.value = false;
    }
};

const navigateToProfile = (userUrl) => {
    window.open(`/#/user/${userUrl}`, '_blank');
};

const handleSearch = (value) => {
    searchTerm.value = value;
};

onMounted(() => {
    fetchCrewData();
});

const filteredCrewMembers = computed(() => {
    if (searchTerm.value === '') {
        return crewMembers.value;
    }
    return crewMembers.value.filter(crew =>
        crew.name.toLowerCase().includes(searchTerm.value.toLowerCase())
    );
});
</script>

<template>
    <div class="viewcontainer">
        <SearchCrewFilter @search="handleSearch" />

        <div class="crew-container">
            <div v-if="loading" class="loading">Loading...</div>
            <div v-else>
                <div class="viewcontainer__crews">
                    <SearchCrew v-for="crew in filteredCrewMembers" :key="crew.name" :img="crew.img" :name="crew.name"
                        :city="crew.city" :country="crew.country" :functions="crew.functions" :userUrl="crew.userUrl"
                        @navigateToProfile="navigateToProfile" />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.viewcontainer {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 40px;
}

.crew-container {
    display: flex;
    flex-direction: column;
}

.viewcontainer__crews {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
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