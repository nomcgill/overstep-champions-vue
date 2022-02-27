<template>
  <div style="position: relative">
      <div class='action-strip' id="view-bar" v-if="currentRoutePath.includes('/view')">
        - GAME VIEW - 
      </div>
      <div class='action-strip' id="editing-bar" v-if="currentRoutePath.includes('/build')">
        - CHAMPION BUILDER - 
      </div>
      <div class='action-strip' id="account-bar" v-if="currentRoutePath.includes('/account')">
        - ACCOUNT - 
      </div>
    <main>


      <!-- {{ header }} -->
      <!-- <div id="go-to-roll-container">
        <img id="go-to-roll-action" @click="actionRollModal = true" :src="dice" />
      </div> -->

      <action-roll-modal
        v-if="actionRollModal"
        @close="actionRollModal = false"
        v-model="actionRollModal"
        :modalData="`modal`"
        :database="database"
        :champion="champion"
      />

      <welcome
        v-if="!champion && currentRoute === `ChampionView`"
      />

      <missing-requirements
        v-if="champion && !requirementsMet && currentRoute === `ChampionView`"
        :champion="champion"
      />

      <div id="game-view" v-if="currentRoute === 'ChampionView' && champion && requirementsMet">
        <tracking-bar 
          :database="database"
          :champion="champion"
          :sortingBy="sortingBy"
          @changeSort="changeSort"
          @setTextFilter="setTextFilter"
        />
        <skills-page
          :champion="champion"
          :sortingBy="sortingBy"
          :textFilter="textFilter"
          :rollModalOpen="actionRollModal"
          @activateActionRollModal="activateActionRollModal"
        />
      </div>

    
      <champion-builder
        v-if="currentRoutePath.includes('/build/')"
        :champion="champion"
        :database="database"
      />

      <account
        v-if="currentRoute === 'AccountLogIn'"
        :champion="champion"
        :browserStatus="browserStatus"
      />


    </main>
  </div>
</template>

<script>
/* eslint-disable no-debugger */

// import { bus } from '@/main'

import Welcome from '@/components/Main/Welcome'
import MissingRequirements from '@/components/Main/MissingRequirements'
import TrackingBar from '@/components/Main/TrackingBar'
import SkillsPage from '@/components/Main/SkillsPage'
import ChampionBuilder from '@/components/ChampionBuilder/ChampionBuilder'
import Account from '@/components/Account/Account'
import ActionRollModal from '@/components/Main/ActionRollModal'


export default {
  name: 'Main',
  components: { 
    SkillsPage,
    TrackingBar,
    MissingRequirements,
    Welcome,
    ChampionBuilder,
    Account,
    ActionRollModal
  },
  props: {
    appChampion: {
      required: false
    },
    database: {
      required: true
    },
    browserStatus: {
      required: true
    }
  },
  watch: {
    appChampion: {
      deep: true,
      handler(newChamp){
        this.champion = newChamp
        // console.log("Watching Champion changes in Main...")
        // console.log(this.champion.currentSkills.map(skill=>skill.name))
        console.log(this.champion)
        this.checkChampionRequirements()
      },
    }
  },
  data() {
    return {
      // header: '',
      requirementsMet: false,
      champion: false,
      actionRollModal: false,
      sortingBy: 'level',
      textFilter: '',
    }
  },
  created (){
    // bus.$on('changeIt', (data) => {
    //   this.header = data;
    // })
  },
  computed: {
    currentRoute(){
      // console.log(this.$route.name)
      return this.$route.name
    },
    currentRoutePath(){
      return this.$route.path
    }
  },
  methods: {
    checkChampionRequirements(){
      let missingRequirements = []
      !this.champion.name ? missingRequirements.push("name") :
      !this.champion.role ? missingRequirements.push("role") :
      !this.champion.source ? missingRequirements.push("source") :
      // !this.champion. ? missingRequirements.push("") :
      this.requirementsMet = true
      // this.champion
      // console.log('checking requirements...')
    },
    activateActionRollModal(){
      this.actionRollModal = !this.actionRollModal
    },
    changeSort(sortingBy){
      this.sortingBy = sortingBy
    },
    setTextFilter(text){
      this.textFilter = text
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
main {
    padding: 0 .5em 1em;
}

.action-strip {
  color: white;
  height: 20px;
  line-height: 22px;
  text-align: center;
  position: sticky;
  top: 0px;
  z-index: 10;
}
#view-bar {
  background-color: #65a779;
}
#editing-bar {
  background-color: rgb(189, 133, 28);
}

#account-bar {
  background-color: rgb(11, 52, 77);
}

/* #go-to-roll-container {
  position: sticky;
  z-index: 12;
  display: flex;
  align-self: flex-start;
  top: 10px;
  /* align-items: center; */
  /* justify-content: flex-end; */
  /* padding: 10px 0; */
  /* height: 50px; */
  /* width: 40px; */
  /* background-color: black; */
/* } */

#go-to-roll-container {
  /* position: -webkit-sticky;
  position: sticky;
  float: right;
  top: 40px;
  height: 0px;
  width: 0px;
  border-width: 30px;
  border-color: red blue green yellow;
  border-style: solid;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.262);
  z-index: 999; */
} 

/* #go-to-roll-action {
    padding: 4px;
    z-index: 1000;
    background-color: rgba(255, 255, 255, 0);
} */

</style>
