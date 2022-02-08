<template>
  <div>
    <p v-if="!champion.role || !champion.source">Man, you should really pick your Role and Source first.</p>
    <div v-else>
      <!-- <h2>Skills</h2> -->
      <div id="skills-page-top">
        <button v-bind:class='{disabled: champion.level < 4 }' id="prof-button" @click.prevent="nondamageModal = true" >Proficiencies</button>
        <div id="skills-nav-bar">
          <button @click="currentDisplayTab = 'Role'" v-bind:class="{selectedTab: roleTab}">{{ champion.role }}</button>
          <button @click="currentDisplayTab = 'Source'" v-bind:class="{selectedTab: sourceTab}">{{ champion.source }}</button>
        </div>
      </div>
      <skill-list 
        :champion="champion"
        :database="database"
        :location="'Champion Builder Skills'"
        :skillBank="skillBank"
        :sortingBy="'level'"
        :currentDisplayTab="currentDisplayTab"
      />
      <!-- <skill-list 
        :champion="champion"
        :database="database"
        :location="'Champion Builder'"
        :skillBank="sourceSkillBank"
        :sortingBy="'level'"
      /> -->
    </div>

      <non-damage-modal 
        v-if="nondamageModal"
        @close="nondamageModal = false"
        v-model="nondamageModal"
        :modalData="`modal`"
        :database="database"
        :champion="champion"
      />

  </div>
</template>

<script>

import SkillList from '@/components/shared/components/SkillList'
import NonDamageModal from '@/components/ChampionBuilder/Skills/NonDamageModal.vue'


export default {
  /* eslint-disable no-debugger */
  name: 'Skills',
  components: {
    SkillList,
    NonDamageModal
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
    if (this.champion.role){
      this.databaseRoleData = this.database.roles.filter(role=>role.title === this.champion.role)[0]
      this.roleSkillBank = this.grabSkillsFromCategoryObject(this.databaseRoleData)
    }
    if (this.champion.source){
      this.databaseSourceData = this.database.sources.filter(source=>source.title === this.champion.source)[0]
      this.sourceSkillBank = this.grabSkillsFromCategoryObject(this.databaseSourceData)
    }
  },
  computed: {
    roleTab: function(){
      return this.currentDisplayTab === 'Role'
    },
    sourceTab: function(){
      return this.currentDisplayTab === 'Source'
    },
    skillBank: function(){
      let skillBank = this.currentDisplayTab === 'Role' ? this.roleSkillBank : this.sourceSkillBank
      return skillBank
    }
  },
  data(){
    return {
      currentDisplayTab: 'Role',
      nondamageModal: false
    }
  },
  methods: {
    grabSkillsFromCategoryObject(categoryObject){
      // Traits include given skills or choices made in Potential tab.
      let traits = categoryObject.traits ? categoryObject.traits : categoryObject.decisionTraits ? categoryObject.decisionTraits : []
      return [...categoryObject.skills.basic, ...categoryObject.skills.advanced, ...categoryObject.skills.master, ...traits]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

#skills-page-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
  margin-bottom: 15px;
}

#skills-nav-bar {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 60%;
}

#skills-page-top button {
  font-size: 1.1em;
  border-top: solid 1px black;
  border-right: solid 2px black;
  border-bottom: solid 2px black;
  border-left: solid 1px black;
  padding: 8px 5px;
  text-align: center;
  background-color: gray;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

#skills-nav-bar button {
  width: 100%;
}

#skills-nav-bar > button:first-child {
  border-right: none;
}

#skills-nav-bar > .selectedTab {
  background-color: white;
  pointer-events: none;
}

#skills-page-top #prof-button {
  background-color: #65a779;
  color: white;
  width: 32%;
}

.disabled {
  pointer-events: none;
  opacity: .2;
}

</style>