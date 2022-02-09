/* eslint-disable no-debugger */
import Vue from 'vue'

// EXAMPLE to reassign:
// Vue.set(someobject, 'key', 'value')


const additionalBusMethods = {

  // Set the new Champion level.
  setChampionLevel(database, champion, level){
    Vue.set(champion, "level", level)
    // Gotta also control those proficiencies that are based on level.
    // No proficiencies below level 4.
    let newSkillArray = champion.currentSkills
    if (level < 4){
      newSkillArray = champion.currentSkills.filter(each=> each.category !== "Proficiency")
    }
    // One proficiency at level 4+.
    else if (level >= 4 && level < 8){
      newSkillArray = champion.currentSkills.filter(each=> each.profLevel !== 8)
    }
    // If level is 8 or more, keep proficiencies untouched.

    // Gotta check to see if the Champion's new level qualifies or disqualifies any sidelined skills.
    // Elementalist Basic, Advanced, and Master Elements Lists are managed here and in setChampionRole.
    if (champion.role === "Elementalist"){
      let currentSkillsWithoutRoleGivens = newSkillArray.filter(skill=> !(skill.trait && skill.category === 'Role'))
      let qualifiedGivens = database.roles.filter(role=> role.title === "Elementalist")[0].traits.filter(trait=> !(trait.requiredLevel > level))
      newSkillArray = [...currentSkillsWithoutRoleGivens, ...qualifiedGivens]
    }


    Vue.set(champion, "currentSkills", newSkillArray)
  },

  // Set the new Champion Role bringing in the full skills list already.
  setChampionRole(champion, database, role, newSkillList, decisionObject){
    // TO-DO : Apply all of the things that come with the new Role, like HP and such.

    let newSkillArray = newSkillList

    // Elementalist Basic, Advanced, and Master Elements Lists are managed here and in setChampionLevel.
    if (role === "Elementalist"){
      let currentSkillsWithoutRoleGivens = newSkillArray.filter(skill=> !(skill.trait && skill.category === 'Role'))
      let qualifiedGivens = database.roles.filter(role=> role.title === "Elementalist")[0].traits.filter(trait=> !(trait.requiredLevel > champion.level))
      newSkillArray = [...currentSkillsWithoutRoleGivens, ...qualifiedGivens]
    }

    Vue.set(champion, "role", role)
    this.newChampionSkillList(champion, newSkillArray, decisionObject)
  },

  // Set the new Champion Source bringing in the new skills list already.
  setChampionSource(champion, database, source, newSkillList, decisionObject){
    // TO-DO : Apply all of the things that come with the new Source, like HP and such.

    console.log(database)
    Vue.set(champion, "source", source)
    this.newChampionSkillList(champion, newSkillList, decisionObject)
  },

  // Get rid of skills of that category
  cleanseSkills(champion, category){
    let filteredOutSkillArray = champion.currentSkills.filter(each=> each.category !== category)
    Vue.set(champion, "currentSkills",filteredOutSkillArray)
  },

  // Set new skills list for Champion.
  newChampionSkillList(champion, newSkillList, decisionObject){
    
    // But first check skills against certain qualifications:

    // Weed out skills that require minimum level.
    let newApprovedSkillList = newSkillList.filter(skill => {
      if (skill.requiredLevel > champion.level){ 
        // unapprovedSkills.push(skill)
        return false 
      }
      else { return true }
    })

    // Vue.set(champion, "sidelinedSkills", unapprovedSkills)

    Vue.set(champion, "currentSkills", newApprovedSkillList)
    // Decisions only apply on roleSources with options, like different Demonic Origins. Otherwise will set false.
    Vue.set(champion, "decision", decisionObject)
  },

  // Update Background, including new Background skill.
  updateBackground(champion, newBackground){
    if (!champion.currentBackground || newBackground.title !== champion.currentBackground.title){
      Vue.set(champion, "currentBackground", newBackground)
    }

    // Remove previous background skills.
    let previousBackgroundSkills = champion.currentSkills.filter(skill=>skill.category === "Background")
    let noBackgroundSkillsList = previousBackgroundSkills.length > 0 ? champion.currentSkills.filter(skill => skill.name !== previousBackgroundSkills[0].name)
    : champion.currentSkills

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
      console.log(newBackgroundSkill)
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
    console.log(previousState)
    console.log(skill)
    let newArray = []
    // Remove (or ensure removed state) the skill from current Champion skills.
    let filteredOutSkillArray = champion.currentSkills.filter(each=> !(each.name === skill.name && each.category === skill.category))
    // Ensure list only has one skill of each Intersection tier.
    if (skill.category === 'Intersection'){
      filteredOutSkillArray = filteredOutSkillArray.filter(filteredSkill=>!(filteredSkill.category === "Intersection" && filteredSkill.skillLevel === skill.skillLevel))
    }
    // If the skill was there, remove it from the list.
    if (previousState){
      newArray = filteredOutSkillArray
    }
    // If the skill wasn't there, add it to the list.
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