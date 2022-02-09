<template>
    <div class="intersection-modal">
      <modal
        @close="$emit('close')"
        v-model="modal"
        :modalType="modal"
        :modalData="`modal`"
        scrollable
      >
        <div slot="header">
          <h2>Rolling like a Boss</h2>
          <p class="subtext">Do an Action Roll!</p>
        </div>


        <div class="modal-body">
          <p>Oh cool, some dice</p>
        </div>

        <div slot="footer">
            <button @click.prevent="$emit('close')" class="button-type-2">Close</button>
        </div>

      </modal>
    </div>
</template>

<script>

import Modal from '@/components/shared/components/Modal'

export default {
  name: 'ActionRollModal',
  components: {
    Modal
  },
  props: {
    champion: {
      type: Object
    }
  },
  data () {
    return {
      modal: false
    }
  },
  methods: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>