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
                @click.native="clickRoleSource(page, option.title)"
            />
        </div>
    </div>
</template>



<script>

import RoleSourceIcon from '@/components/ChampionBuilder/Potential/RoleSourceIcon'

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
    components: { RoleSourceIcon },
    props: {
        page: {
            required: true
        },
        champion: {
            required: false
        },
        database: {
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
            listOfSources: this.database.sources.map(each => each.title)
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
        clickRoleSource(page, roleSource){

            if (page === "roles"){
                // controlling the highlight logic
                if (this.priorChoices){
                    this.priorChoices = this.priorChoices.filter(each => !this.listOfRoles.includes(each))
                }
                this.$emit('checkmarks', 'role')
                if (this.champion.role !== roleSource){
                    this.$bus.$emit(this.$bus.SET_CHAMPION_ROLE, roleSource)
                }
            }

            if (page === "sources"){
                if (this.priorChoices){
                    this.priorChoices = this.priorChoices.filter(each => !this.listOfSources.includes(each))
                }
                this.$emit('checkmarks', 'source')
                if (this.champion.source !== roleSource){
                    this.$bus.$emit(this.$bus.SET_CHAMPION_SOURCE, roleSource)
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