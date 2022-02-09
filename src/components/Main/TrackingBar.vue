<template>
    <div id="tracking-bar">
        <div>
            <h3>Notes</h3>
        </div>
        <div>
            <h3>Overstep</h3>
        </div>
        <div>
            <h3>HP</h3>
            <p>{{ champion.hp.current }}/{{ maxHP }}</p>
        </div>
        <div>
            <h3>DMG</h3>
            <p>{{ championDamage }}</p>
        </div>
    </div>
</template>

<script>

/* eslint-disable no-debugger */


export default {
    name: 'TrackingBar',
    components: {
    },
    props: {
        database: {
            required: true
        },
        champion: {
            type: Object
        }
    },
    computed: {
        maxHP(){
            let totalEdits = 0
            // Go through system edits to the maxHP, like Demonic Origin.
            for (let eachEditObject of this.champion.hp.max.systemEdits){
                totalEdits = totalEdits + eachEditObject.number
            }
            // Then go through any homebrew edits to maxHP.
            for (let eachEditObject of this.champion.hp.max.homebrewEdits){
                totalEdits = totalEdits + eachEditObject.number
            }
            return this.database.roles.filter(role=>role.title === this.champion.role)[0].hp + totalEdits
        },
        // Similar to maxHP process
        championDamage(){
            let totalEdits = 0
            // Go through system edits to the damage, like Demonic Origin.
            for (let eachEditObject of this.champion.damage.systemEdits){
                totalEdits = totalEdits + eachEditObject.number
            }
            // Then go through any homebrew edits to damage.
            for (let eachEditObject of this.champion.damage.homebrewEdits){
                totalEdits = totalEdits + eachEditObject.number
            }
            return this.database.roles.filter(role=>role.title === this.champion.role)[0].damage + totalEdits
        }
    },
    data () {
        return {
        }
    },
    methods: {

    }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

#tracking-bar {
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: sticky;
    height: 50px;
    /* line-height: 50px; */
    top: 20px;
    background-color: white;
    border-bottom: 1px solid black;
    box-shadow: 0 3px 6px rgb(0 0 0 / 10%);
    z-index: 10;
    margin: 0 -.5em;
}

#tracking-bar > div {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
}

</style>