<script setup>
import { defineProps, ref, watchEffect } from 'vue';
import HistoryCard from '../../atoms/profile/HistoryCard.vue';

const props = defineProps({
    user: {
        type: Object,
        required: true
    }
});

const crewData = ref(null);
const jobs = ref([]);

const testJobs = [
    {
        employer: {
            name: "Test Employer",
            image: "https://via.placeholder.com/28"
        },
        date: "2023-06-01",
        location: {
            city: "Test City",
            country: "Test Country"
        }
    },
    {
        employer: {
            name: "Another Employer",
            image: "https://via.placeholder.com/28"
        },
        date: "2022-05-15",
        location: {
            city: "Another City",
            country: "Another Country"
        }
    },
    {
        employer: {
            name: "Another Employer",
            image: "https://via.placeholder.com/28"
        },
        date: "2022-05-15",
        location: {
            city: "Another City",
            country: "Another Country"
        }
    },
    {
        employer: {
            name: "Another Employer",
            image: "https://via.placeholder.com/28"
        },
        date: "2022-05-15",
        location: {
            city: "Another City",
            country: "Another Country"
        }
    },    {
        employer: {
            name: "Another Employer",
            image: "https://via.placeholder.com/28"
        },
        date: "2022-05-15",
        location: {
            city: "Another City",
            country: "Another Country"
        }
    },
    {
        employer: {
            name: "Another Employer",
            image: "https://via.placeholder.com/28"
        },
        date: "2022-05-15",
        location: {
            city: "Another City",
            country: "Another Country"
        }
    },
    {
        employer: {
            name: "Another Employer",
            image: "https://via.placeholder.com/28"
        },
        date: "2022-05-15",
        location: {
            city: "Another City",
            country: "Another Country"
        }
    },
    {
        employer: {
            name: "Another Employer",
            image: "https://via.placeholder.com/28"
        },
        date: "2022-05-15",
        location: {
            city: "Another City",
            country: "Another Country"
        }
    },
    {
        employer: {
            name: "Another Employer",
            image: "https://via.placeholder.com/28"
        },
        date: "2022-05-15",
        location: {
            city: "Another City",
            country: "Another Country"
        }
    },
    {
        employer: {
            name: "Another Employer",
            image: "https://via.placeholder.com/28"
        },
        date: "2022-05-15",
        location: {
            city: "Another City",
            country: "Another Country"
        }
    },
    {
        employer: {
            name: "Another Employer",
            image: "https://via.placeholder.com/28"
        },
        date: "2022-05-15",
        location: {
            city: "Another City",
            country: "Another Country"
        }
    },
    {
        employer: {
            name: "Another Employer",
            image: "https://via.placeholder.com/28"
        },
        date: "2022-05-15",
        location: {
            city: "Another City",
            country: "Another Country"
        }
    },
    {
        employer: {
            name: "Another Employer",
            image: "https://via.placeholder.com/28"
        },
        date: "2022-05-15",
        location: {
            city: "Another City",
            country: "Another Country"
        }
    },
    {
        employer: {
            name: "Another Employer",
            image: "https://via.placeholder.com/28"
        },
        date: "2022-05-15",
        location: {
            city: "Another City",
            country: "Another Country"
        }
    },
    {
        employer: {
            name: "Another Employer",
            image: "https://via.placeholder.com/28"
        },
        date: "2022-05-15",
        location: {
            city: "Another City",
            country: "Another Country"
        }
    },
    {
        employer: {
            name: "Another Employer",
            image: "https://via.placeholder.com/28"
        },
        date: "2022-05-15",
        location: {
            city: "Another City",
            country: "Another Country"
        }
    },
    {
        employer: {
            name: "Another Employer",
            image: "https://via.placeholder.com/28"
        },
        date: "2022-05-15",
        location: {
            city: "Another City",
            country: "Another Country"
        }
    },
    {
        employer: {
            name: "Another Employer",
            image: "https://via.placeholder.com/28"
        },
        date: "2022-05-15",
        location: {
            city: "Another City",
            country: "Another Country"
        }
    },
    {
        employer: {
            name: "Another Employer",
            image: "https://via.placeholder.com/28"
        },
        date: "2022-05-15",
        location: {
            city: "Another City",
            country: "Another Country"
        }
    },
    {
        employer: {
            name: "Another Employer",
            image: "https://via.placeholder.com/28"
        },
        date: "2022-05-15",
        location: {
            city: "Another City",
            country: "Another Country"
        }
    }
];

watchEffect(() => {
    if (props.user && props.user.crewData) {
        crewData.value = props.user.crewData;
        jobs.value = props.user.crewData?.profileDetails.jobs || [];
        console.log('About received crewData:', crewData.value);
    }
    jobs.value = testJobs; /* doe dit weg & testJobs weg en dan moet het werken met data dat binnenkomt (hoop ik) */
});
</script>

<template>
    <div class="activity__jobs">
        <HistoryCard v-for="job in jobs" :key="job.date" :job="job" />
    </div>
</template>

<style scoped>
    .activity__jobs {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 1rem;
    }
</style>