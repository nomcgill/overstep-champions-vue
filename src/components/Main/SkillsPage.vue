<template>
    <div>
        <!-- <div id="go-to-roll-container"> -->
            <!-- <h2>{{ champion.name }}</h2> -->
            <!-- <img id="go-to-roll-action" @click="$emit('activateActionRollModal')" :src="dice" /> -->
        <!-- </div> -->
        <div id="skill-list-header-row">
            <h1>Skills</h1>
            <router-link to="/build/skills">edit</router-link>
            <!-- <div id="go-to-roll-action" @click="$emit('activateActionRollModal')">Roll Action &#187;</div> -->
            <div class="section-tab-row">
                <div>Sort By:</div>
                <div class="section-tab" @click="changeTab('level')" v-bind:class="{ activeSorting: sortedBy === 'level' }">Level</div>
                <div class="section-tab" @click="changeTab('actionType')" v-bind:class="{ activeSorting: sortedBy === 'actionType' }">Action Type</div>
                <div class="section-tab" @click="changeTab('category')" v-bind:class="{ activeSorting: sortedBy === 'category' }">Category</div>
                <div class="section-tab" id="search-icon"> &#x1F50D;</div>
            </div>
        </div>

        <skill-list
            :champion="champion"
            :location="'Main'"
            :sortingBy="sortedBy"
        />
        <div id="go-to-roll-container">
            <!-- <h2>{{ champion.name }}</h2> -->
            <img id="go-to-roll-action" @click="$emit('activateActionRollModal')" :src="dice" />
            <div id="base" />
        </div>
    </div>
</template>
 
<script>

import SkillList from '@/components/shared/components/SkillList'
import Dice from '@/assets/ImageStore/dice.png'

export default {
    name: 'SkillsPage',
    components: {
        SkillList
    },
    props: {
        champion: {
            required: false
        }
    },
    data(){
        return {
            sortedBy: 'level',
            dice: Dice
        }
    },
    methods: {
        changeTab(input){
            this.sortedBy = input
        }
    }
}
</script>
 
<style lang="scss" scoped>

#skill-list-header-row {
  display: inline-block;
  margin-top: 12px;
}
#skill-list-header-row h1, #skill-list-header-row a {
  display: unset;
}
.section-tab-row {
  display: inline-flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
}

.section-tab {
  margin: 5px;
  padding: 5px;
}

#search-icon {
    // padding-bottom: 10px;
}

.activeSorting {
    background-color: #65a779;
    color: white;
}

// #go-to-roll-action {
//     position: -webkit-sticky;
//     position: sticky;
//     top: 20px;
//     text-align: right;
// }


#go-to-roll-container {

    // position: -webkit-sticky;
    //   position: sticky;
    // top: 20px;

    position: fixed;
    bottom: 0px;
    right: 0px;

    z-index: 12;
    display: flex;
    //   z-index: 1000;
    margin-right: -14px;
    align-items: center;
    justify-content: flex-end;
    padding: 4px 0 4px 4px;
    background-color: #A41720;
    margin: 5px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.331);
    border-radius: 5%;
}

#go-to-roll-container > * {
    height: 50px;
    line-height: 50px;
    filter: brightness(0) invert(1);
}

#go-to-roll-action {
    // padding: 4px;
    // height: 50px;
    // background-color: rgba(255, 255, 255, 0);
}

// #base {
//     background: red;
//     display: inline-block;
//     height: 55px;
//     margin-left: 20px;
//     margin-top: 55px;
//     position: relative;
//     width: 100px;
// }
// #base:before {
//     border-bottom: 35px solid red;
//     border-left: 50px solid transparent;
//     border-right: 50px solid transparent;
//     content: "";
//     height: 0;
//     left: 0;
//     position: absolute;
//     top: -35px;
//     width: 0;
// }

</style>