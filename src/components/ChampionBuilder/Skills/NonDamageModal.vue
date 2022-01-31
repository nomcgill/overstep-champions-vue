<template>

      <modal
        @close="$emit('close')"
        v-model="modal"
        :modalType="modal"
        :modalData="`modal`"
        scrollable
      >
        <div slot="header">
          <h2>Proficiencies</h2>
          <p class="subtext">Choose your Non-Damage Proficiencies.</p>
        </div>

        <div class="prof-choice-row" v-bind:class='{disabled: champion.level < 4 }'>
            <label for="level-4-prof" v-if='champion.level >= 4'>(Level 4)</label>
            <select 
                v-model="level4Choice"
                @change="profChange(4)"
                id="level-4-prof" 
                name="Level 4 Proficiency" 
            >
                <option disabled value selected></option>
                <option 
                    v-for="(action, index) in databaseActionList.level4"
                    :key="index"
                    :value="action.title"
                    :selected="level4Choice === action.title"
                >
                {{ action.title }}
                </option>
            </select>
        </div>
        <div class="prof-choice-row" v-bind:class='{disabled: champion.level < 8 }'>
            <label for="level-8-prof">(Level 8)</label>
            <select 
                v-model="level8Choice"
                @change="profChange(8)"
                name="Level 8 Proficiency" 
                id="level-8-prof" 
            >
                <option disabled selected value></option>
                <option 
                    v-for="(action, index) in databaseActionList.level8"
                    :key="index"
                    :value="action.title"
                    :selected="level8Choice === action.title"
                >
                    <!-- :selected="computeSelected(action.title, 8)" -->
                {{ action.title }}
                </option>
            </select>
        </div>
        <div slot="footer">
            <button @click.prevent="$emit('close')" class="button-type-1">Done</button>
        </div>

      </modal>
  
</template>

<script>
/* eslint-disable no-debugger */
// import { bus } from '@/main'
import Modal from '@/components/shared/components/Modal'

export default {
  name: 'NonDamageModal',
  components: {
    Modal
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
      // Prefill level 4 choice on create.
      if (this.champion.currentSkills.filter(each=> each.profLevel === 4)[0]){
          let skillName = this.champion.currentSkills.filter(each=> each.profLevel === 4)[0].name
          let valueName = skillName.substring(0, skillName.length - 12)
          this.level4Choice = valueName
      }
      // Prefill level 8 choice on create.
      if (this.champion.currentSkills.filter(each=> each.profLevel === 8)[0]){
          let skillName = this.champion.currentSkills.filter(each=> each.profLevel === 8)[0].name
          let valueName = skillName.substring(0, skillName.length - 12)
          this.level8Choice = valueName
      }
  },
  computed: {
    databaseActionList(){
        let actionArray = []
        for (const [key, value] of Object.entries(this.database.actionTypes)){
            // Not a channel subaction
            if (key !== 'channel'){
                actionArray.push(...value)
            }
        }
        // AND not an prior-made choice, then it's in the dropdown.
        let firstAvailableActionArray = actionArray.filter(action=> action.title !== this.level8Choice)   
        let secondAvailableActionArray = actionArray.filter(action=> action.title !== this.level4Choice)  
        let availableActionArray = {
            level4: firstAvailableActionArray,
            level8: secondAvailableActionArray
        }
        return availableActionArray
    }
  },
  data(){
    return {
      modal: false,
      level4Choice: false,
      level8Choice: false
    }
  },
  methods: {
    updateExposition(whichTime, data){
      this.$bus.$emit(this.$bus.SET_CHAMPION_EXPOSITION, whichTime, data)
    },
    profChange(profLevel){
        let profChoice = profLevel === 4 ? this.level4Choice : profLevel === 8 ? this.level8Choice : false
        this.$bus.$emit(this.$bus.UPDATE_PROFICIENCIES, profChoice, profLevel)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.prof-choice-row {
    margin: 10px;
}

.disabled {
    pointer-events: none;
    opacity: .3;
}

</style>