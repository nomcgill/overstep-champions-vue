<template>
  <div class="skill-list">
    <div v-if="sortedBy === 'level'">
      <div
        v-for="(section, index) in levelSections"
        :key="index"
        class="sortedBy-section"
        v-bind:class="{
          hiddenSection: location !=='Champion Builder Skills' && currentMatchingSkills('level', section, listOfSkills) == false,
          disabledSection: disabledSection(section), 
          removeInput: removeCheckboxes(section)
        }"
      >
        <div 
          class="section-top-row"
          @click="toggleSection(section)"
          v-bind:class="{openedSection: openedState(section)}"
        >
          <!-- v-bind:class="{openedSection: openedState(section)}" -->
          <div class="row-left">
            <h3 class="expand-section-icon">{{ openedState(section) ? '—': '+'}}</h3>
            <h3 v-if="location==='Champion Builder Skills'">{{ section.toUpperCase() }}</h3>
          </div>
          <div class="row-right">
            <h3 v-if="location !=='Champion Builder Skills'">{{ section.toUpperCase() }}</h3>
            <h3 v-if="
              location === 'Champion Builder Skills' && calculateSectionSizeBasedOnLevel(section)
              || location === 'Champion Builder Skills' && disabledSection(section) && !removeCheckboxes(section)
              || location === 'Champion Builder Skills' && section === 'Given'"
            >
              {{ currentQuantity(section) }}<span v-if="section !=='Given'">/{{ calculateSectionSizeBasedOnLevel(section) }}</span>
            </h3>
            <h3 v-else-if="location === 'Champion Builder Skills' && !calculateSectionSizeBasedOnLevel(section)">Higher lvl required.</h3>
            <!-- <p>&nbsp;</p> -->
          </div>
        </div>
      <transition name="slide-fade">
          <div class="body-of-skills" v-if="openedState(section)">
            <Skill 
              v-for="(skill, index) in currentMatchingSkills('level', section, listOfSkills)"
              :skill="skill"
              :champion="champion"
              :dropdown="skill.opened"
              :key="index"
              :index="index"
              :location="location"
            />
          </div>
        </transition>
      </div>
    </div>

    <div v-if="sortedBy === 'actionType'">
      <div
        v-for="(section, index) in actionTypeSections"
        :key="index"
        class="sortedBy-section"
      >
        <h3>{{ section.toUpperCase()  }}</h3>
        <Skill 
          v-for="(skill, index) in currentMatchingSkills('actionType', section, listOfSkills)"
          :skill="skill"
          :champion="champion"
          :dropdown="skill.opened"
          :key="index"
          :index="index"
        />
      </div>
    </div>
    
    <div v-if="sortedBy === 'category'">
      <div
        v-for="(section, index) in categorySections"
        :key="index"
        class="sortedBy-section"
      >
        <h3>{{ section.toUpperCase() }}</h3>
        <Skill 
          v-for="(skill, index) in currentMatchingSkills('category', section, listOfSkills)"
          :skill="skill"
          :champion="champion"
          :dropdown="skill.opened"
          :key="index"
          :index="index"
        />
      </div>
    </div>


  </div>
</template>

<script>
/* eslint-disable no-debugger */

import Skill from '@/components/shared/components/Skill'

