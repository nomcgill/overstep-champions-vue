<template>
  <div 
    :id="skillStrings.name"
    class="skill-box"
    v-bind:class="[{static:dropdownStatic, builderSkill: this.location === 'Champion Builder Skills'},'skill-index-'+index]">
    <label :for="id">
      <div 
        class='skill-head-pane skill-header-open' 
        v-bind:class="{selecting: location === 'Champion Builder Skills'}"
        @click="toggleOpened"
      >
        <arrow v-if="!dropdownStatic" :direction="dropdownOpened ? `down` : `right`" />
        <div class="skill-head-pane-left">
          <div class='skill-head-pane-top'>
              <h3>{{ skillStrings.name }}
                  {{ skillStrings.bountyHunterSpecialization }}
                  {{ skillStrings.demonicOriginTitle }}
              </h3>
              <!-- <img src={GoldStar} className={'item-gold-star favorite-star ' + goldClass} onClick={e => toggleFavorite(e, true)} /> -->
              <!-- <img src={GrayStar} className={'item-gray-star favorite-star ' + grayClass} onClick={e => toggleFavorite(e, false)} /> -->
          </div>
          <div class="skill-pane-info">
              <p> 
                {{ skillStrings.shownCategory}}
                ({{ skillStrings.skillLevel }})
                > <span :class="skillStrings.actionColor">{{ skillStrings.actionType }}</span>
              </p>
              <!-- <p>{{ dropdownString }}</p> -->
              <!-- <p>{{ this.skill.skillLevel }}</p> -->
          </div>
        </div>
        <div class="skill-head-pane-right">
          <div style="position: relative;">
          <!-- <div class="skill-checkbox" style="position: relative;"> -->
              <!-- style="position: absolute" -->
            <input 
              v-if="location === 'Champion Builder Skills' && skill.skillLevel !== 'Given'"
              type="checkbox"
              class="skill-checkbox top-checkbox"
              :id="id"
              :checked="chosenSkill"
              @click="toggleSkillChoice()"
            >
            <!-- <input 
              v-if="location === 'Champion Builder Skills'"
              type="checkbox"
              style="z-index: 9"
              class="bottom-checkbox"
            > -->
          </div>
        </div>
      </div>
    </label>
      <!-- <div class="{{ 'skill-dropdown ' + hideDropdown }}> -->
      <transition name="slide-fade">
        <div v-if="dropdownOpened" class="skill-dropdown">
            {{ skillStrings.demonicOriginNote }}
            {{ skillStrings.elementList }}
            {{ skillStrings.flavor }}
            {{ skillStrings.flavor2 }}
            {{ skillStrings.flavor3 }}
            {{ skillStrings.flavor4 }}
            {{ skillStrings.impact }}
            {{ skillStrings.impact2 }}
            {{ skillStrings.plea }}
        </div>
      </transition>
  </div>
</template>

<script>
/* eslint-disable no-debugger */

import Arrow from '@/components/shared/components/Arrow'

