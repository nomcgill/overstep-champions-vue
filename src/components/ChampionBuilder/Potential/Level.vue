<template>
    <div id="level-row">
        <button class="button-type-1" @click="changeLevel(false)" :class="{ disabled: currentLevel < 2}">-</button>
        <p>Level {{ currentLevel }}</p>
        <button class="button-type-1" @click="changeLevel(true)" :class="{ disabled: currentLevel > 11}">+</button>
    </div>
</template>

<script>

export default {
    name: 'Level',
    props: {
        champion: {
            required: true
        }
    },
    computed: {
        currentRoute(){
            return this.$route.name
        },
        currentLevel(){
            return this.champion.level
        }
    },
    data() {
        return {
        }
    },
    methods: {
        changeLevel(upOrDown){
            
            let oldLevel = Number(this.champion.level)
            let newLevel
            upOrDown ? newLevel = oldLevel + 1 : newLevel = oldLevel - 1
            // if (0 < newLevel && newLevel < 13){
                this.$bus.$emit(this.$bus.SET_CHAMPION_LEVEL, newLevel)
            // }
            // TO-DO: Vue bus to change level at App level.
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

#level-row {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    flex-wrap: nowrap;
    align-items: center;
    /* border: solid 1px black; */
    /* margin: 15px 0px 5px; */
    width: 100%;
    white-space: nowrap;
    /* margin-bottom: 2%; */
}

#level-row > * {
    margin: 10px;
}

p {
    font-size: 1.1em;
    font-weight: 900;
}

#level-row button {
    /* padding: 5px; */
    width: 1.5em;
    font-size: 3em;
    padding: 0;
}

</style>