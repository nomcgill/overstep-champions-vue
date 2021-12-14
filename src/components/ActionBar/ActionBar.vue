<template>
  <div id="action-bar" @click.prevent="invokeModal('prevent')">
      <modal 
        v-if="modal"
        v-model="modal"
        :modalType="modal"
        :modalData="`modal`"
      />
  </div>
</template>


<script>

import Modal from '@/components/shared/components/Modal.vue'

export default {
  name: 'ActionBar',
  components: {
    Modal
  },
  props: {
  },
  data(){
    return {
      modal: false
    }
  },
  methods: {
    invokeModal(type){
      this.modal = type
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#action-bar {
    height: 90px;
    background-color: gray;
}
</style>