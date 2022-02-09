<template>
  <div class="section">
    <!-- <div v-if="champion.level < 6" id="low-level-intersection">
      <h2>Intersection Paths available at level 6 and 11.</h2>
    </div> -->
    <div id="intersection-section">
      <h2 v-if="!currentIntersectionThreshold">Intersection Paths (inactive)</h2>
      <h2 v-else>Intersection: {{ champion.intersection.title }} Paths</h2>
      <div id="intersection-path-row">
        <div class="intersection-path" v-bind:class="{enabled: advancedThreshold}" @click='intersectionModal = "Advanced"'>
          <h3>Advanced (lvl 6)</h3>
          <h3 v-if="currentIntersectionSkills.advanced && advancedThreshold">{{ currentIntersectionSkills.advanced.name }}</h3>
          <h3 v-else-if="!advancedThreshold">--</h3>
          <h3 v-else>--</h3>
          <p v-if="currentIntersectionSkills.advanced && advancedThreshold" class="edit">edit</p>
          <p v-else-if="advancedThreshold" class="edit">Choose Path</p>
        </div>
        <div class="intersection-path" v-bind:class="{enabled: masterThreshold}" @click="intersectionModal = 'Master'">
          <h3>Master (lvl 11)</h3>
          <h3 v-if="currentIntersectionSkills.master && masterThreshold">{{ currentIntersectionSkills.master.name }}</h3>
          <h3 v-else-if="!masterThreshold">--</h3>
          <h3 v-else>--</h3>
          <p v-if="currentIntersectionSkills.master && masterThreshold" class="edit">edit</p>
          <p v-else-if="masterThreshold" class="edit">Choose Path</p>
        </div>

        <intersection-modal 
          v-if="intersectionModal"
          @applyIntersectionChoice="applyIntersectionChoice"
          @close="intersectionModal = false"
          v-model="intersectionModal"
          :modalData="`modal`"
          :database="database"
          :champion="champion"
          :intersectionLevel="intersectionModal"
        />


      </div>
      <!-- <button @click.prevent="logCurrentPaths">log my intersection</button> -->
    </div>
  </div>
</template>

<script>
/* eslint-disable no-debugger */

import IntersectionModal from '@/components/ChampionBuilder/Potential/IntersectionModal'

export default {
  name: 'PotentialIntersection',
  components: {
    IntersectionModal
  },
  props: {
      champion: {
          required: true
      },
      database: {
        required: true
      }
  },
  data() {
    return {
      intersectionModal: false
      // databaseCurrentIntersection: false
    }
  },
  created(){
    // let currentIntersection = this.champion.intersection.title
    // let databaseIntersection = this.database.intersections.filter(
    //   intersection => intersection.title === currentIntersection)[0]
    // this.databaseCurrentIntersection = databaseIntersection
    // console.log(this.champion)
  },
  computed: {
    databaseCurrentIntersection(){
      if (this.champion.intersection.title){
        let currentIntersection = this.champion.intersection.title
        let databaseIntersection = this.database.intersections.filter(
          intersection => intersection.title === currentIntersection)[0]
        return databaseIntersection
      }
      else {return false}
    },
    currentIntersectionThreshold(){
      return this.champion.level > 5 ? "Advanced" : this.champion.level > 10 ? "Master" : false
    },
    advancedThreshold(){
      return this.champion.level > 5 ? true : false
    },
    masterThreshold(){
      return this.champion.level > 10 ? true : false
    },
    currentPaths(){
      let advanced = this.databaseCurrentIntersection.traits.filter(skill => skill.skillLevel === "Advanced")
      let master = this.databaseCurrentIntersection.traits.filter(skill => skill.skillLevel === "Master")
      return {advanced: advanced, master: master}
    },
    currentIntersectionSkills(){
      let intersectionSkills = false
      let currentIntersectionSkills = this.champion.currentSkills.filter(skill => skill.category === "Intersection")
      let advancedIntersectionSkill = currentIntersectionSkills.filter(skill=> skill.skillLevel === "Advanced")[0]
      let masterIntersectionSkill = currentIntersectionSkills.filter(skill=> skill.skillLevel === "Master")[0]
      if (currentIntersectionSkills.length > 0){
        intersectionSkills = {
          advanced: advancedIntersectionSkill,
          master: masterIntersectionSkill
        }
      }
      return intersectionSkills
    },
    currentRoute(){
      return this.$route.name
    },
  },
  methods: {
    applyIntersectionChoice(){
      console.log('intersection choice heard')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#potential-page > .section {
  text-align: center;
  padding: 8px 0;
}

#intersection-path-row {
  align-items: stretch;
  display: flex;
  justify-content: space-around;
}

.intersection-path {
    width: 50%;
    margin: 10px;
    border-radius: 6px;
    padding: 5px 3px;
    border: solid 1px rgb(158, 158, 158);
    color: gray;
    flex: 1;
    white-space: nowrap;
    pointer-events: none;
}

.intersection-path.enabled {
  border: solid 1px black;
  color: black;
  pointer-events: unset;
}

.intersection-path > * {
  margin: 4px;
}

.edit {
  text-decoration: underline;
}

</style>