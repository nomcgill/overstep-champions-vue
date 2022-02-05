<template>
  <div id="app">
    <NavBar 
      :database="database"
      :lucyfer="lucyfer"
    />
    <ActionBar
      :database="database"
      :champion="champion"
      v-bind:header="header" 
    />
    <Main
      :database="database"
      :appChampion="champion"
      v-bind:header="header" 
    />
  </div>
</template>

<script>
/* eslint-disable no-debugger */

// import Vue from 'vue'


import ActionBar from '@/components/ActionBar/ActionBar.vue'
import NavBar from '@/components/NavBar/NavBar.vue'
import Main from '@/components/Main/Main.vue'

import additionalBusMethods from '@/additional-bus-methods.js'
import database from '@/assets/sampleStuff/sampleData.json'

import lucyfer from '@/assets/sampleStuff/championLucyfer.json'

export default {
  name: 'App',
  components: {
    NavBar,
    ActionBar,
    Main
  },
  props: {
    header: {
      required: false
    }
  },
  computed: {
    database: function(){
      return database
    }
  },
  data() {
    return {
      champion: false,
      lucyfer: lucyfer,
    }
  },
  created() {
    this.$bus.$on('close-drawer', () => { this.$emit('close') })
    // this.$bus.$on('champion-skill-opened', () => { this.$emit('champion-skill-opened') })
    
    const replaceChampionListener = newChampion => {this.replaceChampion(newChampion)}
    this.$bus.$on(this.$bus.REPLACE_CHAMPION, replaceChampionListener)
    const setLevelListener = (level) => {this.setChampionLevel(level)}
    this.$bus.$on(this.$bus.SET_CHAMPION_LEVEL, setLevelListener)
    const setRoleListener = (role, newSkills) => {this.setChampionRole(role, newSkills)}
    this.$bus.$on(this.$bus.SET_CHAMPION_ROLE, setRoleListener)
    const setSourceListener = (source, newSkills) => {this.setChampionSource(source, newSkills)}
    this.$bus.$on(this.$bus.SET_CHAMPION_SOURCE, setSourceListener)
    const setCleanseSkillListener = category => {this.cleanseSkillsOfCategory(category)}
    this.$bus.$on(this.$bus.CLEANSE_CATEGORY_SKILLS, setCleanseSkillListener)
    const setSkillListener = newSkills => {this.setChampionSkills(newSkills)}
    this.$bus.$on(this.$bus.SET_CHAMPION_SKILLS, setSkillListener)
    const setNameListener = name => {this.setChampionName(name)}
    this.$bus.$on(this.$bus.SET_CHAMPION_NAME, setNameListener)
    // const setTitleListener = title => {this.setChampionTitle(title)}
    // this.$bus.$on(this.$bus.SET_CHAMPION_TITLE, setTitleListener)
    const setBackgroundListener = background => {this.setChampionBackground(background)}
    this.$bus.$on(this.$bus.SET_CHAMPION_BACKGROUND, setBackgroundListener)
    const setExpositionListener = (whichTime, exposition) => this.setChampionExposition(whichTime, exposition)
    this.$bus.$on(this.$bus.SET_CHAMPION_EXPOSITION, setExpositionListener)
    const skillOpenListener = skill => {this.editOpened(skill)}
    this.$bus.$on(this.$bus.SKILL_OPEN, skillOpenListener)
    const allSkillOpenListener = allOpenedState => {this.allOpened(allOpenedState)}
    this.$bus.$on(this.$bus.ALL_SKILL_OPEN, allSkillOpenListener)
    const skillChoiceListener = (previousState, skill) => {this.toggleSkillChoice(previousState, skill)}
    this.$bus.$on(this.$bus.TOGGLE_SKILL_CHOICE, skillChoiceListener)
    const proficiencyListener = (profChoice, profLevel) => {this.setProficiencySkills(profChoice, profLevel)}
    this.$bus.$on(this.$bus.UPDATE_PROFICIENCIES, proficiencyListener)
  },
  beforeDestroy() {
    this.$bus.$off('close-drawer')
  },
  methods: {
    replaceChampion(newChampion){this.champion = newChampion},
    setChampionLevel(level){additionalBusMethods.setChampionLevel(this.champion, level)},
    setChampionRole(role, newSkillsList){
      additionalBusMethods.setChampionRole(this.champion, this.database, role, newSkillsList)
      additionalBusMethods.formIntersection(this.champion, this.database);
    },
    setChampionSource(source, newSkillsList){
      additionalBusMethods.setChampionSource(this.champion, this.database, source, newSkillsList)
      additionalBusMethods.formIntersection(this.champion, this.database)
    },
    cleanseSkillsOfCategory(category){additionalBusMethods.cleanseSkills(this.champion, category)},
    setChampionSkills(newSkillList){additionalBusMethods.newChampionSkillList(this.champion, newSkillList)},
    setChampionName(name){this.champion = Object.assign({}, this.champion, {name:name})},
    // setChampionTitle(title){this.champion = Object.assign({}, this.champion, {title:title})},
    setChampionBackground(background){additionalBusMethods.updateBackground(this.champion, background)},
    setChampionExposition(whichTime, exposition){additionalBusMethods.updateExposition(this.champion, whichTime, exposition)},
    editOpened(skill){additionalBusMethods.editOpened(this.champion, skill)},
    allOpened(allOpenedState){additionalBusMethods.allOpened(this.champion, allOpenedState)},
    toggleSkillChoice(previousState, skill){additionalBusMethods.toggleSkillChoice(this.champion, previousState, skill)},
    setProficiencySkills(profChoice, profLevel){additionalBusMethods.updateProficiencies(this.champion, profChoice, profLevel)},
  }
}
</script>

<style>

@import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@200&display=swap');

  #app {
    height: 100%;
    color: #000000;
    font-family: 'Josefin Sans', sans-serif;  /* margin-top: 60px; */
  }

  * {
    margin: 0;
  }

  button, select {
    font-family: 'Josefin Sans', sans-serif;  /* margin-top: 60px; */
  }

  .subtext {
    clear: left;
    margin-top: 4px;
    margin-bottom: 4px;
  }

  .disabled {
    pointer-events: none;
  }

  .router-link-exact-active {
    pointer-events: none;
    cursor: default;
  }

  .align-left {
    text-align: left;
  }

  .align-center {
    text-align: center;
  }

  .align-right {
    text-align: right;
  }

  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  /* .slide-fade-leave-active {
    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  } */
  .slide-fade-enter, .slide-fade-leave-to
  /* .slide-fade-leave-active below version 2.1.8 */ {
    transform: translateX(10px);
    opacity: 0;
  }

  .button-type-1, .button-type-2 {
    border: none;
    /* color: white; */
    font-size: 16px;
    padding: 8px;
    margin: 5px 5px;
    border: solid 1px black;
  }

  .button-type-1 {
    background-color: #65a779;
    color: white;
  }

  .button-type-2 {
    background-color: transparent;
  }

</style>
