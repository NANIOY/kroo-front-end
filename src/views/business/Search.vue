<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import SearchCrew from '../../components/molecules/crew/SearchCrew.vue';
import SearchCrewFilter from '../../components/molecules/filter/SearchCrewFilter.vue';
import setupAxios from '../../setupAxios';

const axiosInstance = setupAxios();

const crewMembers = ref([]);
const loading = ref(true);
const searchTerm = ref('');
const selectedSortOption = ref('Relevance');
const activeJobs = ref([]);
const crewSuggestions = ref([]);

const fetchActiveJobs = async () => {
    const userId = sessionStorage.getItem('userId');
    try {
        const userResponse = await axiosInstance.get(`/user/${userId}`);
        const businessId = userResponse.data.data.user.businessData;

        const jobResponse = await axiosInstance.get(`/bussjob/${businessId}`);
        const sortedJobs = jobResponse.data.linkedJobs.sort((a, b) => new Date(a.date) - new Date(b.date));
        activeJobs.value = sortedJobs.slice(0, 3);
    } catch (error) {
        console.error('Error fetching active jobs:', error);
    }
};

const fetchCrewData = async () => {
    try {
        const { data } = await axiosInstance.get('/user');
        const crewMembersData = data.data.users.filter(user => user.crewData);

        const crewData = await Promise.all(crewMembersData.map(async member => {
            try {
                console.log(`Fetching crew data for user ID: ${member._id}, crewData ID: ${member.crewData}`);
                const crewResponse = await axiosInstance.get(`/crew/${member.crewData}`);
                const crewDetails = crewResponse.data.data;
                return {
                    img: crewDetails.basicInfo.profileImage,
                    name: member.username,
                    city: crewDetails.profileDetails.city,
                    country: crewDetails.profileDetails.country,
                    functions: crewDetails.basicInfo.functions,
                    userUrl: member.userUrl,
                    crewData: crewDetails
                };
            } catch (error) {
                console.error(`Error fetching crew data for user ID: ${member._id}, crewData ID: ${member.crewData}`, error);
                return null;
            }
        }));

        crewMembers.value = crewData.filter(member => member !== null);
        await fetchCrewSuggestions();
    } catch (error) {
        console.error('Error fetching crew data:', error);
    } finally {
        loading.value = false;
    }
};

const fetchCrewSuggestions = async () => {
    try {
        // define
        const baseMaxPoints = 16; // 4 (function) + 1*skills + 3 (location) + 2 (languages) + 5 (availability)

        // memoize getCoordinates to avoid redundant API calls
        const coordinatesCache = {};
        const getCoordinates = async (city, country) => {
            const key = `${city}-${country}`;
            if (coordinatesCache[key]) return coordinatesCache[key];

            try {
                const response = await axiosInstance.get('/geo/coordinates', { params: { city, country } });
                coordinatesCache[key] = response.data;
                return response.data;
            } catch (error) {
                console.error('Error fetching coordinates:', error);
                return null;
            }
        };

        // utility function to calculate distance
        const calculateDistance = (lat1, lon1, lat2, lon2) => {
            const toRadians = degree => degree * (Math.PI / 180);
            const R = 6371; // earth radius in km
            const dLat = toRadians(lat2 - lat1);
            const dLon = toRadians(lon2 - lon1);
            const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            return R * c; // distance in km
        };

        const suggestionsPromises = crewMembers.value.map(async member => {
            const crewData = member.crewData;
            let bestFitPoints = 0;
            let bestFitJob = null;

            const crewCoords = await getCoordinates(crewData.profileDetails.city, crewData.profileDetails.country);

            for (const job of activeJobs.value) {
                let points = 0;

                // function match
                const normalizedJobFunction = job.jobFunction.trim().toLowerCase();
                const hasMatchingFunction = crewData.basicInfo.functions.some(func => func.trim().toLowerCase() === normalizedJobFunction);
                if (hasMatchingFunction) points += 4; // 4 points for function match

                // skill match
                if (hasMatchingFunction) {
                    const crewSkills = crewData.profileDetails.skills.map(skill => skill.trim().toLowerCase());
                    const jobSkills = job.skills.map(skill => skill.trim().toLowerCase());
                    const skillMatches = crewSkills.filter(skill => jobSkills.includes(skill)).length;
                    points += skillMatches; // 1 point per matching skill if function matches
                }

                // location match
                const jobCoords = await getCoordinates(job.location.city, job.location.country);
                if (crewCoords && jobCoords) {
                    const distance = calculateDistance(crewCoords.lat, crewCoords.lon, jobCoords.lat, jobCoords.lon);
                    const workRadius = crewData.profileDetails.workRadius || 0;
                    if (distance <= workRadius) {
                        points += hasMatchingFunction ? 3 : 1; // 3 points if location matches and function matches, 1 point if location matches
                    }
                }

                // language match
                if (hasMatchingFunction) {
                    try {
                        const businessResponse = await axiosInstance.get(`/business/${job.businessId}`);
                        const businessLanguages = businessResponse.data.data.business.businessInfo.languages || [];
                        const crewLanguages = crewData.profileDetails.languages || [];
                        const languageMatch = businessLanguages.some(lang => crewLanguages.includes(lang)) ? 2 : 0; // 2 points if at least one language matches and function matches
                        points += languageMatch;
                    } catch (error) {
                        console.error('Error fetching business details:', error);
                    }
                }

                if (points > bestFitPoints) {
                    bestFitPoints = points;
                    bestFitJob = job.title;
                }
            }

            // convert points to percentage
            const perc = Math.floor((bestFitPoints / baseMaxPoints) * 100);

            return {
                img: member.img,
                name: member.name,
                city: member.city,
                country: member.country,
                functions: member.functions,
                userUrl: member.userUrl,
                perc,
                jobtitle: bestFitJob || 'No matching job' // use best fit job or default
            };
        });

        const suggestions = await Promise.all(suggestionsPromises);

        // filter out null suggestions
        crewSuggestions.value = suggestions.filter(suggestion => suggestion !== null);

        // sort suggestions by percentage
        crewSuggestions.value = crewSuggestions.value.sort((a, b) => b.perc - a.perc);
    } catch (error) {
        console.error('Error fetching crew suggestions:', error);
    }
};

const navigateToProfile = (userUrl) => {
    window.open(`/#/user/${userUrl}`, '_blank');
};

const handleSearch = (value) => {
    searchTerm.value = value;
};

const handleSort = (option) => {
    selectedSortOption.value = option;
};

watch(selectedSortOption, (newVal) => {
    if (newVal === 'Relevance') {
        crewSuggestions.value = crewSuggestions.value.sort((a, b) => b.perc - a.perc);
    } else if (newVal === 'Name (A-Z)') {
        crewSuggestions.value = crewSuggestions.value.sort((a, b) => a.name.localeCompare(b.name));
    } else if (newVal === 'Name (Z-A)') {
        crewSuggestions.value = crewSuggestions.value.sort((a, b) => b.name.localeCompare(a.name));
    }
});

onMounted(() => {
    fetchActiveJobs().then(fetchCrewData);
});

const filteredCrewMembers = computed(() => {
    if (searchTerm.value === '') {
        return crewSuggestions.value;
    }
    return crewSuggestions.value.filter(crew =>
        crew.name.toLowerCase().includes(searchTerm.value.toLowerCase())
    );
});
</script>

<template>
    <div class="viewcontainer">
        <SearchCrewFilter @search="handleSearch" @sort="handleSort" />

        <div class="crew-container">
            <div v-if="loading" class="loading text-reg-normal">Loading...</div>
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