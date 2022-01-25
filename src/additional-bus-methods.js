/* eslint-disable no-debugger */
import Vue from 'vue'

// EXAMPLE to reassign:
// Vue.set(someobject, 'key', 'value')


const additionalBusMethods = {

  // Overwrite vue Champion with another Champion's data.
  replaceChampion(){
    // Replaces Champion value in App.vue
  },

  setChampionLevel(champion, level){
    // console.log(champion)
    Vue.set(champion, "level", level)
  },

  // Update Background, including new Background skill.
  updateBackground(champion, newBackground){
    if (!champion.currentBackground || newBackground.title !== champion.currentBackground.title){
      Vue.set(champion, "currentBackground", newBackground)
    }

    // Remove previous background skills.
    let previousBackgroundSkills = champion.currentSkills.filter(skill=>skill.category === "Background")
    let noBackgroundSkillsList = champion.currentSkills.filter(skill => skill.name !== previousBackgroundSkills[0].name)

      // Add new background skill to existing list.
      let newBackgroundSkill = {
        name: newBackground.title,
        action: "Passive",
        skillLevel: "Given",
        category: "Background",
        damage: false,
        flavor: " ",
        impact: newBackground.description
      }
      Vue.set(champion, "currentSkills",([...noBackgroundSkillsList, newBackgroundSkill]))
    },
    
  // Update Exposition, whether it be Past, Present, or Future.
  updateExposition(champion, whichTime, data){
      Vue.set(champion, whichTime, data)
  },

  // Toggle one skill dropdown.
  editOpened(champion, skill){
    champion.currentSkills.forEach(championSkill => {
        if (championSkill === skill.skill){
            Vue.set(championSkill,"opened",skill.opened)
        }
    })
  },

  // Toggle all skill dropdowns.
  allOpened(champion, allOpenedState){
    champion.currentSkills.forEach(championSkill => {
      Vue.set(championSkill,"opened",allOpenedState)
    })
  },

  // Select or de-Select the skill after input click.
  toggleSkillChoice(champion, previousState, skill){
    let newArray = []
    // Remove (or ensure removed state) the skill from current Champion skills.
    let filteredOutSkillArray = champion.currentSkills.filter(each=> !(each.name === skill.name && each.category === skill.category))
    if (previousState){
      newArray = filteredOutSkillArray
    }
    if (!previousState){
       let skillArrayWithSkill = [...filteredOutSkillArray, skill]
       newArray = skillArrayWithSkill
    }
    Vue.set(champion, "currentSkills", newArray)
  },

  // Calculate new intersection based on role and source.
  formIntersection(champion, database){
    if (champion.role && champion.source){
      let intersection = database.intersections.filter(intersection=>{
        if(intersection.combinations[1][0] === champion.source || intersection.combinations[2][0] === champion.source){
          if(intersection.combinations[1][1] === champion.role || intersection.combinations[2][1] === champion.role){
            return true
          }
        }
      })[0]
      // Running an intersection change ONLY IF the new intersection is different than the previous.
      if (champion.intersection.title !== intersection.title){
        let filteredOutSkillArray = champion.currentSkills.filter(each=> !(each.category === 'Intersection'))
        Vue.set(champion, "currentSkills", filteredOutSkillArray)
        Vue.set(champion, "intersection", intersection)
      }



    }

  }

}

export default additionalBusMethods