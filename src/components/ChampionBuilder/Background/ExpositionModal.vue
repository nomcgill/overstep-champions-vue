<template>

      <modal
        @close="$emit('close')"
        v-model="modal"
        :modalType="modal"
        :modalData="`modal`"
        scrollable
        fullscreen
      >
        <div slot="header">
          <h2>Exposition</h2>
          <p class="subtext">Write some optional background flavor for your Champion.</p>
        </div>

        <div>
          <h3>Past</h3>
          <p>such as family, birthplace, and tragedy.</p>
          <textarea v-model="championPast"/>
        </div>

        <div>
          <h3>Present</h3>
          <p>such as looks and personality.</p>
          <textarea v-model="championPresent"/>
        </div>

        <div>
          <h3>Future</h3>
          <p>such as ambitions and vendettas.</p>
          <textarea v-model="championFuture"/>
        </div>

        <div slot="footer">
            <button @click.prevent="$emit('close')" class="button-type-1">Done</button>
        </div>

      </modal>
  
</template>

<script>

// import { bus } from '@/main'

export default {
  name: 'ExpositionModal',
  props: {
    champion: {
      required: true
    },
    database: {
      required: true
    }
  },
  data(){
    return {
      championPast: '',
      championPresent: '',
      championFuture: '',
      modal: false
    }
  },
  created(){
    this.championPast = this.champion.backgroundPast
    this.championPresent = this.champion.backgroundPresent
    this.championFuture = this.champion.backgroundFuture
  },
  watch: {
    championPast: function (newPast) {
      this.updateExposition("backgroundPast", newPast)
    },
    championPresent: function (newPresent) {
      this.updateExposition("backgroundPresent", newPresent)
    },
    championFuture: function (newFuture) {
      this.updateExposition("backgroundFuture", newFuture)
    },
  },
  methods: {
    updateExposition(whichTime, data){
      this.$bus.$emit(this.$bus.SET_CHAMPION_EXPOSITION, whichTime, data)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>