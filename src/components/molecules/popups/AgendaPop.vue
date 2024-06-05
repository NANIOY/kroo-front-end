<script setup>
import { ref, defineProps, defineEmits } from 'vue';
import setupAxios from '../../../setupAxios';
import NormalButton from '../../atoms/buttons/NormalButton.vue';
import LargeButton from '../../atoms/buttons/LargeButton.vue';
import InputField from '../../atoms/inputs/InputField.vue';
import Dropdown from '../../atoms/inputs/DropDown.vue';
import Overlay from './Overlay.vue';
import DatePicker from '../../atoms/inputs/DatePicker';
import TimePicker from '../../atoms/inputs/TimePicker';

const props = defineProps({
    isVisible: {
        type: Boolean,
        default: false,
    }
});

const emits = defineEmits(['close', 'submit']);

const isButton2Secondary = ref(false);

const title = ref('');
const description = ref('');
const selectedDate = ref('');
const startTime = ref('');
const endTime = ref('');
const priorityOptions = ['Low Priority', 'Medium Priority', 'High Priority'];
const selectedPriority = ref(priorityOptions[0]);

const axiosInstance = setupAxios();

const toggleButton2Color = () => {
    isButton2Secondary.value = !isButton2Secondary.value;
};

const revertButton2Color = () => {
    isButton2Secondary.value = !isButton2Secondary.value;
};

const closeModal = () => {
    emits('close');
};

const handleSubmit = async () => {
    const userId = sessionStorage.getItem('userId');
    const summary = title.value;
    const desc = description.value;

    const [startHour, startMinute] = startTime.value.split(':');
    const [endHour, endMinute] = endTime.value.split(':');

    const startDateTime = new Date(selectedDate.value);
    startDateTime.setHours(parseInt(startHour), parseInt(startMinute));

    const endDateTime = new Date(selectedDate.value);
    endDateTime.setHours(parseInt(endHour), parseInt(endMinute));

    const event = {
        summary,
        description: desc,
        startDateTime: startDateTime.toISOString(),
        endDateTime: endDateTime.toISOString(),
        timeZone: 'America/Los_Angeles',
        userId
    };

    console.log('Sending event:', event);

    try {
        const response = await axiosInstance.post('/calendar/google/schedule_event', event);
        console.log('Event scheduled successfully:', response.data);
    } catch (error) {
        console.error('Error scheduling event:', error);
    }
};
</script>

<template>
    <Overlay class="modal__overlay" v-if="isVisible" @overlayClick="closeModal">
        <div class="modal" @click.stop>
            <div class="modal__buttons">
                <NormalButton label="Personal" :hasRequest=false
                    :class="{ 'button--secondary': !isButton2Secondary, 'button--tertiary': isButton2Secondary }"
                    @click="revertButton2Color" />
                <NormalButton label="Professional" :hasRequest=false
                    :class="{ 'button--secondary': isButton2Secondary, 'button--tertiary': !isButton2Secondary }"
                    @click="toggleButton2Color" />
            </div>
            <div class="modal__inputs">
                <InputField v-model="title" placeholder="Aa" :hasLabel="true" label="Title" />
                <DatePicker v-model="selectedDate" :hasLabel="true" label="Date" />
                <div class="modal__inputs__time">
                    <TimePicker v-model="startTime" :hasLabel="true" label="Start time" />
                    <TimePicker v-model="endTime" :hasLabel="true" label="End time" />
                </div>
                <Dropdown label="Priority" :options="priorityOptions" :hasLabel="true" />
                <InputField v-model="description" placeholder="Aa" :hasLabel="true" label="Description" />
            </div>
            <LargeButton label="Add" class="button--primary" @click="handleSubmit" />
        </div>
    </Overlay>
</template>


<style scoped>
.modal {
    background-color: var(--white);
    color: var(--black);
    box-shadow: 0px 0px 16px 0 rgba(14, 15, 15, 0.04);
    padding: 48px;
    border-radius: 8px;
    width: 600px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 50%;
    transform: translateY(-50%);
    right: 64px;
    gap: 32px;
}

.modal__buttons {
    display: flex;
    gap: 12px;
}

.modal__inputs {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.modal__inputs__time {
    display: flex;
    gap: 12px;
}

.modal__inputs__time>* {
    flex: 1;
}

.button--secondary,
.button--tertiary {
    padding: 0px 12px;
}
</style>