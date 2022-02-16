<template>
    <div>
      <modal
        @close="$emit('close')"
        v-model="modal"
        :modalType="modal"
        :modalData="`modal`"
        scrollable
        noCornerX
        id="role-source-modal"
      >
        <div slot="header" class="section">
          <h2>{{ roleSourceData.title }}</h2>
          <p class="subtext">{{ roleSourceData.tagline }}</p>
        </div>


        <div class="modal-body">
            <div v-if="page === 'roles'" class="damage-hp-row">
                <p>Damage: {{ roleSourceData.damage }}</p>
                <p>HP: {{ roleSourceData.hp }}</p>
            </div>
            <div class="side-scroll-content">
                <div
                    v-for="(content, index) in sideScrollLayout"
                    :key="index"
                    class="side-scroll-section"
                >
                    <h3>{{ scrollSectionHeader(content) }}</h3>


                    <div 
                        class="side-scroll-section-body"
                        v-if="content === 'description'"
                    >
                        <p>{{ roleSourceData.description }}</p>
                    </div>

                    <div 
                        class="side-scroll-section-body"
                        v-if="content === 'given'"
                    >
                        
                    </div>

                    <div 
                        class="side-scroll-section-body"
                        v-if="content === 'stories'"
                    >
                        <p>{{ roleSourceData.stories[0] }}</p>
                    </div>

                    <div 
                        class="side-scroll-section-body"
                        v-if="content === 'playstyle'"
                    >
                        <p>{{ roleSourceData.playstyle ? roleSourceData.playstyle : 'No playstyle written yet.' }}</p>
                    </div>
                    <div 
                        class="side-scroll-section-body"
                        v-if="content === 'sourceFeature'"
                    >
                        <p>{{ roleSourceData.sourceFeature.description }}</p>
                    </div>

                    <div 
                        class="side-scroll-section-body"
                        v-if="content === 'recovery'"
                    >
                        <p>{{ roleSourceData.recovery }}</p>
                    </div>


                </div>
                <!-- <h3>Description</h3> -->
            </div>

        <decision-modal
            v-if="decisionModal"
            @makeDecisions="makeDecisions"
            @close="decisionModal = false"
            v-model="decisionModal"
            :modalData="`modal`"
            :database="database"
            :champion="champion"
            :roleSourceData="roleSourceData"
            :page="page"
            :pendingModalChoice="currentDecisionName"
            :pendingAnimalName="pendingAnimalName"
        />



        </div>

        <div slot="footer">
            <button @click.prevent="$emit('close')" class="button-type-2">Cancel</button>
            <button id="decision-footer-button" v-if="roleSourceData.decisionOptions" @click.prevent="decisionModal = roleSourceData.title" class="button-type-1">
                <span v-if="!decisionHasBeenMade">Choose a<span v-if="choiceLabel === 'Origin'">n</span></span>
                {{ choiceLabel }}
                <span v-if="decisionHasBeenMade">: {{ currentDecisionName }}</span>
            </button>
            <button v-if="decisionHasBeenMade" @click.prevent="$emit('applyRoleSource', page, roleSourceData.title, newTraitSkills, currentDecisionName); $emit('close');" class="button-type-1" :class="{}">Confirm</button>
        </div>

      </modal>
    </div>
</template>



<script>
/* eslint-disable no-debugger */
/* eslint-disable vue/no-unused-components */


import DecisionModal from '@/components/ChampionBuilder/Potential/DecisionModalBody/DecisionModal'
// import DecisionTraits from '@/components/ChampionBuilder/Potential/DecisionTraits'
import BountyHunter from '@/components/ChampionBuilder/Potential/DecisionModalBody/BountyHunter'
// import Elementalist from '@/components/ChampionBuilder/Potential/DecisionModalBody/Elementalist'
// import Demonic from '@/components/ChampionBuilder/Potential/DecisionModalBody/Demonic'
// import Morph from '@/components/ChampionBuilder/Potential/DecisionModalBody/Morph'


