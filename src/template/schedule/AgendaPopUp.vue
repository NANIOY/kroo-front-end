<script>
import NormalButton from '../../components/atoms/buttons/NormalButton.vue';

export default {
    props: {
        button1Label: {
            type: String,
            default: 'Button 1'
        },
        button2Label: {
            type: String,
            default: 'Button 2'
        }
    },
    components: {
        NormalButton,
    },
};
</script>

<template>
    <div class="backPlate">
        <NormalButton :label="button1Label" />
        <NormalButton :label="button2Label" />
    </div>
</template>

<style>
.backPlate {
    width: 600px;
    height: 674px;
    background-color: var(--white);
    border-radius: 8px;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}
</style>