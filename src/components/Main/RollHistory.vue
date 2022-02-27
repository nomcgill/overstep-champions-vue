<template>
    <div id="roll-history-pane">
        <h3>Roll History</h3>
        <p>{{ refreshingNow }}</p>
        <div 
            v-for="(roll, key) in mostRecentRolls.slice().reverse()"
            class="roll-history-row"
            :key="key"
        >
            <p>
                <span class="bold">{{ roll.resultWords.title }}</span>, 
                    <time-ago 
                        :timer="timer"
                        :createdTime="createdTime"
                        :timestamp="roll.timestamp"
                    /> 
            </p>
            <p>
                {{ roll.diceNumbers.length === 1 ? roll.diceNumbers[0] : roll.diceNumbers[0] + ' and ' + roll.diceNumbers[1] }} 
                {{ roll.upperHand ? ' | Upper Hand' : '' }}
                {{ strengthenDisplayText(roll) }}
            </p>
        </div>
    </div>
</template>
 
<script>

export default {
    name: 'RollHistory',
    props: {
        mostRecentRolls: {
            required: true
        }
    },
    created(){
        setInterval(() => {
            this.timer = this.timer + 5
        }, 5000);
    },
    computed: {
        // Have to use this.timer in a computed in order to keep timestamps updated.
        refreshingNow(){
            let currentTime = new Date(this.createdTime + this.timer * 1000)
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
            
            // For the timer
            timer: 0,
            createdTime: (Date.now())        
        }
    },
    methods:{
        // Outputs how long ago, rounded with either the biggest unit or the nearest 5 seconds.
        // calculateRoundedTimeDifference(rollTimeStamp){
        //     let truncatedDifference = ~~(new Date()) - ~~(rollTimeStamp)
        //     return this.secondsToDhms(this.roundToNearestFive(truncatedDifference / 1000))
        // },
        // roundToNearestFive(x){
        //     return Math.ceil(x/5)*5;
        // },
        // secondsToDhms(seconds) {
        //     seconds = Number(seconds);
        //     var w = Math.floor(seconds / (3600*24*7));
        //     var d = Math.floor(seconds / (3600*24));
        //     var h = Math.floor(seconds % (3600*24) / 3600);
        //     var m = Math.floor(seconds % 3600 / 60);
        //     var s = Math.floor(seconds % 60);

        //     var wDisplay = w > 0 ? w + (w == 1 ? " week" : " weeks") : false;
        //     var dDisplay = d > 0 ? d + (d == 1 ? " day" : " days") : false;
        //     var hDisplay = h > 0 ? h + (h == 1 ? " hour" : " hours") : false;
        //     var mDisplay = m > 0 ? m + (m == 1 ? " minute" : " minutes") : false;
        //     var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : '';

        //     return wDisplay ? wDisplay
        //     : dDisplay ? dDisplay
        //     : hDisplay ? hDisplay
        //     : mDisplay ? mDisplay
        //     : sDisplay ? sDisplay
        //     : false
        // },
        strengthenDisplayText(roll){
            return roll.strengthenWeakenLevel > 0 ? ' | Strengthen x' + Math.abs(roll.strengthenWeakenLevel)
            : roll.strengthenWeakenLevel < 0 ? ' | Weaken x' + Math.abs(roll.strengthenWeakenLevel)
            : '' 
        }
    }

}
</script>
 
<style lang="scss" scoped>


</style>
 
 

