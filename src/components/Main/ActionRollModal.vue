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

          <div id="roll-history-pane">
            <h3>Roll History</h3>
            <div class="roll-history-row">
                <p><span class="bold">Critical Success</span>, 1 hr ago</p>
                <p>7 and 19 | Upper Hand | Strengthen x 2</p>
            </div>
            <div class="roll-history-row">
                <p><span class="bold">Critical Success</span>, 22 min ago</p>
                <p>7 and 19 | Upper Hand | Strengthen x 2</p>
            </div>
            <div class="roll-history-row">
                <p><span class="bold">Critical Success</span>, &#60; 1 min ago</p>
                <p>7 and 19 | Upper Hand | Strengthen x 2</p>
            </div>
          </div>

          <div id="rolling-pane" class="flex-row-around">

            <div class="flex-column-around">
              <div id="dice-pane" class="flex-row-between">
                <div class="dice-box flex-column-around">
                  <img :src="dice" alt="dice icon" />
                  <p>20</p>
                </div>
                <div class="dice-box flex-column-around">
                  <img :src="dice" alt="dice icon" />
                  <p>20</p>
                </div>
              </div>
              <div id="roll-button">Roll</div>
            </div>

            <div id="impact-roll-pane" class="flex-column-around align-center">
              <div class="impact-button">Upper Hand</div>
              <div id="strengthen-weaken-column">
                <div class="impact-button">Strengthen <br>x 1</div>
                <!-- <div>Strengthen x 1</div> -->
                <div class="impact-button">Weaken <br>--</div>
              </div>
            </div>

          </div>

          <div id="result-pane">
            <h4 class="bold">Result -> Critical Setback</h4>
            <p>Don't do what you want and pay a large price.</p>
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

import Dice from '@/assets/ImageStore/dice.png'


export default {
  name: 'ActionRollModal',
  props: {
    champion: {
      type: Object
    }
  },
  data () {
    return {
      modal: false,
      dice: Dice
    }
  },
  methods: {

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
  height: 26px;
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
}

h3 {
  /* text-align: right; */
}

#roll-button {
  padding: 10px;
  font-size: 1.5em;
  border: solid 1px black;
  width: 50%;
  /* max-width: 200px; */
  /* align-content: center; */
  text-align: center;
  margin: 20px auto;
}

#roll-history-pane {
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

.dice-box {
  /* display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center; */
  /* height: 5px; */
}

.dice-box img {
  height: 80px;
}

.dice-box p {
  font-size: 2em;
  padding-right: 5px;
}

.impact-button {
  padding: 8px;
  width: 80px;
  margin: 8px;
  border: solid 1px black;
  border-top: none;
  border-left: none;
}

</style>