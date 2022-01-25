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
    const setRoleListener = role => {this.setChampionRole(role)}
    this.$bus.$on(this.$bus.SET_CHAMPION_ROLE, setRoleListener)
    const setSourceListener = source => {this.setChampionSource(source)}
    this.$bus.$on(this.$bus.SET_CHAMPION_SOURCE, setSourceListener)
    const setNameListener = name => {this.setChampionName(name)}
    this.$bus.$on(this.$bus.SET_CHAMPION_NAME, setNameListener)
    // const setTitleListener = title => {this.setChampionTitle(title)}
    // this.$bus.$on(this.$bus.SET_CHAMPION_TITLE, setTitleListener)
    const setBackgroundListener = background => {this.setChampionBackground(background)}
    this.$bus.$on(this.$bus.SET_CHAMPION_BACKGROUND, setBackgroundListener)
    const setExpositionListener = (whichTime, exposition) => this.setChampionExposition(whichTime, exposition)
    this.$bus.$on(this.$bus.SET_CHAMPION_EXPOSITION, setExpositionListener)
    const skillOpenListener = (skill) => {this.editOpened(this.champion, skill)}
    this.$bus.$on(this.$bus.SKILL_OPEN, skillOpenListener)
    const allSkillOpenListener = allOpenedState => {this.allOpened(this.champion, allOpenedState)}
    this.$bus.$on(this.$bus.ALL_SKILL_OPEN, allSkillOpenListener)
    const skillChoiceListener = (previousState, skill) => {this.toggleSkillChoice(this.champion, previousState, skill)}
    this.$bus.$on(this.$bus.TOGGLE_SKILL_CHOICE, skillChoiceListener)
  },
  beforeDestroy() {
    this.$bus.$off('close-drawer')
  },
  methods: {
    replaceChampion(newChampion){this.champion = newChampion},
    setChampionLevel(level){this.champion = Object.assign({}, this.champion, {level:level})},
    setChampionRole(role){this.champion = Object.assign({}, this.champion, {role:role}); additionalBusMethods.formIntersection(this.champion, this.database)},
    setChampionSource(source){this.champion = Object.assign({}, this.champion, {source:source}); additionalBusMethods.formIntersection(this.champion, this.database)},
    setChampionName(name){this.champion = Object.assign({}, this.champion, {name:name})},
    // setChampionTitle(title){this.champion = Object.assign({}, this.champion, {title:title})},
    setChampionBackground(background){additionalBusMethods.updateBackground(this.champion, background)},
    setChampionExposition(whichTime, exposition){additionalBusMethods.updateExposition(this.champion, whichTime, exposition)},
    setChampionSkills(newSkillList){this.champion = Object.assign({}, this.champion, {currentSkills:newSkillList})},
    editOpened(champion, skill){additionalBusMethods.editOpened(champion, skill)},
    allOpened(champion, allOpenedState){additionalBusMethods.allOpened(champion, allOpenedState)},
    toggleSkillChoice(champion, previousState, skill){additionalBusMethods.toggleSkillChoice(champion, previousState, skill)}
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

  button {
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
