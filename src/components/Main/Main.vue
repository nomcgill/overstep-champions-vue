<template>
  <main>
    {{ header }}
    
    <welcome
      v-if="!champion && currentRoute === `ChampionView`"
    />

    <missing-requirements
      v-if="champion && !requirementsMet && currentRoute === `ChampionView`"
      :champion="champion"
    />

    <skills-page
      v-if="currentRoute === 'ChampionView' && champion && requirementsMet"
      :champion="champion"
    />

  
    <champion-builder
      v-if="currentRoutePath.includes('/build/')"
      :champion="champion"
      :database="database"
    />

    <account
      v-if="currentRoute === 'AccountLogIn'"
      :champion="champion"
    />


  </main>
</template>

<script>
/* eslint-disable no-debugger */

import { bus } from '@/main'

import Welcome from '@/components/Main/Welcome'
import MissingRequirements from '@/components/Main/MissingRequirements'
import SkillsPage from '@/components/Main/SkillsPage'
import ChampionBuilder from '@/components/ChampionBuilder/ChampionBuilder'
import Account from '@/components/Account/Account'

export default {
  name: 'Main',
  components: { 
    SkillsPage,
    MissingRequirements,
    Welcome,
    ChampionBuilder,
    Account
  },
  props: {
    appChampion: {
      required: false
    },
    database: {
      required: true
    }
  },
  watch: {
    appChampion: {
      deep: true,
      handler(newChamp){
        this.champion = newChamp
        // console.log("Watching Champion changes in Main...")
        console.log(this.champion.currentSkills.map(skill=>skill.name))
        this.checkChampionRequirements()
      },
    }
  },
  data() {
    return {
      header: '',
      requirementsMet: false,
      champion: false
    }
  },
  created (){
    bus.$on('changeIt', (data) => {
      this.header = data;
    })
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
main {
    padding: 1em .5em;
}
</style>
