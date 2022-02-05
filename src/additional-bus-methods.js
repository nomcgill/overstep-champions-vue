/* eslint-disable no-debugger */
import Vue from 'vue'

// EXAMPLE to reassign:
// Vue.set(someobject, 'key', 'value')


const additionalBusMethods = {

  // Set the new Champion level.
  setChampionLevel(champion, level){
    Vue.set(champion, "level", level)
    // Gotta also control those proficiencies that are based on level.
    // No proficiencies below level 4.
    let filteredOutSkillArray = []
    if (level < 4){
      filteredOutSkillArray = champion.currentSkills.filter(each=> each.category !== "Proficiency")
    }
    // One proficiency at level 4+.
    else if (level >= 4 && level < 8){
      filteredOutSkillArray = champion.currentSkills.filter(each=> each.profLevel !== 8)
    }
    // If level is 8 or more, keep proficiencies untouched.
    else if (level >= 8){
      return
    }

    Vue.set(champion, "currentSkills", filteredOutSkillArray)
  },

  // Set the new Champion Role bringing in the full skills list already.
  setChampionRole(champion, database, role, newSkillList){
    // TO-DO : Apply all of the things that come with the new Role, like HP and such.
    console.log(database)

    Vue.set(champion, "role", role)
    this.newChampionSkillList(champion, newSkillList)
  },

  // Set the new Champion Source bringing in the new skills list already.
  setChampionSource(champion, database, source, newSkillList){
    // TO-DO : Apply all of the things that come with the new Source, like HP and such.

    console.log(database)
    Vue.set(champion, "source", source)
    this.newChampionSkillList(champion, newSkillList)
  },

  // Get rid of skills of that category
  cleanseSkills(champion, category){
    let filteredOutSkillArray = champion.currentSkills.filter(each=> each.category !== category)
    Vue.set(champion, "currentSkills",filteredOutSkillArray)
  },

  newChampionSkillList(champion, newSkillList){
    Vue.set(champion, "currentSkills", newSkillList)
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
  
  // Update either the level 4 or 8 non-damage proficiency. The level bus method should be controlling qualifications.
  // In modal.vue, 4 & 8 should not be available for duplication.
  // Also there, this function should not be accessible if under the level threshold.
  updateProficiencies(champion, profChoice, profLevel){
    // Remove previous proficiency at that level.
    let filteredOutSkillArray = champion.currentSkills.filter(each=> each.profLevel !== profLevel)
    // Create new Proficiency skill based on choice.
    let newProfSkill = {
      name: profChoice + ' Proficiency',
      action: "Passive",
      skillLevel: "Given",
      category: "Proficiency",
      damage: false,
      flavor: "You've chosen " + profChoice + " as your Champion level " + profLevel + " proficiency.",
      impact: "Strengthen all Out of Danger " + profChoice + " actions that do not inflict damage to enemies.",
      profLevel: profLevel
    }

    // Add prof choice to existing (filtered) skills list.
    Vue.set(champion, "currentSkills",([...filteredOutSkillArray, newProfSkill]))
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
      if (champion.intersection){
        // Running an intersection change ONLY IF the new intersection is different than the previous.
        if (champion.intersection.title !== intersection.title){
          let filteredOutSkillArray = champion.currentSkills.filter(each=> !(each.category === 'Intersection'))
          Vue.set(champion, "currentSkills", filteredOutSkillArray)
          Vue.set(champion, "intersection", intersection)
        }
      }
      else {
        Vue.set(champion, "intersection", intersection)
      }
    
    }

  }

}

export default additionalBusMethods