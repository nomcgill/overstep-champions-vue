<template>

      <modal
        @close="$emit('close')"
        v-model="modal"
        :modalType="modal"
        :modalData="`modal`"
        scrollable
        
      >

        <div slot="header">
          <h2>Choose a Background.</h2>
          <p class="subtext">Backgrounds provide a beneficial passive Skill for your Champion.</p>
        </div>

        <div id="background-choice-list">
          <background-choice
            v-for="(choice, index) in databaseBackgroundsSorted"
            @click.native="newPendingBackground(choice)"
            :choice="choice"
            :champion="champion"
            :database="database"
            :pendingBackground="choice.title === pendingBackground.title"
            :key="index"
            :index="index"
          />
        </div>

        <!-- <div class="section" v-if="champion.currentBackground"> -->
        <!-- <skill 
          v-if="champion.currentBackground"
          :champion="champion"
          :skill="currentBackgroundSkill"
          :dropdown="true"
        /> -->
        <skill 
          v-if="pendingBackground"
          :champion="champion"
          :skill="this.pendingBackgroundSkill"
          :dropdown="true"
          :location="'Background Modal'"
        />
        <p v-else>Choose a Background above to see more info.</p>
        <!-- </div> -->

        <!-- <div>
            <background-choice 
              v-for="(choice, index) in database.backgrounds"
              :choice="choice"
              :champion="champion"
              :database="database"
              :key="index"
              :index="index"
            />
        </div> -->
            
        <div slot="footer">
            <button @click.prevent="$emit('close')" class="button-type-2">Cancel</button>
            <button @click.prevent="confirmNewBackground(pendingBackground); $emit('close')" class="button-type-1">Confirm</button>
        </div>

      </modal>
  
</template>

<script>
/* eslint-disable no-debugger */
// import { bus } from '@/main'
import Skill from '@/components/shared/components/Skill.vue'

import BackgroundChoice from '@/components/ChampionBuilder/Background/BackgroundChoice.vue'

export default {
  name: 'BackgroundModal',
  components: {
    BackgroundChoice,
    Skill
  },
  props: {
    champion: {
      required: true
    },
    database: {
      required: true
    }
  },
  created(){
    if (this.champion.currentBackground){
      this.pendingBackground = this.champion.currentBackground
      this.pendingBackgroundSkill = this.createBackgroundSkill(this.pendingBackground)
    }
  },
  computed: {
    databaseBackgroundsSorted(){
      let backgroundTitles = this.database.backgrounds.map(background => background.title)
      let sortedBackgroundTitles = backgroundTitles.sort()
      let sortedBackgrounds = []
      sortedBackgroundTitles.forEach(
        title => this.database.backgrounds.forEach(
            dbBackground => dbBackground.title === title ? sortedBackgrounds.push(dbBackground) : false
        )
      )
      return sortedBackgrounds
    }
  },
  watch: {
    pendingBackground: function(newPending){
      this.pendingBackgroundSkill = this.createBackgroundSkill(newPending)
    }
  },
  data(){
    return {
      modal: false,
      pendingBackground: false
    }
  },
  methods: {
    confirmNewBackground(newBackgroundChoice){
      this.$bus.$emit('SET_CHAMPION_BACKGROUND', newBackgroundChoice)
    },
    newPendingBackground(clickedBackground){
      this.pendingBackground = clickedBackground
    },
    createBackgroundSkill(currentBackground){
        let backgroundSkill = {
          name: currentBackground.title,
          action: "Passive",
          skillLevel: "Given",
          category: "Background",
          damage: false,
          flavor: " ",
          impact: currentBackground.description
        }
        return backgroundSkill
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

#background-choice-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  /* display: grid;
  grid-template-columns: auto auto auto; */
}

#background-choice-list > * {
  flex: 0 0 calc(30% - 5px);
  padding: 9px 4px;
  text-align: center;
}

</style>