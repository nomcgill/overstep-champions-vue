<template>
    <!-- v-on:click="changeHeader" -->
    <!-- @click.prevent="actionBarClick('notepad')" -->
  <div id="action-bar" 
  > {{ header }}
    <!-- @click="changeHeader" -->
    <div id="character-route-pane">
      <character-bar 
        v-if="!this.champion && currentRoutePath.includes('/build/') || this.champion"
        :champion="this.champion" />
      <!-- <character-bar v-if="currentRoutePath.includes('/build/')" :champion="this.champion" /> -->
      <router-link class="action-router-button" to="/build/potential" v-if="!currentRoutePath.includes('/build/') && !this.champion">+ New Champion</router-link>
      <router-link class="action-router-button" to="/account/signin" v-if="!loggedIn">Log In</router-link>
      <router-link class="action-router-button" to="/account/manage" v-if="loggedIn">Profile</router-link>
    </div>
    <div id="editing-bar" v-if="currentRoutePath.includes('/build/')">
      - CHAMPION BUILDER - 
    </div>


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
import CharacterBar from '@/components/shared/components/CharacterBar'
// import NotepadModal from './NotepadModal.vue'

export default {
  name: 'ActionBar',
  components: {
    NotepadModal,
    CharacterBar
  },
  props: {
    champion: {
      required: false
    }
  },
  data(){
    return {
      modal: false,
      loggedIn: false,
      header: ''
    }
  },
  computed: {
    currentRouteName(){
      return this.$route.name
    },
    currentRoutePath(){
      return this.$route.path
    },
    currentName(){
      let name = "New Champion"
      if (this.champion.name){
        this.champion.name.length > 0 ? name = this.champion.name : false
      }
      return name
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
  color: white;
  /* height: 90px; */
  background-color: rgb(69, 69, 69);
  text-decoration: none;
}
#editing-bar {
  height: 20px;
  line-height: 22px;
  background-color: #65a779;
  text-align: center;
}
h2, #level-number {
  font-size: 1.7em;
}
#character-route-pane {
  display: grid;
  grid-template-columns: auto 100px;
}
.action-router-button {
  background-color: #65a779;
  padding: 7px 5px 5px;
  margin: 10px;
  border: 1px solid hsla(0,0%,100%,.308);
  border-radius: 4px;
  cursor: pointer;
  color: #fff;
  font-size: 1.4em;
  text-align: center;
  text-decoration: none;
}
/* 
#champion-title-box {
  margin-left: .7em;
  margin-top: .5em;
}

#level-box {
  margin-right: .7em;
  margin-top: .5em;
} */

</style>