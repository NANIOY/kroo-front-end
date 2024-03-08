<script setup>
 

</script>

<template>

<div>   

    <p>Idle</p>

    <div style="margin-left: 15%;">
        <div>
            <button class="button button-bg-primary button-text-primary button--large button--primary button--idle--standard"> > Label</button>
            <br>
            <button class="button button-bg-primary button-text-primary button--large button--primary button--idle--label">  Label</button>
            <br>
            <button class="button  button-bg-primary button-text-primary button--large button--secondary button--idle--icon" > > </button>
            <br>   <br>

            <button class="button button-bg-secondary button-text-secondary button--large button--secondary button--idle--standard"> > Label</button>
            <br>
            <button class="button button-bg-secondary button-text-secondary button--large button--secondary button--idle--label"> Label</button>
            <br>
            <button class="button button-bg-secondary button-text-secondary button---large button--secondary button--idle--icon"> > </button>
            <br>   <br>

            <button class="button button-stroke button-bg-tertiary button-text-tertiary button--large button--tertiary button--idle--standard"> > Label</button>
            <br>
            <button class="button button-stroke button-bg-tertiary button-text-tertiary button--large button--tertiary button--idle--label"> Label</button>
            <br>
            <button class="button button-stroke button-bg-tertiary button-text-tertiary button---large button--tertiary button--idle--icon"> > </button>
    </div>



    <br>   <br>

<br>   <br>
<p>Active</p>

<div style="margin-left: 15%;">
    <div>
        <button class="button button-bg-primary-active button-text-primary button--large button--primary button--active--standard"> > Label</button>
        <br>
        <button class="button button-bg-primary-active button-text-primary button--large button--primary button--active--label">  Label</button>
        <br>
        <button class="button  button-bg-primary-active button-text-primary button--large button--secondary button--active--icon" > > </button>
        <br>   <br>

        <button class="button button-bg-secondary-active button-text-secondary button--large button--secondary button--active--standard"> > Label</button>
        <br>
        <button class="button button-bg-secondary-active button-text-secondary button--large button--secondary button--active--label"> Label</button>
        <br>
        <button class="button button-bg-secondary-active button-text-secondary button---large button--secondary button--active--icon"> > </button>
        <br>   <br>

        <button class="button button-stroke button-bg-primary-active button-text-primary button--large button--tertiary button--active--standard"> > Label</button>
        <br>
        <button class="button button-stroke button-bg-primary-active button-text-primary button--large button--tertiary button--active--label"> Label</button>
        <br>
        <button class="button button-stroke button-bg-primary-active button-text-primary button---large button--tertiary button--active--icon"> > </button>
    </div>
</div>

<br>   <br>

<p>Disabled</p>

<div style="margin-left: 15%;">
    <div>
        <button class="button button-bg-disabled button-text-disabled button--large button--disabled button--disabled--standard"> > Label</button>
        <br>
        <button class="button button-bg-disabled button-text-disabled button--large button--disabled button--disabled--label">  Label</button>
        <br>
        <button class="button  button-bg-disabled button-text-disabled button--large button--disabled button--disabled--icon" > > </button>
        <br>   <br>

        <button class="button button-bg-disabled button-text-disabled button--large button--disabled button--disabled--standard"> > Label</button>
        <br>
        <button class="button button-bg-disabled button-text-disabled button--large button--disabled button--disabled--label"> Label</button>
        <br>
        <button class="button button-bg-disabled button-text-disabled button---large button--disabled button--disabled--icon"> > </button>
        <br>   <br>

        <button class="button button-bg-disabled button-text-disabled button--large button--disabled button--disabled--standard"> > Label</button>
        <br>
        <button class="button  button-bg-disabled button-text-disabled button--large button--disabled button--disabled--label"> Label</button>
        <br>
        <button class="button button-bg-disabled button-text-disabled button---large button--disabled button--disabled--icon"> > </button>
    </div>
</div>




  </div>


</div>

</template>

<style>

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
        width: 160px;
        height:40px;
    }

    /* Secondary State */
    .button--secondary {
        width: 160px;
        height:40px;
    }

    /* Tertiary State */
    .button--tertiary {
        width: 160px;
        height:40px;
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
        width: 160px;
        height:40px;
        padding: 0;
    }

    .button--idle--label {
        width: 160px;
        height:40px;
        padding: 0;
    }

    .button--idle--icon {
        width: 28px;
        height:28px;
        padding: 0;
    }

    /* Additional variations for Hover state */
    .button--hover--standard:hover {
        width: 160px;
        height:40px;
    }

    .button--hover--label:hover {
        width: 160px;
        height:40px;
    }

    .button--hover--icon:hover {
        width: 28px;
        height:28px;
    }

    /* Additional variations for Active state */
    .button--active--standard:active {
        width: 160px;
        height:40px;
    }

    .button--active--label:active {
        width: 160px;
        height:40px;
    }

    .button--active--icon:active {
        width: 28px;
        height:28px;
    }

    /* Additional variations for Disabled state */
    .button--disabled--standard {
        width: 160px;
        height:40px;
    }

    .button--disabled--label {
        width: 160px;
        height:40px;
    }

    .button--disabled--icon {
        width: 28px;
        height:28px;
    }


   
</style>