export default {
  name: 'SkillList',
  components: {
    Skill
  },
  props: {
    champion: {
      type: Object
    },
    location: {
      type: String,
      required: true
    },
    skillBank: {
      required: false,
      type: Array
    },
    // 'level','actionType', or 'category'
    sortingBy: {
      required: false
    },
    currentDisplayTab: {
      required: false,
      type: String
    },
    database: {
      required: false
    }
  },
  created(){
    let levelSections = ["Given","Basic","Advanced","Master"]
    let actionTypeSections = ["Passive","Muscle","Evaluate","Influence","Channel"]
    let categorySections = ["Background","Proficiency","Role","Source","Intersection"]
    let openedSections = {}
    levelSections.forEach(section => openedSections[section] = true)
    actionTypeSections.forEach(section => openedSections[section] = true)
    categorySections.forEach(section => openedSections[section] = true)

    if (this.location === 'Champion Builder Skills'){
      levelSections.forEach(section => {
        this.disabledSection(section) ? openedSections[section] = false : ''
      })
    }

    this.openedSections = openedSections
  },
  computed: {
    currentSkills(){
      return this.sortSkillsAlphabetically(this.champion.currentSkills)
    },
    currentTabChampionSkills(){
      return this.champion.currentSkills.filter(skill=> skill.category === this.displayTab)
    },
    sortedBy() {
      return this.sortingBy
    },
    displayTab(){
      return this.currentDisplayTab
    },
    listOfSkills(){
      if (this.location === 'Main'){
        return this.currentSkills
      }
      if (this.location === 'Champion Builder Skills'){
        let acquiredGivenSkills = this.currentTabChampionSkills.filter(skill => skill.skillLevel === "Given")
        let skillBankNoGiven = this.skillBank.filter(skill=> skill.skillLevel !== "Given")
        let newBankWithCurrentGiven = [...acquiredGivenSkills, ...skillBankNoGiven]
        return newBankWithCurrentGiven
      }
      else {return false}
    }
  },
  data () {
    return {
      levelSections: ["Given","Basic","Advanced","Master"],
      actionTypeSections: ["Passive","Muscle","Evaluate","Influence","Channel"],
      categorySections: ["Background","Proficiency","Role","Source","Intersection"],
      openedSections: {},
    }
  },
  methods: {
    sortSkillsAlphabetically(skillsList){
      let sortedSkills = []
      let sortedSkillNames = skillsList.map(each=>each.name).sort()
      sortedSkillNames.forEach(eachName=> skillsList.forEach(eachSkill=> {
        if (eachName === eachSkill.name){
          sortedSkills.push(eachSkill)
        }
      }))
      return sortedSkills
    },
    currentMatchingSkills(sortedBy, section, skillsToMatch){
      // Checking for Bounty Hunter Specialization first.
      if (this.location === 'Champion Builder Skills' && this.champion.role === 'Bounty Hunter' && this.champion.decision){
        let specialty = this.champion.decision.role
        skillsToMatch = skillsToMatch.filter(skill=>{
          if (!skill.decisionTrait || skill.category !== 'Role'){
            return true
          }
          else if (skill.decisionTrait === specialty){
            return true
          }
          else { return false }
        })
      }
      if (sortedBy === "level"){
        // TESTING CHAMPION BUILDER
        // if (this.location === 'Champion Builder Skills'){
        //   // console.log(section)
        //   skillsToMatch.filter(skill=> {
        //     if (section === skill.skillLevel){
        //       // console.log(skill.category)
        //       return skill.category
        //     }
        //   })
        // }
        // console.log(skillsToMatch.filter(skill => section === skill.skillLevel))
        return skillsToMatch.filter(skill => section === skill.skillLevel)
      }
      if (sortedBy === "actionType"){
        return skillsToMatch.filter(skill => section === skill.action)
      }
      if (sortedBy === "category"){
        return skillsToMatch.filter(skill => section === skill.category)
      }
    },
    toggleSection(section){
      this.openedSections[section] = !this.openedSections[section]
    },
    openedState(section){
      return this.openedSections[section]
    },
    currentQuantity(section){
      // if (this.location === 'Champion Builder Skills'){
        return this.currentTabChampionSkills.filter(skill=> skill.skillLevel === section).length
      // }
      // else {
      //   return
      // }
    },
    calculateSectionSizeBasedOnLevel(section){
      if (this.location === "Champion Builder Skills"){
        let levelingNumbers = this.database.levelingNumbers
        let sectionLevelingNumber = levelingNumbers[this.champion.level][this.currentDisplayTab][section]
        let sectionLevelingNumberDisplayed = sectionLevelingNumber ? sectionLevelingNumber : 0
        return sectionLevelingNumberDisplayed
      }
    },
    disabledSection(section){
      if (this.location==='Champion Builder Skills'){
        return !this.calculateSectionSizeBasedOnLevel(section) && section !== 'Given'
      }
    },
    // We want to disable (and remove) checkboxes in disabled sections unless they have too many skills.
    removeCheckboxes(section){
      if (this.currentQuantity(section) <= this.calculateSectionSizeBasedOnLevel(section) && this.disabledSection(section)){
        return true
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.skill-list {
  /* margin: 1em; */
}
.skill-list > * {
  /* margin: 9px 5px; */
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.slide-fade-enter-active {
  transition: all .6s ease;
}
.sortedBy-section {
  /* margin: 20px 0; */
  padding: 9px 5px;
  margin: 10px 0px;
  border-top: solid 1px black;
  border-left: solid 1px black;
  border-right: solid 2px black;
  border-bottom: solid 2px black;
  /* background-color: black; */
  
}

.disabledSection {
  opacity: .5;
}

.hiddenSection {
  display: none;
}

h3 {
  /* color: white; */
  /* text-align: right; */
}
.section-top-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 17px 15px 14px;
  margin: -9px -5px -9px;

}
.section-top-row .row-left {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  /* font-size: 1.5em; */
}
.section-top-row .row-right {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  /* font-size: 1.5em; */
}
.openedSection {
  /* background-color: rgb(215, 215, 215); */
}

.expand-section-icon {
  margin-bottom: 5px;
  width: 30px;
}

</style>

<style>
.removeInput .body-of-skills {
  pointer-events: none;
}

.removeInput .skill-checkbox {
  display: none;
}
</style>