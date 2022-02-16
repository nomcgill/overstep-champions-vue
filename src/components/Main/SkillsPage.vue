<template>
    <div>
        <!-- <div id="go-to-roll-container"> -->
            <!-- <h2>{{ champion.name }}</h2> -->
            <!-- <img id="go-to-roll-action" @click="$emit('activateActionRollModal')" :src="dice" /> -->
        <!-- </div> -->
        <div id="skill-list-header-row">
            <h1>Skills</h1>
            <router-link to="/build/skills">edit</router-link>
        </div>

        <skill-list
            :champion="champion"
            :location="'Main'"
            :sortingBy="sortedBy"
            :textFilter="textFilter"
        />
        <div id="go-to-roll-container" :class="{iconShadow: !rollModalOpen}">
            <!-- <h2>{{ champion.name }}</h2> -->
            <img 
                id="go-to-roll-action" 
                @click="$emit('activateActionRollModal')" 
                :src="rollModalOpen ? arrowRight : dice" 
            />
            <!-- <div id="base" /> -->
        </div>
    </div>
</template>
 
<script>

import SkillList from '@/components/shared/components/SkillList'

import Dice from '@/assets/ImageStore/dice.png'
import ArrowRight from '@/assets/foundation-icons/svgs/fi-arrow-right.svg'

export default {
    name: 'SkillsPage',
    components: {
        SkillList
    },
    props: {
        champion: {
            required: false
        },
        sortingBy: {
            required: false
        },
        textFilter: {
            type: String
        },
        rollModalOpen: {
            required: false
        }
    },
    computed: {
        sortedBy(){
            return this.sortingBy ? this.sortingBy : 'level'
        }
    },  
    data(){
        return {
            dice: Dice,
            arrowRight: ArrowRight
        }
    },
    methods: {
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

    z-index: 1000;
    display: flex;
    //   z-index: 1000;
    margin-right: -14px;
    align-items: center;
    justify-content: flex-end;
    padding: 4px 0 4px 4px;
    background-color: #A41720;
    margin: 8px;
    border-radius: 5%;
}

.iconShadow {
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.331);
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