export default {
  name: 'Skill',
  components: {
    Arrow
  },
  props: {
    index: {
      type: Number,
      required: false
    },
    skill: {
      type: Object,
      required: true
    },
    champion: {
      type: Object,
      required: false
    },
    dropdown: {
      type: Boolean,
      required: false
    },
    location: {
      type: String
    }
  },
  created(){
    // if (this.location === 'Champion Builder Skills'){
    //   debugger;
    // }
  },
  computed: {
    dropdownStatic(){
      return this.location === "Champion Builder Skills" ? true 
      : this.location === "Background Modal" ? true
      : false
    },
    dropdownOpened(){
      return this.dropdownStatic ? true : this.dropdownState
    },
    id(){
      let id = 'skill-' + this.skill.category + '-'  + this.skill.skillLevel + '-' + this.index
      return String(id)
    },
    chosenSkill(){
      let thisSkill = this.skill
      for (let each of this.champion.currentSkills){
        // debugger;
        if (each.name === thisSkill.name && each.category === thisSkill.category){
          return true
        }
      }
      return false
    },
    skillStrings: function(){
      // console.log(this.skill)
      let flavor = typeof this.skill.flavor === 'string' && this.skill.flavor !== ' ' ? this.skill.flavor : ''
      let flavor2 = this.skill.flavor2 ? this.skill.flavor2 : ''
      let flavor3 = this.skill.flavor3 ? this.skill.flavor3 : ''
      let flavor4 = this.skill.flavor4 ? this.skill.flavor4 : ''
      let impact = typeof this.skill.impact === 'string' ? this.skill.impact : ''
      let impact2 = this.skill.impact2 ? this.skill.impact2 : ''
      let demonicOriginNote = this.skill.demonicOriginNote && this.level <= 5 ? this.skill.demonicOriginNote : ''
      // function pleaFormat(plea){
      //     return 
      //         <PleaFormat plea={plea} />
      // }
      // let plea = this.skill.plea ? pleaFormat(this.skill.plea) : ''


      let demonicOriginTitle = this.skill.demonicOriginNote ? " Origin" : ''
      let name = this.skill.beastName ? this.skill.beastName : this.skill.name
      let bountyHunterSpecialization = this.skill.bountyCategory ? ' (' + this.skill.bountyCategory + ' spec.)' : '' 
      let elementList = this.skill.elementList ? this.skill.elementList : ''

      let goldClass = (this.skill.favorite) ? '' : "hidden"
      let grayClass = (this.skill.favorite) ? 'hidden' : ""
      let actionColor = (this.skill.action === "Passive") ? '' : "red"
      let hideDropdown = (this.skill.open) ? "" : "hidden"
      let actionType = 
          typeof this.skill.action === "string" ? this.skill.action : 
          this.skill.action.length === 2 ? this.skill.action[0] + '/' + this.skill.action[1] :
          'Other'
      let shownCategory = 
          (this.skill.category === "Intersection") ? this.champion.intersection.title :
          (this.skill.category === "Role") ? this.champion.role :
          (this.skill.category === "Source") ? this.champion.source : 
          (this.skill.category === "Background") ? "Background" :
          ''
      let skillStrings = {
          flavor: flavor,
          flavor2: flavor2,
          flavor3: flavor3,
          flavor4: flavor4,
          impact: impact,
          impact2: impact2,
          demonicOriginNote: demonicOriginNote,
          demonicOriginTitle: demonicOriginTitle,
          name: name,
          bountyHunterSpecialization: bountyHunterSpecialization,
          // plea: plea,
          elementList: elementList,
          goldClass: goldClass,
          grayClass: grayClass,
          actionColor: actionColor,
          hideDropdown: hideDropdown,
          actionType: actionType,
          shownCategory: shownCategory,
          skillLevel: this.skill.skillLevel
      }
      return skillStrings
    }
  },
  data(){
    return {
      dropdownState: this.dropdown
    }
  },
  watch: {
    dropdown: function(newDropdownState){
      this.dropdownState = newDropdownState
    }
  },
  methods: {
    toggleOpened(){
      if (this.location === "Main"){
        this.$bus.$emit(this.$bus.SKILL_OPEN, {skill:this.skill, opened:!this.dropdown})
      }
      if (!this.dropdownStatic){
        this.dropdownState = !this.dropdownState
      }
    },
    toggleSkillChoice(){
      this.$bus.$emit(this.$bus.TOGGLE_SKILL_CHOICE, this.chosenSkill, this.skill)
      // TO-DO: Gotta actually pass this.skill ^^ into the bus function.
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.skill-box {
  /* padding: 1em .5em; */
  margin: .5em 0;
  border-top: solid 1px black;
  border-left: solid 1px black;
  border-right: solid 2px black;
  border-bottom: solid 2px black;
  /* transition: all .3s ease; */
}

h3 {
  font-size: 1.25em;
  line-height: 1.3em;
  margin-top: 0;
  margin-bottom: 0;
}

.skill-head-pane {
  background-color: rgb(244, 244, 244);
  /* color: white; */
  padding: .5em .5em .5em;
}

.skill-head-pane.selecting {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.skill-head-pane:active.selecting {
  background-color: rgb(235, 235, 235);
  
}


.skill-dropdown {
  padding: .5em;
}

.skill-checkbox {
  height: 20px;
  width: 20px;
  /* padding: 40px; */
  margin-right: 7px;
  position: relative;
  appearance: none;
  background-color: white;
  /* border: solid black; */
  border-top: solid 1px rgb(85, 85, 85);
  border-left: solid 1px rgb(85, 85, 85);
  border-right: solid 1px rgb(85, 85, 85);
  border-bottom: solid 1px rgb(85, 85, 85);
  /* border-radius: 0px; */
  
    -webkit-transition: background-color 250ms linear;
  -ms-transition: background-color 250ms linear;
  transition: background-color 250ms linear;
}

.skill-checkbox:active, .skill-checkbox:checked:active {
  /* background-color: rgb(79, 79, 79); */
}

.skill-checkbox:checked {
  appearance: none;
  background-color: #65a779;
  border: solid 1px rgb(85, 85, 85);

  -webkit-transition: background-color 250ms linear;
  -ms-transition: background-color 250ms linear;
  transition: background-color 250ms linear;
}

.skill-checkbox input {

}

/* This checkbox ensures the checkmark is visible. */
.top-checkbox {
  /* appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  /* height: 20px;
  width: 20px; */
  /* margin-top: 3px;
  padding: 12px;
  border: solid 1px gray; */
}

  /* Bottom checkbox is for the box (decoration) */
.bottom-checkbox {
  /* appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  /* height: 20px;
  width: 20px; */
  /* margin-top: 3px;
  padding: 12px;
  border: solid 1px gray;
  pointer-events: none; */
}

/* The below 3 selectors form the checkmark itself */
.skill-checkbox input:checked {
  /* background-color: #65a779; */
  /* appearance:none; */
  /* -ms-transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);
  border: none; */
  /* background-color: green; */
}
/* .skill-checkbox input:checked:before {
  content:"";
    position: absolute;
    width:3px;
    height:9px;
    background-color: black;
    left:11px;
    top:6px;
}
.skill-checkbox input:checked:after {
    content:"";
    position: absolute;
    width:3px;
    height:3px;
    background-color:;
    left:8px;
    top:12px;
} */

.static {
  /* margin: 12px 0; */
}



@media only screen and (min-width: 768px) {

}

</style>