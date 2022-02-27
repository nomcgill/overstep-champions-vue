<template>
    <div id="tracking-bar">
        <div id="tracking-bar-top">
            <div>
                <h3 :class="{overstepped: overstepped}">Overstep</h3>
            </div>
            <div>
                <h3>HP</h3>
                <p>{{ champion.hp.current }}/{{ maxHP }}</p>
            </div>
            <div>
                <h3>DMG</h3>
                <p>{{ championDamage }}</p>
            </div>
            <div id="clipboard-icon-box">
                <img :src="clipboard" alt="clipboard icon" id="clipboard-icon"/>
            </div>
        </div>
        <div class="section-tab-row" v-if="menuOpen">
            <img class="section-tab" id="search-icon" :src="searchIcon" alt="magnifying glass search icon" @click="textFilterIsOpen = !textFilterIsOpen; $nextTick(()=> focusOnTextFilterInput())"/>
            <div class="section-tab" style="color: gray; border-left: solid 1px black; padding-left: 20px; margin-left: 0; margin-right: -10px;">Sort:</div>
            <div class="section-tab" @click="$emit('changeSort', 'level')" :class="{ activeSorting: sortingBy === 'level' }">Level</div>
            <div class="section-tab" @click="$emit('changeSort', 'actionType')" :class="{ activeSorting: sortingBy === 'actionType' }">Action Type</div>
            <div class="section-tab" @click="$emit('changeSort', 'category')" :class="{ activeSorting: sortingBy === 'category' }">Category</div>
        </div>
        <input 
            v-model.trim="textFilter" 
            v-if="textFilterIsOpen" 
            type="search" 
            id="text-filter"
            placeholder="Search through skills..."
            @focus="focusedTextFilter = true"
            @blur="focusedTextFilter = false"
        >   
        <div class="dropdown-menu-tab">
            <div id="toggle-skill-tab-portion" @click="toggleAll">Toggle Boxes</div>
            <div id="dropdown-tab-arrow-background" @click="toggleFilterMenu">
                <arrow :direction="arrowDirection" :class="{menuOpen: menuOpen}"/>
            </div>
        </div>
    </div>
</template>

<script>

/* eslint-disable no-debugger */

import MagnifyingGlass from '@/assets/foundation-icons/svgs/fi-magnifying-glass.svg'
import Clipboard from '@/assets/foundation-icons/svgs/fi-clipboard.svg'

export default {
    name: 'TrackingBar',
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
            clipboard: Clipboard,
            menuOpen: false,
            textFilter: '',
            textFilterIsOpen: false,
            baseScrollYValue: false,
            focusedTextFilter: false
        }
    },
    watch: {
        focusedTextFilter: function(newFocusedState){
            // As soon as textFilter becomes unfocused, check if it is also empty.
            if (!newFocusedState && this.textFilter.length === 0){
                // And beginning waiting for scroll to close the input.
                this.closeOnSmallScroll()
            }
            else {
                // Function will cancel event listener when it sees an active div.
                this.closeOnSmallScroll()
            }
        },
        menuOpen: function(newOpenStatus){
            // If the menu is newly open...
            if (newOpenStatus){
                // Make sure that the text filter now open.
                this.textFilterIsOpen = true
                this.$nextTick(()=> this.focusOnTextFilterInput())
            }
        },
        textFilterIsOpen: function(){
            this.closeOnSmallScroll()
        },
        textFilter: function (newTextFilter) {
            this.$emit('setTextFilter', newTextFilter)
            if (newTextFilter === ''){
                document.body.scrollTop = document.documentElement.scrollTop = 95;
            }
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
        },
        focusOnTextFilterInput(){
            if (this.textFilterIsOpen){
                document.getElementById("text-filter").focus({preventScroll:true})
            }
        },
        // Watch for deselect and small scroll.
        closeOnSmallScroll(){
            this.baseScrollYValue = window.scrollY
            let vm = this
            let lastKnownScrollPosition = 0;
            let ticking = false;

            // If scrolling and textFilter still empty, then close textFilter input and stop listening.
            function scrollingAction(scrollPos) {
                // While active, constantly reset starting point for where to begin detecting scroll position.
                if (vm.focusedTextFilter){
                    vm.baseScrollYValue = scrollPos
                }
                if (
                    Math.abs(vm.baseScrollYValue - scrollPos) > 200
                    && vm.textFilter.length === 0
                ){
                    // Closing due to scroll.
                    vm.textFilterIsOpen = false
                }
            }

            function scrollListener() {
                lastKnownScrollPosition = window.scrollY;
                if (!ticking) {
                    window.requestAnimationFrame(function() {
                        scrollingAction(lastKnownScrollPosition);
                        ticking = false;
                    });
                    ticking = true;
                }
            }

            document.addEventListener('scroll', scrollListener);
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
    height: 45px;
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
    padding: 3px 5px;
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
    padding-left: 15px;
    padding-right: 5px;
}

.overstepped {
    color: #A41720;
    /* text-decoration: line-through; */
    /* font-weight: 900; */
}

#text-filter {
    height: 27px;
    /* margin: 3px 6px; */
    width: 200px;
    border-radius: 0;
    border: none;
    border-bottom: solid 1px black;
    border-right: solid 1px black;
    box-shadow: 0 3px 6px rgb(0 0 0 / 10%);
    padding-left: 10px;
    padding-top: 4px;
    font-size: .85em;
}

#text-filter:focus-visible {
    outline: none;
    /* border: none; */
    /* outline: solid 1px rgb(116, 76, 1); */
}

::-webkit-search-cancel-button {
    /* position:relative; */
    /* right:20px;   */

    /* -webkit-appearance: none; */

    /* height: 20px; */
    /* width: 20px;
    border-radius:10px;
    background-color: gray; */

    /* background: red; */
    /* height: 16px; */
    /* width: 16px; */
    background-color: #434343;
    border-radius: 5px;
    position: relative;
}

::-webkit-search-cancel-button:after {
    /* position: absolute; */
    /* top: 0;
    bottom: 0;
    left: 0;
    right: 0; */
    content: "\274c"; /* use the hex value here... */
    font-size: 16px; 
    color: #FFF;
    line-height: 16px;
    text-align: center;
}

.dropdown-menu-tab {
    float: right;
    /* margin-top: -1px; */
    margin-right: -2px;
    height: 25px;
    /* width: 35px; */
    /* border-radius: 0 0  0; */
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
    font-size: .85em;
    /* border-right: solid 1px black; */
    /* padding-right: 8px;
    padding-top: 7px; */
}

#dropdown-tab-arrow-background {
    margin: 0;
    height: 100%;
    width: 35px;
    border-left: solid 1px black;
    background-color: #65a779;
}

#tracking-bar .dropdown-arrow {
    /* padding-top: 20px; */
    margin-top: 6px;
    margin-right: 12px;
    padding: 4px;
    border-color: white;
}

#tracking-bar .dropdown-arrow.menuOpen {
    margin-top: 10px
}

#clipboard-icon-box {
    height: 60px;
}

#clipboard-icon {
    height: 60%;
    padding: 10% 70% 20%;
    opacity: .8;
    /* color: white; */
}

</style>