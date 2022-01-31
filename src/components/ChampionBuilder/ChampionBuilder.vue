<template>
  <div id="champion-builder">
    <div id="builder-navigation">
      <!-- Level select/ -->
      <!-- Both Role, Source, Choices on the same page, scroll horizontally for each. -->
      <!-- Intersection is modal. -->
      <router-link class="builder-router-button" to="/build/potential">Potential</router-link>
        <!-- Background = Name, Title, Background, Button for Background Notes Modal -->
      <router-link class="builder-router-button" to="/build/background">Background</router-link>
        <!-- Skills, including proficiencies above levels 4 & 8 -->
      <router-link class="builder-router-button" to="/build/skills">Skills</router-link>
    </div>
    <!-- <pop-out-icon
      v-if="currentRoute !== 'ChampionBuilderSkills'"
      :champion="champion"
      :database="database"
    /> -->
    <potential
      v-if="currentRoute === 'ChampionBuilderPotential'"
      :champion="champion"
      :database="database"
    />
    <background
      v-if="currentRoute === 'ChampionBuilderBackground'"
      :champion="champion"
      :database="database"
      :background="champion.currentBackground"
    />
    <skills
      v-if="currentRoute === 'ChampionBuilderSkills'"
      :champion="champion"
      :database="database"
    />
  </div>
</template>

<script>

import Potential from '@/components/ChampionBuilder/Potential/Potential'
import Background from '@/components/ChampionBuilder/Background/Background'
import Skills from '@/components/ChampionBuilder/Skills/Skills'
// import PopOutIcon from '@/components/shared/components/PopOutIcon'

export default {
  name: 'CharacterBuilder',
  components: {
    Potential,
    Background,
    Skills,
    // PopOutIcon
  },
  props: {
    champion: {
      required: false
    },
    database: {
      required: true
    }
  },
  computed: {
    currentRoute(){
      return this.$route.name
    }
  },
  created(){
    if (!this.champion || !this.champion.level){
      let newChampion = {
        "level": 1,
        "currentSkills": []
      }
      // console.log(newChampion)
      this.$bus.$emit(this.$bus.REPLACE_CHAMPION, newChampion)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

#champion-builder {
  margin: 2%;
}

#builder-navigation {
    display: inline-flex;
    position: relative;
    width: 100%;
    text-align: center;
    margin: 15px auto 0;
    /* height: 50px; */
    line-height: 30px;
    vertical-align: middle;
    padding: 0 4px;
    margin-top: -1em;
}
.builder-router-button {
  font-size: 1.1em;
  width: 33.3%;
  color: rgb(163, 163, 163);
  text-decoration: none;
  height: 100%;
  display: inline-block;
  cursor: pointer;
  /* border-right: solid 1px black; */
}

.builder-router-button:not(:first-child){
  border-left: solid 1px black;
}

.builder-router-button.router-link-active {
  color: black;
  font-weight: 900;
  font-size: 1.2em;
  /* padding-top: 10px; */
}

.builder-top-row {
  width: 100%;
  display: grid;
  grid-template-columns: 75%;
  height: 78px;
  margin: 2% 0;
}

.section {
  border: solid 1px black;
  border-radius: 6px;
  margin: 2% 0;
  position: relative;
}

</style>