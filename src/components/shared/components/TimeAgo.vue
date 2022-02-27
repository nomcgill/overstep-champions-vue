<template>
    <span :meta="refreshingNow" class="timestamp">{{ calculateRoundedTimeDifference(timestamp) }} ago</span>
</template>
 
<script>

//   <time-ago 
//         :timer="timer"
//         :createdTime="createdTime"
//         :timestamp="timestamp"
//   />

// The timestamp on any passed in prop should be a result of...
// timestamp: new Date()




// This component requires a PARENT timer to sync all updating times. The parent must have...

    // created(){
    //     setInterval(() => {
    //         this.timer = this.timer + 5
    //     }, 5000);
    // },

    // data(){
    //     return {
    //         // For the timer
    //         timer: 0,
    //         createdTime: (Date.now())        
    //     }
    // },

    // methods: {
    //     cancelAutoUpdate () {
    //         clearInterval(this.timer);
    //     }
    // },

    // beforeDestroy () {
    //     this.cancelAutoUpdate();
    // }


export default {
    name: 'TimeAgo',
    props: {
        timer: {
            required: true
        },
        createdTime: {
            required: true
        },
        // timestamp: new Date()
        timestamp: {
            required: true
        }

    },
    computed: {
        // Have to use this.timer in a computed in order to keep timestamps updated.
        refreshingNow(){
            let currentTime = new Date(this.createdTime + this.timer * 1000)
            console.log(currentTime.getHours())
            // let getHours = (currentTime.getHours()<10?'0':'') + currentTime.getHours()
            let getHours = currentTime.getHours()
            let getMinutes = (currentTime.getMinutes()<10?'0':'') + currentTime.getMinutes()
            let hours = getHours < 13 ? getHours : getHours - 12
            let ampm = getHours < 12 ? 'am' : 'pm'
            return hours + ':' + getMinutes + ampm
        }
    },
    data(){
        return {
                
        }
    },
    methods:{
        // Outputs how long ago, rounded with either the biggest unit or the nearest 5 seconds.
        calculateRoundedTimeDifference(timestamp){
            let truncatedDifference = ~~(new Date()) - ~~(timestamp)
            return this.secondsToDhms(this.roundToNearestFive(truncatedDifference / 1000))
        },
        roundToNearestFive(x){
            return Math.ceil(x/5)*5;
        },
        secondsToDhms(seconds) {
            seconds = Number(seconds);
            var w = Math.floor(seconds / (3600*24*7));
            var d = Math.floor(seconds / (3600*24));
            var h = Math.floor(seconds % (3600*24) / 3600);
            var m = Math.floor(seconds % 3600 / 60);
            var s = Math.floor(seconds % 60);

            var wDisplay = w > 0 ? w + (w == 1 ? " week" : " weeks") : false;
            var dDisplay = d > 0 ? d + (d == 1 ? " day" : " days") : false;
            var hDisplay = h > 0 ? h + (h == 1 ? " hour" : " hours") : false;
            var mDisplay = m > 0 ? m + (m == 1 ? " minute" : " minutes") : false;
            var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : '';

            return wDisplay ? wDisplay
            : dDisplay ? dDisplay
            : hDisplay ? hDisplay
            : mDisplay ? mDisplay
            : sDisplay ? sDisplay
            : false
        }
    }
}
</script>
 
<style lang="scss" scoped>


</style>
 
 

