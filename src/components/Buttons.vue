<script setup>
 

</script>

<template>

<div>   

    <button class="button button--large button--primary">Label</button>
    <button class="button button--no-background button--tertiary">Label</button>
    <button class="button button--idle button--secondary">Label</button>
    <button class="button button--hover button--secondary">Label</button>
    <button class="button button--active button--secondary">Label</button>
    <button class="button button--disabled button--secondary" disabled>Label</button>

</div>

</template>

<style>
    /* Base styles */
    button {
        border: none;
        border-radius: 5%;
        color: white;
        padding: 14px 60px;
        margin-left: 10%;
        text-align: center;
        text-decoration: none;
        font-size: 16px;
        width: 160px;
        height:40px;
      }

    /* Large version */
    .button--large {
        font-size: 20px;
        padding: 16px 55px;
        width: 160px;
        height:48px;
    }

    /* No background version */
    .button--no-background {
        background-color: transparent;
        color: #7140ED;
    }

    /* Primary State */
    .button--primary {
        background-color: #7140ED;
        color: #F5F5F5;
    }

    /* Secondary State */
    .button--secondary {
        background-color: #99ED40;
        color: #F5F5F5;
    }

    /* Tertiary State */
    .button--tertiary {
        background-color: #F5F5F5;
        color: #0E0F0F;
        border: #0E0F0F solid 2.5px;
    }

    /* Idle State */
    .button--idle {
        background-color: #ecf0f1;
        color: #333;
    }

    /* Hover State */
    .button--hover:hover {
        background-color: #45a049;
        color: white;
    }

    /* Active State */
    .button--active:active {
        background-color: #2ecc71;
        color: white;
    }

    /* Disabled State */
    .button--disabled {
        background-color: #A1A1A1;
        color: #666;
        cursor: not-allowed;
    }

     /* Additional variations for Idle state */
     .button--idle--standard {
        /* Idle standard style */
    }

    .button--idle--label {
        /* Idle state with label specific style */
    }

    .button--idle--icon {
        /* Idle state with icon specific style */
    }

    /* Additional variations for Hover state */
    .button--hover--standard:hover {
        /* Hover standard style */
    }

    .button--hover--label:hover {
        /* Hover state with label specific style */
    }

    .button--hover--icon:hover {
        /* Hover state with icon specific style */
    }

    /* Additional variations for Active state */
    .button--active--standard:active {
        /* Active standard style */
    }

    .button--active--label:active {
        /* Active state with label specific style */
    }

    .button--active--icon:active {
        /* Active state with icon specific style */
    }

    /* Additional variations for Disabled state */
    .button--disabled--standard {
        /* Disabled standard style */
    }

    .button--disabled--label {
        /* Disabled state with label specific style */
    }

    .button--disabled--icon {
        /* Disabled state with icon specific style */
    }

    /* Add more variations as needed */
   
</style>

