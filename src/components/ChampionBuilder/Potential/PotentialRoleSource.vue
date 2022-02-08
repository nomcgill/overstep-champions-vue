<template>
    <div class="section">
        <h2>{{ capitalizeFirst(page) }}</h2>
        <div class="icon-row">
            <role-source-icon 
                v-for="(option, index) in database[page]"
                :roleSource="option.title"
                :thumbnail="images[lowerCaseNoSpaces(option.title)]"
                :champion="champion"
                :page="page"
                :key="index"
                :index="index"
                :priorChoices="priorChoices"
                @click.native.prevent="thisRoleSourceModal = option.title"

            />
        </div>

        <role-source-modal 
            v-if="thisRoleSourceModal"
            @applyRoleSource="applyRoleSource"
            @close="thisRoleSourceModal = false"
            v-model="thisRoleSourceModal"
            :modalData="`modal`"
            :database="database"
            :champion="champion"
            :roleSource="thisRoleSourceModal"
            :page="page"
        />

    </div>
</template>



<script>

import RoleSourceIcon from '@/components/ChampionBuilder/Potential/RoleSourceIcon'
import RoleSourceModal from '@/components/ChampionBuilder/Potential/RoleSourceModal'

//    <Skill 
//       v-for="(skill, index) in currentSkills"
//       :skill="skill"
//       :champion="champion"
//       :dropdown="skill.opened"
//       :key="index"
//       :index="index"
//     />

export default {

    /* eslint-disable no-debugger */

    name: 'PotentialRoleSource',
    components: { 
        RoleSourceIcon,
        RoleSourceModal
    },
    props: {
        champion: {
            required: false
        },
        database: {
            required: true
        },
        page: {
            required: true
        },
        images: {
            required: true
        },
        editing: {
            required: false
        }
    },
    created() {
        if (this.editing){
            this.priorChoices = [this.champion.role, this.champion.source]
        }
    },
    computed: {
        currentRoute(){
            return this.$route.name
        }
    },
    data() {
        return {
            priorChoices: false,
            listOfRoles: this.database.roles.map(each => each.title),
            listOfSources: this.database.sources.map(each => each.title),
            thisRoleSourceModal: false
        }
    },
    methods: {
        
        capitalizeFirst(string){
            return string.charAt(0).toUpperCase() + string.slice(1)
        },
        lowerCaseNoSpaces(string){
            // console.log(string.toLowerCase().replace(/\s/g, ''))
            return string.toLowerCase().replace(/\s/g, '')
        },
        filterOutRoleOrSourceTraits(category){
            let nonTraitSkillList = this.champion.currentSkills.filter(skill=> {
                if (skill.category === category){
                    return !(skill.decisionTrait || skill.trait)
                }
                else {
                    return true
                }  
            })
            return nonTraitSkillList
        },
        // Bring in the role/source, its name, and the trait skills.
        applyRoleSource(page, roleSourceTitle, newTraitSkills, currentDecisionName){
            // console.log(this.champion.currentSkills)
            // console.log(newTraitSkills)

            let previousRoleDecision = this.champion.decision ? this.champion.decision.role : false
            let previousSourceDecision = this.champion.decision ? this.champion.decision.source : false
            if (page === "roles"){

                let decisionObject = {
                    role: currentDecisionName,
                    source: previousSourceDecision
                }

                // controlling the highlight logic
                if (this.priorChoices){
                    this.priorChoices = this.priorChoices.filter(each => !this.listOfRoles.includes(each))
                }
                this.$emit('checkmarks', 'role')
                // Only invoke if role is actually changing.
                if (this.champion.role !== roleSourceTitle){
                    this.$bus.$emit(this.$bus.CLEANSE_CATEGORY_SKILLS, 'Role')
                    let newSkillList = [...newTraitSkills, ...this.champion.currentSkills]
                    this.$bus.$emit(this.$bus.SET_CHAMPION_ROLE, roleSourceTitle, newSkillList, decisionObject)
                }
                // Otherwise, only re-apply role traits.
                else {
                    // Filter out decisionTraits and traits, then combine the non-trait list with the all traits.
                    let newSkillList = [...newTraitSkills, ...this.filterOutRoleOrSourceTraits("Role")]
                    // Compare against old list before wasting an emit on a non-change.
                    let currentSkillsString = JSON.stringify(this.champion.currentSkills.map(skill=>skill.name).sort())
                    let newSkillListString = JSON.stringify(newSkillList.map(skill=> skill.name).sort())
                    if (currentSkillsString !== newSkillListString){
                        this.$bus.$emit(this.$bus.SET_CHAMPION_SKILLS, newSkillList, decisionObject)
                    }
                }
            }


            if (page === "sources"){

                let decisionObject = {
                    role: previousRoleDecision,
                    source: currentDecisionName
                }

                if (this.priorChoices){
                    this.priorChoices = this.priorChoices.filter(each => !this.listOfSources.includes(each))
                }
                this.$emit('checkmarks', 'source')
                // Only invoke if source is actually changing.
                if (this.champion.source !== roleSourceTitle){
                    this.$bus.$emit(this.$bus.CLEANSE_CATEGORY_SKILLS, 'Source')
                    let newSkillList = [...newTraitSkills, ...this.champion.currentSkills]
                    this.$bus.$emit(this.$bus.SET_CHAMPION_SOURCE, roleSourceTitle, newSkillList, decisionObject)
                }
                // Otherwise, only re-apply source traits.
                else {
                    // Filter out decisionTraits and traits, then combine the non-trait list with the all traits.
                    let newSkillList = [...newTraitSkills, ...this.filterOutRoleOrSourceTraits("Source")]
                    // Compare against old list before wasting an emit on a non-change.
                    let currentSkillsString = JSON.stringify(this.champion.currentSkills.map(skill=>skill.name).sort())
                    let newSkillListString = JSON.stringify(newSkillList.map(skill=>skill.name).sort())
                    if (currentSkillsString !== newSkillListString){
                        this.$bus.$emit(this.$bus.SET_CHAMPION_SKILLS, newSkillList, decisionObject)
                    }
                }
            }
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.section {
    /* margin: 15px 5px; */
    padding: 15px 0 10px;
    text-align: center;
}
.icon-row {
    display: flex;
    flex-wrap: wrap;
    /* for horizontal aligning of child divs */
    justify-content: center;
    /* for vertical aligning */
    align-items: center;
}
</style>