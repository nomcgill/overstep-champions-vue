<template>
  <div id="app">
    <NavBar 
      :database="database"
      :champion="champion"
      :lusyfer="lusyfer"
    />
    <ActionBar
      :database="database"
      :champion="champion"
      :header="header"
    />
    <Main
      :database="database"
      :appChampion="champion"
      :header="header"
      :browserStatus="browserStatus"
    />
  </div>
</template>

<script>
/* eslint-disable no-debugger */

// import Vue from 'vue'


import ActionBar from '@/components/ActionBar/ActionBar.vue'
import NavBar from '@/components/NavBar/NavBar.vue'
import Main from '@/components/Main/Main.vue'

import busMethods from '@/bus-methods.js'
import database from '@/assets/sampleStuff/sampleData.json'

import Lusyfer from '@/assets/sampleStuff/championLusyfer.json'

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
    },
    browserStatus: function(){
      return {
        os: this.OSName,
        browser: this.browserName,
        private: this.isPrivateBrowsing
      }
    }
  },
  data() {
    return {
      champion: false,
      lusyfer: Lusyfer,
      OSName: 'Not yet checked.',
      browserName: 'Not yet checked.',
      isPrivateBrowsing: 'Not yet checked.'
    }
  },
  watcher: {

  },
  created() {
    
    this.$bus.$on('close-drawer', () => { this.$emit('close') })
    // this.$bus.$on('champion-skill-opened', () => { this.$emit('champion-skill-opened') })
    
    // Making 'this' accessible within functions.
    const thisVue = this
    
    const replaceChampionListener = newChampion => {this.replaceChampion(newChampion)}
    this.$bus.$on(this.$bus.REPLACE_CHAMPION, replaceChampionListener)
    const setLevelListener = (level) => {this.setChampionLevel(level)}
    this.$bus.$on(this.$bus.SET_CHAMPION_LEVEL, setLevelListener)
    const setRoleListener = (role, newSkills, decisionObject) => {this.setChampionRole(role, newSkills, decisionObject)}
    this.$bus.$on(this.$bus.SET_CHAMPION_ROLE, setRoleListener)
    const setSourceListener = (source, newSkills, decisionObject) => {this.setChampionSource(source, newSkills, decisionObject)}
    this.$bus.$on(this.$bus.SET_CHAMPION_SOURCE, setSourceListener)
    const setCleanseSkillListener = category => {this.cleanseSkillsOfCategory(category)}
    this.$bus.$on(this.$bus.CLEANSE_CATEGORY_SKILLS, setCleanseSkillListener)
    const setSkillListener = (newSkills, decisionObject) => {this.setChampionSkills(newSkills, decisionObject)}
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
    const rollListener = rollObject => {this.addRollToHistory(rollObject)}
    this.$bus.$on(this.$bus.ADD_ROLL_TO_HISTORY, rollListener)

    // Checking for browser type.
    var OSName = "Unknown";
    if (window.navigator.userAgent.indexOf("Windows NT 10.0")!= -1) OSName="Windows 10";
    else if (window.navigator.userAgent.indexOf("Windows NT 6.3") != -1) OSName="Windows 8.1";
    else if (window.navigator.userAgent.indexOf("Windows NT 6.2") != -1) OSName="Windows 8";
    else if (window.navigator.userAgent.indexOf("Windows NT 6.1") != -1) OSName="Windows 7";
    else if (window.navigator.userAgent.indexOf("Windows NT 6.0") != -1) OSName="Windows Vista";
    else if (window.navigator.userAgent.indexOf("Windows NT 5.1") != -1) OSName="Windows XP";
    else if (window.navigator.userAgent.indexOf("Windows NT 5.0") != -1) OSName="Windows 2000";
    else if (window.navigator.userAgent.indexOf("Mac")            != -1) OSName="Mac/iOS";
    else if (window.navigator.userAgent.indexOf("X11")            != -1) OSName="UNIX";
    else if (window.navigator.userAgent.indexOf("Linux")          != -1) OSName="Linux";
    this.OSName = OSName

    // Detect incognito. This check is an arms race as the method of checking continues becoming outdated.
    // Currently working (Feb 2022) at https://github.com/Joe12387/detectIncognito/blob/main/detectIncognito.min.js 
    var detectIncognito = function(e){var o="Unknown";function n(n){ thisVue.browserName = o; console.log(o),e({isPrivate:n,browserName:o})} function t(e){return e===eval.toString().length}function i(){var e,t,i=window;if(void 0!==navigator.maxTouchPoints)if(void 0!==i.safari&&void 0===i.DeviceMotionEvent)o="Safari for macOS",function(){try{window.safari.pushNotification.requestPermission("https://example.com","private",{},function(){})}catch(e){return n(!new RegExp("gesture").test(e))}n(!1)}();else{if(void 0===i.DeviceMotionEvent)throw new Error("Could not identify this version of Safari");o="Safari for iOS",e=!1,(t=document.createElement("iframe")).style.display="none",document.body.appendChild(t),t.contentWindow.applicationCache.addEventListener("error",function(){return e=!0,n(!0)}),setTimeout(function(){e||n(!1)},100)}else!function(){var e=window.openDatabase,o=window.localStorage;try{e(null,null,null,null)}catch(e){return n(!0)}try{o.setItem("test","1"),o.removeItem("test")}catch(e){return n(!0)}n(!1)}()}function r(){navigator.webkitTemporaryStorage.queryUsageAndQuota(function(e,o){var t;n(o<(void 0!==(t=window).performance&&void 0!==t.performance.memory&&void 0!==t.performance.memory.jsHeapSizeLimit?performance.memory.jsHeapSizeLimit:1073741824))},function(e){throw new Error("detectIncognito somehow failed to query storage quota: "+e.message)})}function a(){void 0!==Promise&&void 0!==Promise.allSettled?r():(0,window.webkitRequestFileSystem)(0,1,function(){n(!1)},function(){n(!0)})}!function(){if(void 0!==(r=navigator.vendor)&&0===r.indexOf("Apple")&&t(37))i();else if(function(){var e=navigator.vendor;return void 0!==e&&0===e.indexOf("Google")&&t(33)}())e=navigator.userAgent,o=e.match(/Edg/)?"Edge":e.match(/Chrome/)?void 0!==navigator.brave?"Brave":"Chrome":"Chromium",a();else if(void 0!==document.documentElement&&void 0!==document.documentElement.style.MozAppearance&&t(37))o="Firefox",n(void 0===navigator.serviceWorker);else{if(void 0===navigator.msSaveBlob||!t(39))throw new Error("detectIncognito cannot determine the browser");o="Internet Explorer",n(void 0===window.indexedDB)}var e,r}()};
    try {
        detectIncognito(function(obj) {
          thisVue.isPrivateBrowsing = obj.isPrivate
        });
      } catch (e) {
        // var answer = document.getElementById("answer");
        // console.log("There was an error. Check console for further information.")
        console.log("Could not get Incognito status", e);
    }

    console.log(this.OSName)
    console.log(this.isPrivateBrowsing ? 'Private' : 'Not private.')
    console.log(this.browserName)

    // Check for localStorage capabilities.
    localStorage.setItem('myCat', 'Tom');
    const cat = localStorage.getItem('myCat');
    if (!cat){
      alert('')
    }
    else {
      console.log('Firing on all localStorage cylinders!')
    }
    // console.log(cat)
    localStorage.removeItem('myCat');
    console.log(localStorage)
    // localStorage.clear();
  },
  mounted() {
    console.log(this.browserStatus)
  },
  beforeDestroy() {
    this.$bus.$off('close-drawer')
  },
  methods: {
    replaceChampion(newChampion){this.champion = newChampion},
    setChampionLevel(level){busMethods.setChampionLevel(this.database, this.champion, level)},
    setChampionRole(role, newSkillsList, decisionObject){
      busMethods.setChampionRole(this.champion, this.database, role, newSkillsList, decisionObject)
      busMethods.formIntersection(this.champion, this.database);
    },
    setChampionSource(source, newSkillsList, decisionObject){
      busMethods.setChampionSource(this.champion, this.database, source, newSkillsList, decisionObject)
      busMethods.formIntersection(this.champion, this.database)
    },
    cleanseSkillsOfCategory(category){busMethods.cleanseSkills(this.champion, category)},
    setChampionSkills(newSkillList, decisionObject){busMethods.newChampionSkillList(this.champion, newSkillList, decisionObject)},
    setChampionName(name){this.champion = Object.assign({}, this.champion, {name:name})},
    // setChampionTitle(title){this.champion = Object.assign({}, this.champion, {title:title})},
    setChampionBackground(background){busMethods.updateBackground(this.champion, background)},
    setChampionExposition(whichTime, exposition){busMethods.updateExposition(this.champion, whichTime, exposition)},
    editOpened(skill){busMethods.editOpened(this.champion, skill)},
    allOpened(allOpenedState){busMethods.allOpened(this.champion, allOpenedState)},
    toggleSkillChoice(previousState, skill){busMethods.toggleSkillChoice(this.champion, previousState, skill)},
    setProficiencySkills(profChoice, profLevel){busMethods.updateProficiencies(this.champion, profChoice, profLevel)},
    addRollToHistory(rollObject){busMethods.addRollToHistory(this.champion, rollObject)}
  }
}
</script>

<style>

@import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@200&display=swap');

  #app {
    min-height: 100%;
    color: #000000;
    font-family: 'Josefin Sans', sans-serif;  /* margin-top: 60px; */
    /* max-width: 100vw; */
  }

  * {
    margin: 0;
  }

  button, select, input {
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

  .bold {
    font-weight: 900;
    text-shadow: 0 0 1px rgb(162, 162, 162);
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

  /* Defining some flex shortcuts */
  .flex-row-around {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
  }

  .flex-row-between {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .flex-column-around {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }

  .flex-column-between {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }

</style>
