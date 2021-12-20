<template>
    <!-- v-on:click="changeHeader"
  <div id="action-bar" 
    @click.prevent="invokeModal('prevent')"
  > {{ header }} -->

      <modal
        @close="$emit('close')"
        v-model="modal"
        :modalType="modal"
        :modalData="`modal`"
      >
        <div slot="header">
          It's a Notepad pop-up.
        </div>
      </modal>
  
  <!-- </div> -->
</template>

<script>

// import { bus } from '@/main'
import Modal from '@/components/shared/components/Modal.vue'

export default {
  name: 'NotepadModal',
  components: {
    Modal
  },
  props: {
  },
  data(){
    return {
      modal: false
    //   header: ''
    }
  },
  methods: {
    // invokeModal(type){
    //   this.modal = type
    // },
    // changeHeader (){
    //   this.header = "changed header";
    //   bus.$emit('changeIt', 'changed header');
    // }
      }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* #action-bar {
    height: 90px;
    background-color: gray;
} */
</style>