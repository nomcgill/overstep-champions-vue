<template>
    <div id="tracking-bar">
        <div id="tracking-bar-top">
            <div>
                <h3 :class="{overstepped: overstepped}">Overstep</h3>
            </div>
            <div>
                <h3>Notes</h3>
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
        <div class="section-tab-row" v-if="menuOpen">
            <img class="section-tab" id="search-icon" :src="searchIcon" alt="magnifying glass search icon" />
            <div class="section-tab" style="border-left: solid 1px black; padding-left: 10px; margin-left: 0; margin-right: 0px;">Sort:</div>
            <div class="section-tab" @click="$emit('changeSort', 'level')" :class="{ activeSorting: sortingBy === 'level' }">Level</div>
            <div class="section-tab" @click="$emit('changeSort', 'actionType')" :class="{ activeSorting: sortingBy === 'actionType' }">Action Type</div>
            <div class="section-tab" @click="$emit('changeSort', 'category')" :class="{ activeSorting: sortingBy === 'category' }">Category</div>
        </div>
        <!-- <div> -->
            <input v-model="textFilter" type="text" id="text-filter">
        <!-- </div> -->
        <div class="dropdown-menu-tab">
            <div id="toggle-skill-tab-portion" @click="toggleAll">Toggle Panels</div>
            <div id="dropdown-tab-arrow-background" @click="toggleFilterMenu">
                <arrow :direction="arrowDirection" :class="{menuOpen: menuOpen}"/>
            </div>
        </div>
    </div>
</template>

<script>

/* eslint-disable no-debugger */

import MagnifyingGlass from '@/assets/foundation-icons/svgs/fi-magnifying-glass.svg'
import Arrow from '@/components/shared/components/Arrow.vue'


export default {
    name: 'TrackingBar',
    components: {
        Arrow
    },
    props: {
        database: {
            required: true
        },
        champion: {
            type: Object
        },
        sortingBy: {
            type: String
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
        },
        arrowDirection(){
            return this.menuOpen ? 'up' : 'down'
        },
        overstepped(){
            return this.champion.overstepped
        }
    },
    data () {
        return {
            sortedBy: 'level',
            searchIcon: MagnifyingGlass,
            menuOpen: false,
            textFilter: ''
        }
    },
    methods: {
        toggleFilterMenu(){
            this.menuOpen = !this.menuOpen
        },
        toggleAll(){
            let allOpenedStatus = false
            this.champion.currentSkills.forEach(skill => {
                // Check if any skills are closed.
                if (!skill.opened){
                    allOpenedStatus = true
                }
            })
            this.$bus.$emit(this.$bus.ALL_SKILL_OPEN, allOpenedStatus)
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

#tracking-bar {
    position: sticky;
    top: 20px;
    /* background-color: white; */
    /* border-bottom: 1px solid black; */
    z-index: 10;
    margin: 0 -.5em;
    background-color: transparent;
}

#tracking-bar-top {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 50px;
    border-bottom: solid 1px black;
    background-color: white;
    /* line-height: 50px; */
        box-shadow: 0 3px 6px rgb(0 0 0 / 10%);

}

#tracking-bar-top > div {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
}

.section-tab-row {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    border-bottom: solid 1px black;
    background-color: white;
    box-shadow: 0 3px 6px rgb(0 0 0 / 10%);
}

.section-tab {
    margin: 5px 0px;
    /* padding: 5px; */
    /* height: 20px; */
    line-height: 20px;
    padding: 8px 5px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.activeSorting {
    background-color: #65a779;
    color: white;
}

#search-icon {
    height: 22px;
    /* padding: 5px 5px 5px 5px; */
    border-top: solid 0px black;
    border-right: solid 0px black;
    border-bottom: solid 0px black;
    border-left: solid 0px black;
    padding-left: 10px;
    padding-right: 0px;
}

.overstepped {
    color: #A41720;
    /* text-decoration: line-through; */
    /* font-weight: 900; */
}

#text-filter {
    height: 22px;
    margin: 3px 6px;
    width: 150px;
    border-radius: 0;
}

.dropdown-menu-tab {
    float: right;
    margin-top: -1px;
    margin-right: -2px;
    height: 25px;
    /* width: 35px; */
    border-radius: 5%;
    background-color: rgb(255, 255, 255);
    /* box-shadow: 0 0 2px black; */
    border: solid 1px black;
    display: flex;
    align-items: center;
    box-shadow: 0 3px 6px rgb(0 0 0 / 10%);
    /* border-top: none; */
    /* border-radius: 50%; */
    /* background-color: white; */
    /* height: 100px; */
    /* background:    linear-gradient(to bottom left,  rgb(255, 255, 255) 50%,transparent 50%) 100% 0/58px 58px,
   linear-gradient(to bottom right, rgba(0, 128, 0, 0) 50%,transparent 50%) 0 0/50px 50px,
   
   linear-gradient(to bottom right, rgba(165, 42, 42, 0) 50%,transparent 50%) 0 0/60px 60px,
   linear-gradient(to bottom left,  rgb(0, 0, 0) 50%,transparent 50%) 100% 0/60px 60px,
  rgba(255, 166, 0, 0); */
    /* background-repeat:no-repeat; */
    /* border: solid 1px black; */
}

#toggle-skill-tab-portion {
    padding: 6px 8px 3px 5px;
    /* border-right: solid 1px black; */
    /* padding-right: 8px;
    padding-top: 7px; */
}

#dropdown-tab-arrow-background {
    margin: 0;
    height: 100%;
    width: 35px;
    border-left: solid 1px black;
}

#tracking-bar .dropdown-arrow {
    /* padding-top: 20px; */
    margin-top: 6px;
    margin-right: 12px;
    padding: 4px;
}

#tracking-bar .dropdown-arrow.menuOpen {
    margin-top: 10px
}

</style>