export default {
    name: 'RoleSourceModal',
    components: {
        DecisionModal,
        BountyHunter,
        // Demonic,
        // Elementalist,
        // Morph
    },
    props: {
        champion: {
            required: true
        },
        database: {
            required: true
        },
        // roleSource === "Bounty Hunter", etc.
        roleSource: {
            required: true
        },
        // "page === "roles" || page === "sources"
        page: {
            required: true
        }
    },
    created(){
        if (this.page === "roles"){
            if (this.champion.role === this.roleSource && this.champion.decision.role){
                this.currentDecisionName = this.champion.decision.role
                // With Morph, open the modal with the beast-name as data.
                if (this.champion.role === 'Morph'){
                    let beastFormName = this.champion.currentSkills.filter(skill=> skill.skillLevel === "Given" && skill.beastName)[0].beastName
                    let beastName = beastFormName ? beastFormName : false
                    this.pendingAnimalName = beastName
                }
            }
        }
        if (this.page === "sources"){
            if (this.champion.source === this.roleSource && this.champion.decision.source){
                this.currentDecisionName = this.champion.decision.source
            }
        }
    },
    computed: {
        roleSourceData(){
            return this.database[this.page].filter(each=> each.title === this.roleSource)[0]
        },
        sideScrollLayout(){
            return this.page === "roles" ? this.roleLayout : this.sourceLayout
        },
        choiceLabel(){
            return this.roleSource === "Bounty Hunter" ? "Spec" 
            : this.roleSource === "Morph" ? "Form"
            : this.roleSource === "Elementalist" ? "Core"
            : this.roleSource === "Demonic" ? "Origin"
            : ''
        },
        decisionHasBeenMade(){
            if (this.champion.decision && (this.champion.role === this.roleSource || this.champion.source === this.roleSource)){
                if ((this.page === "roles" && this.champion.decision.role) || (this.page === "sources" && this.champion.decision.source)){
                    return true
                }
                else {
                    return !(this.roleSourceData.decisionOptions && this.decisions.length < 1)}
            }
            else {
                return !(this.roleSourceData.decisionOptions && this.decisions.length < 1)
            }
        },
        inherentSkills(){
            return this.roleSourceData.traits
        },
        newTraitSkills(){
            let decisions = this.decisions ? this.decisions : []
            let inherentSkills = this.inherentSkills ? this.inherentSkills : []
            return [...decisions,...inherentSkills]
        }

    },
    data(){
        return {
            modal: false,
            decisionModal: false,

            roleLayout: ['description', 'given', 'stories', 'playstyle'],
            sourceLayout: ['description', 'given', 'stories', 'sourceFeature', 'recovery'],

            decisions: [],
            currentDecisionName: false,
            pendingAnimalName: false
        }
    },
    methods: {
        scrollSectionHeader(content){
            let header =
                content === 'description' ? 'Description' :
                content === 'given' ? 'Given Skills' :
                content === 'stories' ? 'Stories' :
                content === 'playstyle' ? 'Playstyle' :
                content === 'sourceFeature' ? 'Feature' :
                content === 'recovery' ? 'Overstep Recovery' : ''
           
           return header
        },
        makeDecisions(decisions, currentDecisionName){
            // Decisions being sent should be an ARRAY of NEW SKILLS. Associated roleSource decisions are REQUIRED to accompany the upcoming bus.
            this.decisions = decisions
            this.currentDecisionName = currentDecisionName
            if (this.decisions[0].beastName){
                this.pendingAnimalName = this.decisions[0].beastName
                // console.log(this.pendingAnimalName)
            }
        }
    }
}


</script>

<style>

    #role-source-modal .modal-container .header {
        padding: 8px 15px 
    }

    #role-source-modal > .modal-container .footer > * {
        width: 100%;
        display: flex;
        /* justify-content: flex-end; */
        justify-content: space-between;
        /* flex-direction: row; */
        /* justify-content: space-around; */
    }

</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h2 {
    font-size: 1.8em;
}

#role-source-modal .section {
    padding: 10px;
}

.modal-body {
    text-align: left;
}

.modal-body .section {
}

.damage-hp-row {
    display: flex;
    /* flex-direction: column; */
    justify-content: space-around;
    /* align-items: center; */
    margin: 0px 20px 10px;
}

.damage-hp-row > * {
    margin: 2px;
}

.right-group {

}

#decision-footer-button {
    background-color: rgb(136, 112, 49);
}

.disabled {
    opacity: .2;
    pointer-events: none;
}

</style>