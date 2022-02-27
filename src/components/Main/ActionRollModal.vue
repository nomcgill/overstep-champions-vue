<template>
    <div id="action-roll-modal">
      <modal
        @close="$emit('close')"
        v-model="modal"
        :modalType="modal"
        :modalData="`modal`"
        fullscreen
        no-X
      >
        <div slot="header">
          <h2>Rolling like a Boss</h2>
          <p class="subtext">Do an Action Roll!</p>
        </div>


        <div class="modal-body">

         <roll-history 
          :mostRecentRolls="mostRecentRolls"
         />

          <div id="result-pane">
            <h4 class="bold">Result &#x2192; {{ resultWords.title }} </h4>
            <p>{{ resultWords.description }}</p>
          </div>

          <div id="rolling-pane" class="flex-row-around">

            <div class="flex-column-between">
              <div id="dice-pane" class="flex-row-between">
                <div 
                  class="dice-box flex-column-around"
                  v-for="(diceNumber, index) in shownDiceNumbers"
                  :class="{evenNumber:evenNumber(diceNumber)}"
                  :key="index"
                >
                  <img :src="dice" alt="dice icon" />
                  <p :class="{evenNumber:evenNumber(diceNumber), oddNumber:evenNumber(diceNumber) === false}">{{ diceNumber }}</p>
                </div>
              </div>
              <div 
                id="roll-button" 
                :class="{disabledButtons}"
                @click="rollTheDice"
              >
                Roll
              </div>
            </div>

            <div id="impact-roll-pane" class="flex-column-between align-center">
              <div 
                class="impact-button" 
                :class="{activeImpact: upperHand, disabledButtons}"
                @click="beginNewRoll(); upperHand = !upperHand" 
              >
                Upper Hand
              </div>
              <div id="strengthen-weaken-column">
                <div 
                  class="impact-button" 
                  :class="{activeImpact: strengthenWeakenLevel > 0, disabledButtons}"
                  @click="beginNewRoll(); strengthen(true)"
                >
                  Strengthen 
                  <br>{{ computedStrengthen }}
                </div>
                <div 
                  class="impact-button" 
                  :class="{activeImpact: strengthenWeakenLevel < 0, disabledButtons}"
                  @click="beginNewRoll(); strengthen(false)"
                >
                  Weaken 
                  <br>{{ computedWeaken }}
                </div>
              </div>
            </div>

          </div>

        </div>


        <div slot="footer">
          <!-- <p>Anything</p> -->
            <!-- <button @click.prevent="$emit('close')" class="button-type-2">Close</button> -->
            <info-icon />
        </div>

      </modal>
    </div>
</template>

<script>
/* eslint-disable */
import Dice from '@/assets/ImageStore/dice.png'
import RollHistory from './RollHistory.vue';

