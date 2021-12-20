<template>
    <!-- v-on:click="changeHeader" -->
  <div id="action-bar" 
    @click.prevent="actionBarClick('notepad')"
  > {{ header }}

      <notepad-modal 
        v-if="modal === `notepad`"
        @close="modal = false"
        v-model="modal"
        :modalData="`modal`"
      />
  
  </div>
</template>

<script>

import { bus } from '@/main'
import NotepadModal from '@/components/ActionBar/NotepadModal'
// import NotepadModal from './NotepadModal.vue'

export default {
  name: 'ActionBar',
  components: {
    NotepadModal
  },
  props: {
  },
  data(){
    return {
      modal: false,
      header: ''
    }
  },
  methods: {
    actionBarClick(type){
      this.modal = type
    },
    changeHeader (){
      this.header = "changed header";
      bus.$emit('changeIt', 'changed header');
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