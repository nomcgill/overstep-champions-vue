<template>
  <div id="potential-page">
      <!-- <div id="potential-navigation"> -->
            <!-- <router-link class="builder-router-button" to="/build/potential/rolesource">Role</router-link> -->
            <!-- <router-link class="builder-router-button" to="/build/potential/intersection">Intersection</router-link> -->
      <!-- </div> -->
      <div class="builder-top-row">
        <level 
          :champion="champion"
        />
        <!-- <div></div> -->
      </div>
      <potential-role-source
        v-if="showRoleSourceOptions"
        :page="'roles'"
        :champion="champion"
        :database="database"
        :images="images"
        :editing="editingRoleSource"
        @checkmarks="roleSourceCheckmarks"
      />
      <potential-role-source
        v-if="showRoleSourceOptions"
        :page="'sources'"
        :champion="champion"
        :database="database"
        :images="images"
        :editing="editingRoleSource"
        @checkmarks="roleSourceCheckmarks"
      />
      <chosen-role-source
        v-if="!showRoleSourceOptions"
        :champion="champion"
        :database="database"
        :images="images"
        @editingRoleSource="currentlyEditingState"
      />
      <potential-intersection
        v-if="!showRoleSourceOptions"
        :champion="champion"
        :database="database"
      />
  </div>
</template>

<script>

import PotentialRoleSource from '@/components/ChampionBuilder/Potential/PotentialRoleSource'
import Level from '@/components/ChampionBuilder/Potential/Level'
import ChosenRoleSource from '@/components/ChampionBuilder/Potential/ChosenRoleSource'
import PotentialIntersection from '@/components/ChampionBuilder/Potential/PotentialIntersection.vue'

import BountyHunter from '@/assets/ImageStore/bountyhunter.png'
import Chakrah from '@/assets/ImageStore/chakrah.png'
import Demonic from '@/assets/ImageStore/demonic.png'
import Divine from '@/assets/ImageStore/divine.png'
import Elementalist from '@/assets/ImageStore/elementalist.png'
import Knight from '@/assets/ImageStore/knight.png'
import Morph from '@/assets/ImageStore/morph.png'
import Nature from '@/assets/ImageStore/nature.png'
import Sayer from '@/assets/ImageStore/sayer.png'
import Shade from '@/assets/ImageStore/shade.png'
import Tactician from '@/assets/ImageStore/tactician.png'

export default {
  components: {
    PotentialRoleSource,
    ChosenRoleSource,
    Level,
    PotentialIntersection
  },
  name: 'Potential',
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
    },
    showRoleSourceOptions(){
      if (!this.champion.role || !this.champion.source || this.editingRoleSource){
        return true
      }
      else {
        return false
      }
    }
  },
  data() {
      return {
          currentTab: "role",
          editingCheckmarks: {},
          editingRoleSource: false,
          images: {
            bountyhunter: BountyHunter,
            chakrah: Chakrah,
            demonic: Demonic,
            divine: Divine,
            elementalist: Elementalist,
            knight: Knight,
            morph: Morph,
            nature: Nature,
            sayer: Sayer,
            shade: Shade,
            tactician: Tactician
          }
      }
  },
  methods: {
      changeTab(tab){
        this.currentTab = tab
      },
      currentlyEditingState(state){
        this.editingRoleSource = state
      },
      roleSourceCheckmarks(roleSource){
        this.editingCheckmarks[roleSource] = true
        if (this.editingCheckmarks.role && this.editingCheckmarks.source){
          this.editingCheckmarks = {}
          this.editingRoleSource = false
        }
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

#potential-page > * {
  /* margin: 12px 4px; */
}

#potential-top-row {
  /* width: 100%;
  display: grid;
  grid-template-columns: 75%; */
}

</style>