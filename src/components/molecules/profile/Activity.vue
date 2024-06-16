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
      name: "VRT",
      image: "https://pbs.twimg.com/profile_images/1606284280149204992/VDsLcX72_400x400.jpg"
    },
    date: "2024-01-15",
    location: {
      city: "Brussel",
      country: "Belgium"
    },
  },
  {
    employer: {
      name: "Studio 100",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYPOUP-dtI4ZV74xVOZufAqwHHlIhAyRoJxw&s"
    },
    date: "2024-02-20",
    location: {
      city: "Schelle",
      country: "Belgium"
    }
  },
  {
    employer: {
      name: "Dedsit",
      image: "https://pbs.twimg.com/profile_images/1656867507/dedsit_logo_1797_bol_RGB_groot_400x400.jpg"
    },
    date: "2024-03-05",
    location: {
      city: "Antwerpen",
      country: "Belgium"
    }
  },
  {
    employer: {
      name: "Woestijnvis",
      image: "https://static.flashintel.ai/image/5/7/4/57416abeaabbd5baa76374f2006e9753.jpeg"
    },
    date: "2024-04-10",
    location: {
      city: "Vilvoorde",
      country: "Belgium"
    }
  },
  {
    employer: {
      name: "De Mensen",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3bT5uy3WghpuM9pOiUYjw7Er-jbQDnS1zNQ&s"
    },
    date: "2024-05-25",
    location: {
      city: "Zaventem",
      country: "Belgium"
    }
  },
  {
    employer: {
      name: "Lumière",
      image: "https://cdn.webshopapp.com/shops/77966/files/251900183/lumiere.jpg"
    },
    date: "2024-06-10",
    location: {
      city: "Gent",
      country: "Belgium"
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