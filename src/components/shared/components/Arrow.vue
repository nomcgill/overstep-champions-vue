<template>
    <div class="dropdown-arrow" v-bind:class="direction"></div>
</template>
 
<script>
export default {
    name: 'Arrow',
    props: {
        direction: {
            required: true
        }
    },
    computed: {

    }
}
</script>
 
<style lang="scss" scoped>
    .dropdown-arrow {
        border: solid black;
        border-width: 0 2px 2px 0;
        display: inline-flex;
        padding: 3px;
        // margin-right: 20px;
        // margin-bottom: -15px;
        // right: 0;
        // position: absolute;
        margin-top: 17px;
        margin-right: 8px;
        float: right;
        z-index: 1;
        // position: relative;
    }

    .right {
        transform: rotate(-45deg);
        -webkit-transform: rotate(-45deg);
    }

    .down {
        transform: rotate(45deg);
        -webkit-transform: rotate(45deg);
    }

</style>
 
 

