<template>
 <div class="esp-spinner__container">
   <div class="esp-spinner" v-show="status" :style="spinnerStyle" role="alert"></div>
   <p v-if="message">{{message}}</p>
 </div>
</template>
 
<script>
export default {
 name: 'Spinner',
 props: {
   status: {
     type: Boolean,
     default: true
   },
   size: {
     type: Number,
     default: 60
   },
   depth: {
     type: Number,
     default: 2
   },
   speed: {
     type: Number,
     default: 1.0
   },
   message: {
     type: String,
     required: false
   }
 },
 computed: {
   spinnerSize () {
     return this.size + 'px'
   },
   spinnerDepth () {
     return this.depth + 'px'
   },
   spinnerSpeed () {
     return this.speed + 's'
   },
   spinnerStyle () {
     return {
       width: this.spinnerSize,
       height: this.spinnerSize,
       borderWidth: this.spinnerDepth,
       animationDuration: this.spinnerSpeed
     }
   }
 }
}
</script>
 
<style lang="scss" scoped>
    .esp-spinner__container{
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .esp-spinner {
        border-style: solid;
        transform: translateZ(0);
        animation: forward linear infinite;
        border-radius: 50%;
        width: 30px;
        height: 30px;
        border-color: rgba(darkblue, 0.15);
        border-left-color: rgba(darkblue, 1);
    }
    @keyframes forward {
        0% {
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
        }
        100% {
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
        }
    }
    }
</style>
 
 

