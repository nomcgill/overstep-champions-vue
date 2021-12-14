<template>
  <div :id="skillStrings.name" class="skill-box">
      <div 
        class='skill-head-pane skill-header-open' 
        @click.prevent="toggleDetails($e)"
      >
          <div class='skill-head-pane-top'>
              <h3>{{ skillStrings.name  }}
                  {{ skillStrings.bountyHunterSpecialization }}
                  {{ skillStrings.demonicOriginTitle }}
              </h3>
              <!-- <img src={GoldStar} className={'item-gold-star favorite-star ' + goldClass} onClick={e => toggleFavorite(e, true)} /> -->
              <!-- <img src={GrayStar} className={'item-gray-star favorite-star ' + grayClass} onClick={e => toggleFavorite(e, false)} /> -->
          </div>
          <div class="skill-pane-info">
              <p> 
                {{ skillStrings.shownCategory}} >
                <span :class="skillStrings.actionColor">{{ skillStrings.actionType }}</span>
                {{ skillStrings.skillLevel }}
              </p>
              <!-- <p>{{ this.skill.skillLevel }}</p> -->
          </div>
      </div>
      <!-- <div class="{{ 'skill-dropdown ' + hideDropdown }}> -->
      <div class="skill-dropdown">
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
  </div>
</template>

<script>



export default {
  name: 'Skill',
  components: {
  },
  props: {
      skill: {
          type: Object
      },
      champion: {
        type: Object
      }
  },
  data () {
      return {
        //   skillStrings: {}
      }
  },
  created() {
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

    this.skillStrings = skillStrings
  },
  methods: {
    toggleDetails(event){
      console.log(event)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.skill-box {
  padding: .5em;
  margin: 1em;
  border-bottom: solid 1px black;
}

h3 {
  margin-top: -.5em;
  margin-bottom: 0;
}

@media only screen and (min-width: 768px) {

}

</style>