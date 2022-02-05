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
        />



        </div>

        <div slot="footer">
            <button @click.prevent="$emit('close')" class="button-type-2">Cancel</button>
            <button id="decision-footer-button" v-if="roleSourceData.decisionOptions" @click.prevent="decisionModal = roleSourceData.title" class="button-type-1">
                <span v-if="!decisionHasBeenMade">Choose a<span v-if="choiceLabel === 'Origin'">n</span></span>
                {{ choiceLabel }}
                <span v-if="decisionHasBeenMade">: {{ shortLabel }}</span>
            </button>
            <button v-if="decisionHasBeenMade" @click.prevent="$emit('applyRoleSource', page, roleSourceData.title, newTraitSkills); $emit('close');" class="button-type-1" :class="{}">Confirm</button>
        </div>

      </modal>
    </div>
</template>



<script>
/* eslint-disable no-debugger */
/* eslint-disable vue/no-unused-components */


// import { bus } from '@/main'
import Modal from '@/components/shared/components/Modal.vue'
import DecisionModal from '@/components/ChampionBuilder/Potential/DecisionModalBody/DecisionModal'
// import DecisionTraits from '@/components/ChampionBuilder/Potential/DecisionTraits'
import BountyHunter from '@/components/ChampionBuilder/Potential/DecisionModalBody/BountyHunter'
// import Elementalist from '@/components/ChampionBuilder/Potential/DecisionModalBody/Elementalist'
// import Demonic from '@/components/ChampionBuilder/Potential/DecisionModalBody/Demonic'
// import Morph from '@/components/ChampionBuilder/Potential/DecisionModalBody/Morph'


export default {
    name: 'RoleSourceModal',
    components: {
        Modal,
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
        if (this.champion.decision){
            this.shortLabel = this.champion.decision
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
            return !(this.roleSourceData.decisionOptions && this.decisions.length < 1)
        },
        newTraitSkills(){
            return [...this.decisions,...this.inherentSkills]
        }

    },
    data(){
        return {
            modal: false,
            decisionModal: false,

            roleLayout: ['description', 'given', 'stories', 'playstyle'],
            sourceLayout: ['description', 'given', 'stories', 'sourceFeature', 'recovery'],

            decisions: [],
            inherentSkills: [],

            shortLabel: false
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
        makeDecisions(decisions, shortLabel){
            // Decisions being sent should be an ARRAY of NEW SKILLS. Associated roleSource decisions are REQUIRED to accompany the upcoming bus.
            this.decisions = decisions
            this.shortLabel = shortLabel
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