export default {
  name: 'ActionRollModal',
  components: {
    RollHistory
  },
  props: {
    database: {
      required: true
    },
    champion: {
      type: Object
    }
  },
  computed: {
    mostRecentRolls(){
      return this.champion.rollHistory.slice(0,3)
    },
    shownDiceNumbers(){
      return this.diceNumbers.length === 0 && !this.upperHand ? ['--']
      : this.diceNumbers.length === 0 && this.upperHand ? ['--', '--']
      : this.diceNumbers
    },
    computedStrengthen(){
      return this.strengthenWeakenLevel > 0 ? "x" + this.strengthenWeakenLevel : '--'
    },
    computedWeaken(){
      return this.strengthenWeakenLevel < 0 ? "x" + Math.abs(this.strengthenWeakenLevel) : '--'
    }
  },
  data () {
    return {
      modal: false,
      dice: Dice,
      upperHand: false,
      strengthenWeakenLevel: 0,
      diceNumbers: [],
      resultWords: this.database.actionSuccess[4],
      last: '',
      disabledButtons: false,
    }
  },
  methods: {
    beginNewRoll(){
      // TO-DO: Existing Roll becomes newest in Roll History
      this.diceNumbers = []
    },
    resetRollImpacts(){
      this.upperHand = false,
      this.strengthenWeakenLevel = 0
    },
    strengthen(upOrDown){
      if (upOrDown && this.strengthenWeakenLevel < 2){
        this.strengthenWeakenLevel = this.strengthenWeakenLevel + 1
      }
      if (!upOrDown && this.strengthenWeakenLevel > -2){
        this.strengthenWeakenLevel = this.strengthenWeakenLevel - 1
      }
    },
    rollTheDice(){
      const thisVue = this
      // Avoid repeat clicks by disabling the "Roll" from being clicked for 2 seconds.
      document.getElementById("roll-button").classList.add('disable-roll')
      this.disabledButtons = true
      setTimeout(function(){
        thisVue.disabledButtons = false
        thisVue.resetRollImpacts()
      },2000);

      // Gotta add new Date() to the roll when the rollbus is sent.
      // this.timeStamps = [...this.timeStamps, (new Date())]
      this.diceNumbers = this.upperHand ? [this.randomOneToTwenty(), this.randomOneToTwenty()] : [this.randomOneToTwenty()]

      // Figure out normal success, including which roll is better.

      // If two dice were rolled, organize them from best to worst.
      if (this.diceNumbers.length === 2){
        let evens = []
        let odds = []
        this.diceNumbers.forEach(each=> this.evenNumber(each) ? evens.push(each) : odds.push(each))
        //Highest to lowest
        evens = evens.sort((a, b) => b - a);
        // Lowest to highest
        odds = odds.sort((a, b) => a - b);
        this.diceNumbers = [...evens, ...odds]
      }

      let successNumber = this.diceNumbers[0]
      // actionSuccess.title
      // actionSuccess.description


      // CRITICAL SUCCESS is only on a nat20—we already have the result.
      if (successNumber === 20){
        this.resultWords = this.database.actionSuccess[0]
      }
      // Otherwise begin with the strengthen/weaken process.
      else {
        let initialIndex = false

        // SUCCESS
        if (successNumber === 18 || successNumber === 16 || successNumber === 14 || successNumber === 12 || successNumber === 10){
          initialIndex = 1
        }
        // MINOR SUCCESS
        if (successNumber === 8 || successNumber === 6 || successNumber === 4 || successNumber === 2){
          initialIndex = 2
        } 
        // SETBACK
        if (successNumber === 1 || successNumber === 3 || successNumber === 5 || successNumber === 7 || successNumber === 9
          || successNumber === 11 || successNumber === 13 || successNumber === 15 || successNumber === 17){
          initialIndex = 3
        }
        // CRITICAL SETBACK
        if (successNumber === 19){
          initialIndex = 4
        }

        let afterImpact = initialIndex - this.strengthenWeakenLevel
        let afterImpactBoundary = afterImpact > 4 ? 4
        : afterImpact < 1 ? 1
        : afterImpact

        this.resultWords = this.database.actionSuccess[afterImpactBoundary]
      }

      this.addRollToHistory()

      return
    },
    randomOneToTwenty(){
      // to generate a random rounded number between 1 to 20;
      return Math.floor(Math.random() * 20) + 1;    
    },
    // computeTimeDifference(rollTimeStamp){
    //   let truncatedDifference = this.refreshingNow - ~~(rollTimeStamp)
    //   return this.secondsToDhms(this.roundToNearestFive(truncatedDifference / 1000))
    // },
    roundToNearestFivethousand(x){
      return Math.ceil(x/5000)*5000;
    },
    evenNumber(number){
      return number % 2 == 0 ? true 
      : number % 2 == 1 ? false
      : undefined
    },
    addRollToHistory(){
      let historyObject = {
        diceNumbers: this.diceNumbers,
        upperHand: this.upperHand,
        strengthenWeakenLevel: this.strengthenWeakenLevel,
        resultWords: this.resultWords,
        timestamp: new Date()
      }

      this.$bus.$emit(this.$bus.ADD_ROLL_TO_HISTORY, historyObject)
    }
  }
}
</script>

<style>

#action-roll-modal .modal-container {
  width: calc(100vw - 16px);
  /* height: calc(100vh - 0px); */
  /* height: 100%; */
  height: calc(100vh - 22px);
  max-height: none;
}

#action-roll-modal .footer {
  /* height: 15px; */
  border: none;
}

#action-roll-modal .modal-container .footer {
  justify-content: flex-start;
}


</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

#action-roll-modal .overlay {
  z-index: 900;
}

.modal-body > * {
  margin-bottom: 20px;
  /* font-size: 14px; */
}

h3 {
  /* text-align: right; */
}

#roll-button {
  padding: 10px;
  font-size: 1.5em;
  border: solid 1px black;
  width: 130px;
  /* max-width: 200px; */
  /* align-content: center; */
  text-align: center;
  margin: 20px auto;
}

#roll-history-pane div {
    font-size: 14px;
}

.roll-history-row {
  margin-top: 8px;
  padding-left: 8px;
  border-left: solid 1px black;

}

/* #dice-pane {
  display: flex;
  justify-content: space-around;
  align-items: center;
} */

#impact-roll-pane {
  background-color: rgb(201, 201, 201);
  margin: 5px;
  /* border: solid 1px black; */
}

#strengthen-weaken-column {
  border-top: solid 1px black;
}

.dice-box {
  /* display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center; */
  /* height: 5px; */
}

.dice-box img {
  height: 70px;
}

.dice-box p {
  font-size: 2em;
  padding-right: 5px;
}

.dice-box p.evenNumber {
    color: green;
}

.dice-box p.oddNumber {
  color: red;
}

.impact-button {
  padding: 8px;
  width: 80px;
  margin: 8px;
  border: solid 1px black;
  border-top: none;
  border-left: none;
  background-color: gray;
  color: white;
}

.impact-button.activeImpact {
  background-color: white;
  color: black;
}

.disabledButtons {
  pointer-events: none;
  color: rgb(201, 201, 201) !important;
}

#roll-button.disabledButtons {
  /* background-color: rgb(225, 198, 198); */
  /* color: white; */
}

.dice-box:nth-child(2) img {
  height: 50px;
  transform: rotate(-20deg);
  font-weight: 900;
}

.dice-box:nth-child(2) p {
  font-size: 1.5em;
  opacity: .8;
  font-weight: 900;
}


</style>