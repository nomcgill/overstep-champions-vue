<template>
    <div id="background-page">
        <div class="builder-top-row" id="background-top-row">
            <div id="edit-name-row">
                <label for="champion-name"><div class="name-label">Name: </div>
                    <input 
                        name="champion-name" 
                        type="text" 
                        id="champion-name" 
                        v-model="name" 
                        @keyup="changingNameTitle"
                    />
                </label>
                <!-- <label for="champion-title"><div class="name-label">Title: </div>
                    <input 
                        name="champion-title" 
                        type="text" 
                        id="champion-title" 
                        v-model="title" 
                        @keyup="changingNameTitle"
                    />
                </label> -->

                <!-- <button>Edit Name</button>
                <button>Edit Title</button> -->
            </div>
        </div>
        <div id="champion-background" class="section">
            <h2>Background</h2>
            <p class="subtext">Backgrounds provide an additional Skill.</p>
            <!-- <div id="background-header-row"> -->
                <!-- <button v-else>Change <br>Background</button> -->
                <skill 
                    v-if="champion.currentBackground"
                    :champion="champion"
                    :skill="currentBackgroundSkill"
                />
            <!-- </div> -->
            <button class="button-type-1" id="choose-background-button" v-if="!champion.currentBackground" @click.prevent="backgroundModal = true">Choose a Background</button>
            <button class="button-type-1" id="choose-background-button" v-if="champion.currentBackground" @click.prevent="backgroundModal = true">Change Background</button>
        </div>

        <background-modal 
            v-if="backgroundModal"
            @close="backgroundModal = false"
            v-model="backgroundModal"
            :modalData="`modal`"
            :database="database"
            :champion="champion"
        />

        <div class="section">
            <button id="edit-exposition-button" class="button-type-1" @click.prevent="expositionModal = true">Edit</button>
            <h2>Exposition</h2>
            <p class="subtext">(non-technical notes)</p>
            <div class="exposition-section" v-if="champion.backgroundPast">
                <h3>Past</h3>
                <p>{{ champion.backgroundPast }}</p>
            </div>
            <div class="exposition-section" v-if="champion.backgroundPresent">
                <h3>Present</h3>
                <p>{{ champion.backgroundPresent }}</p>
            </div>
            <div class="exposition-section" v-if="champion.backgroundFuture">
                <h3>Future</h3>
                <p>{{ champion.backgroundFuture }}</p>
            </div>
        </div>

        <exposition-modal 
            v-if="expositionModal"
            @close="expositionModal = false"
            v-model="expositionModal"
            :modalData="`modal`"
            :database="database"
            :champion="champion"
        />

    </div>
</template>

<script>
/* eslint-disable no-debugger */

import Skill from '@/components/shared/components/Skill.vue'
import BackgroundModal from '@/components/ChampionBuilder/Background/BackgroundModal'
import ExpositionModal from '@/components/ChampionBuilder/Background/ExpositionModal'

export default {
    components: { 
        Skill,
        BackgroundModal,
        ExpositionModal
    },
    name: 'Background',
    props: {
        champion: {
            required: false
        },
        database: {
            required: true
        },
        background: {
            required: false
        }
    },
    data(){
        return {
            name: '',
            title: '',
            backgroundModal: false,
            expositionModal: false,
            currentBackground: false,
            // currentBackgroundSkill: false
        }
    },
    // watch: {
    //     background: function(newBackground){
    //         this.currentBackground = newBackground

    //         // Grab currentBackgroundSkill from currentSkills
    //         if (this.currentBackground){
    //             this.currentBackgroundSkill = this.champion.currentSkills.filter(each=>each.category === "Background")[0]
    //             // console.log('currentBackgroundSkill')
    //             // console.log(this.currentBackgroundSkill)
    //         }
    //     }
    //     // NEED TO TRY to GET and SET a computed for background because Watch is not getting. 
    // },
    computed: {
        currentBackgroundSkill(){
            if (this.champion.currentBackground){
                return this.calculateBackgroundSkill()
            }
            else {
                return false
            }
        },
        // background: function
        // currentBackgroundSkill(){
        //     if (this.champion.currentBackground){
        //         return this.champion.currentSkills.filter(each=>each.category === "Background")[0]
        //     }
        //     else {return false}
        // },
        currentRoute(){
            return this.$route.name
        }
    },
    created(){
        this.name = this.champion.name
        // if (this.champion.currentBackground){
        //     this.currentBackgroundSkill = this.calculateBackgroundSkill()
        // }
        // this.title = this.champion.title
    },
    methods: {
        changingNameTitle(){
            if (this.name !== this.champion.name){
                this.$bus.$emit(this.$bus.SET_CHAMPION_NAME, this.name.trim())
            }
            if (this.name !== this.champion.title){
                // this.$bus.$emit(this.$bus.SET_CHAMPION_TITLE, this.title.trim())
            }
        },
        calculateBackgroundSkill(){
            return this.champion.currentSkills.filter(each=>each.category === "Background")[0]            
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

#background-page {
    margin: 5px;
}

.section {
    padding: 2%
}
h2 {
    margin: 6px 0;
}

#background-top-row {
    /* width: 100%;
    display: grid;
    grid-template-columns: 75%; */
    margin: 12px 0;
    /* padding-top: 20px; */
}

#edit-name-row {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    flex-wrap: nowrap;
    width: 100%;
    white-space: nowrap;
    /* padding: 2%; */
}

#edit-name-row input {
    width: 70%;
    border: hidden;
    border-bottom: solid 1px black;
}

.name-label, label {
    margin: 5px;
}

label {
    display: flex;
    flex-direction: row;
}

label > * {
    /* display: inline-flex; */
}

.name-label {
    width: 57px;
    text-align: left;
    font-size: 20px;
    /* max-width: 53px; */
}

input {
    text-align: center;
}

#background-header-row {
    margin: 10px;
    display: grid;
    grid-template-columns: 90px auto;
    /* vertical-align: middle; */
    align-items: end;
}

#background-header-row button {
    font-size: 16px;
    padding: 4px;
}

.exposition-section > p {
    max-height: 3.4em;
    overflow: hidden;
    text-overflow: ellipsis;
    /* font-size: 1em; */
}

#choose-background-button {
    /* float: right; */
    /* margin-right: auto;
    margin-left: auto; */
    margin: 10px auto 5px;
    display: block;
    /* margin-bottom: 0; */
}

/* 
#edit-name-row button {
    width: 40%;
    margin: 5%;
    height: 100%;
    /* font-size: 1.1em; */
/* } */

#edit-exposition-button {
    float: right;
}

</style>