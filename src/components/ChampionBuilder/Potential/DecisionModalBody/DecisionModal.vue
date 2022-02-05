<template>
    <modal
        @close="$emit('close')"
        v-model="modal"
        :modalType="modal"
        :modalData="`modal`"
        scrollable
        id="role-source-modal"
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
            <bounty-hunter
                v-if="roleSourceData.title === 'Bounty Hunter'"
                :champion="champion"
                :roleSourceData="roleSourceData"
            />
        </div>

        <div slot="footer">
            <button @click.prevent="$emit('close')" class="button-type-2">Cancel</button>
            <button @click.prevent="$emit('makeDecisions', decisions, shortLabel); $emit('close');" class="button-type-1">Choose {{ champion.decision }} </button>
        </div>
    </modal>
</template>
 
<script>

import BountyHunter from '@/components/ChampionBuilder/Potential/DecisionModalBody/BountyHunter'


export default {
    name: 'DecisionModal',
    components: {
        BountyHunter
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
        }
    },
    created(){
        if (this.champion.decision){
            this.currentChoice = this.champion.decision 
        }
    },
    computed: {
        decisionLabel(){
            return this.roleSourceData.title === "Bounty Hunter" ? "Specialization" 
            : this.roleSourceData.title === "Morph" ? "Beast Form"
            : this.roleSourceData.title === "Elementalist" ? "Primordial Core"
            : this.roleSourceData.title === "Demonic" ? "Demonic Origin"
            : ''
        }
    },
    data(){
        return {
            modal: false,
            decisions: false,
            currentChoice: false,
            shortLabel: false
        }
    },
    methods: {
        makePendingDecision(choice){
            let pendingDecisions = []
            // if (roleSourceData.title === 'Bounty Hunter'){
                
            // }
            // if (roleSourceData.title === 'Demonic'){

            // }
            if (this.roleSourceData.title === 'Elementalist'){
                let skill = this.roleSourceData.decisionTraits.filter(each=>each.decisionTrait === choice)
                pendingDecisions = skill
            }
            // if (roleSourceData.title === 'Morph'){

            // }
            this.shortLabel = choice
            this.decisions = pendingDecisions
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

</style>
 
 

