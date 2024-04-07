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
    <div class="container">
        <button v-if="shape === 'circle'" class="circle-button">
            <component :is="iconComponent" class="plus-icon" />
        </button>
        <button v-else class="square-button">
            <component :is="iconComponent" class="plus-icon" />
        </button>
    </div>
</template>

<style scoped>
.container {
width: 50% /* Change if needed */
}

.circle-button,
.square-button {
    border: 2px solid var(--black);
    background-color: transparent;
    padding: 10px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
}

.circle-button {
    border-radius: 50%;
    height: 160px;
    width: 160px;
}

.square-button {
    border-radius: 5px;
    height: 160px;
    width: 336px;
}

.plus-icon {
    stroke-width: 2px;
    width: 48px;
    height: 48px;   
}
</style>
