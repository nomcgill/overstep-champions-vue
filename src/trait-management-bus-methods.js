/* eslint-disable no-debugger */
import Vue from 'vue'

// EXAMPLE to reassign:
// Vue.set(someobject, 'key', 'value')


const traitManagementBusMethods = {

    // It's already been decided that this is a new Role or Source. Get rid of those traits.
    traitHandler(database, champion, roleSourceLabel, newRoleSource, decisions){
        traitManagementBusMethods.cleanseSkills(champion, roleSourceLabel)
        console.log(newRoleSource, decisions)

        if (newRoleSource === 'Bounty Hunter'){traitManagementBusMethods.setBountyHunterTraits(database, champion, decisions)}

    },

    cleanseSkills(champion, roleSourceLabel){
        let filteredOutRoleOrSourceSkills = champion.currentSkills.filter(each=> each.category !== roleSourceLabel)
        Vue.set(champion, "currentSkills",(filteredOutRoleOrSourceSkills))
    },


    // Bounty Hunter

    // Elementalist

    // Knight

    // Morph

    // Sayer

    // Shade

    // Tactician

    // Chakrah

    // Demonic

    // Divine

    // Nature

}


export default traitManagementBusMethods
