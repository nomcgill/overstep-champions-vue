<template>
    <modal
        @close="$emit('close')"
        v-model="modal"
        :modalType="modal"
        :modalData="`modal`"
        scrollable
        id="decision-modal"
    >
        <div slot="header">
          <h2>{{ roleSourceData.title }} Decision</h2>
          <p class="subtext">Choose a {{ decisionLabel }}.</p>
        </div>

        <div class="row">
            <div
                v-for="(choice, index) in roleSourceData.decisionOptions"
                :key="index"
                class="decision-trait-box"
                @click="currentChoice = choice; makePendingDecision(choice)"
                v-bind:class="{currentChoice: choice === currentChoice}"
            >
            {{ choice }}
            </div>
        </div>


        <div class="current-choice-content">
            <div class="box">
                <div v-for="(skill, index) in shownSkills" :key="index">
                    <skill
                        :champion="champion"
                        :skill="skill"
                        :location="'Potential'"
                        static
                    />
                    <!-- <p>{{ skill.name }}</p>
                    <p>{{ skill.impact }}</p> -->
                    <input v-if="roleSourceData.title === 'Morph'" v-model="beastNameInput" placeholder="Declare a species.">
                </div>
            </div>
        </div>


        <div slot="footer">
            <button @click.prevent="$emit('close')" class="button-type-2">Cancel</button>
            <button 
                @click.prevent="addBeastNameToSkill(); $emit('makeDecisions', decisions, currentChoice); $emit('close');" 
                class="button-type-1"
                v-bind:class="{disabled: !this.currentChoice}"
            >
                {{ chooseDecisionButtonText }}
            </button>
        </div>
    </modal>
</template>
 
<script>

import BountyHunter from '@/components/ChampionBuilder/Potential/DecisionModalBody/BountyHunter'
import Skill from '@/components/shared/components/Skill.vue'
/* eslint-disable no-debugger */
/* eslint-disable vue/no-unused-components */


export default {
    name: 'DecisionModal',
    components: {
        BountyHunter,
        Skill
    },
    props: {
        champion: {
            required: true
        },
        database: {
            required: true
        },
        // "page === "roles" || page === "sources"
        page: {
            required: true
        },
        roleSourceData: {
            required: true
        },
        pendingModalChoice: {
            required: false
        },
        pendingAnimalName: {
            required: false
        }
    },
    created(){
        if (this.pendingModalChoice){
            this.currentChoice = this.pendingModalChoice
            this.makePendingDecision(this.currentChoice)
        }
    },
    computed: {
        decisionLabel(){
            return this.roleSourceData.title === "Bounty Hunter" ? "Specialization" 
            : this.roleSourceData.title === "Morph" ? "Beast Form"
            : this.roleSourceData.title === "Elementalist" ? "Primordial Core"
            : this.roleSourceData.title === "Demonic" ? "Demonic Origin"
            : ''
        },
        chooseDecisionButtonText(){
            return this.currentChoice ? 'Confirm ' + this.decisionLabel : 'Awaiting choice...'
        },
        shownSkills(){
            let currentChoice = this.roleSourceData.decisionTraits.filter(each=>each.decisionTrait === this.currentChoice)
            if (currentChoice[0] && typeof this.beastNameInput === 'string'){
                Object.assign(currentChoice[0], {beastName: this.beastNameInput})
            }
            return currentChoice
        }
    },
    data(){
        return {
            modal: false,
            decisions: false,
            currentChoice: false,
            beastNameInput: this.pendingAnimalName ? this.pendingAnimalName : ''
        }
    },
    methods: {
        // An array of ALL matching decisionTraits become this.decisions
        makePendingDecision(choice){
            this.decisions = this.roleSourceData.decisionTraits.filter(each=> each.decisionTrait === choice)
            this.currentChoice = choice
        },
        // From the input, add the beast name key/value to Morph decisions.
        addBeastNameToSkill(){
            if (this.beastNameInput){ 
                this.decisions[0].beastName = this.beastNameInput
            }
        }
    }
}
</script>
 
<style lang="scss" scoped>

.row {
    display: flex;
    justify-content: space-around;
    align-items: center;
}

.decision-trait-box {
    width: 50%;
    padding: 8px;
    margin: 2px;
    border-top: solid 1px black;
    border-right: solid 2px black;
    border-bottom: solid 2px black;
    border-left: solid 1px black;
    /* opacity: .4; */
    /* background-color: gray; */
}

.decision-trait-box.currentChoice {
    /* background-color: white; */
    border-top: solid 3px black;
    border-right: solid 2px black;
    border-bottom: solid 3px black;
    border-left: solid 1px black;
}

.disabled {
    opacity: .5;
    pointer-events: none;
}

</style>
 
 

