<script>
import { Plus } from '@iconoir/vue';

export default {
    name: 'ImageUploadButton',
    props: {
        shape: {
            type: String,
            default: 'circle' // Default shape is circle
        },
        iconType: {
            type: String,
            default: 'plus' // Default icon is plus
        }
    },
    computed: {
        iconComponent() {
            switch (this.iconType.toLowerCase()) {
                case 'plus':
                    return Plus;
                default:
                    return Plus; // Default to Plus icon if iconType is unknown
            }
        }
    }
}
</script>

<template>
    <div>
        <button v-if="shape === 'circle'" class="circle-button">
            <component :is="iconComponent" />
        </button>
        <button v-else class="square-button">
            <component :is="iconComponent" />
        </button>
    </div>
</template>

<style scoped></style>