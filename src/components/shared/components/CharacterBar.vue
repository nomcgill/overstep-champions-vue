<template>
    <div id="character-box" >
        <router-link :class="{ disabled: currentRoutePath.includes('/build/background') }" to="/build/background">
            <div id="champion-title-box">
                <h2 id="champion-name-display" :class="{longName: currentName.length > 7}">{{ currentName }}</h2>
                <!-- <p v-if="champion.title">{{ champion.title }}</p> -->
            </div>
        </router-link>
        <router-link :class="{ disabled: currentRoutePath.includes('/build/potential') }" to="/build/potential">
            <div id="level-box" class="align-right">
                <p v-if="champion.level">level <span id="level-number">{{ champion.level }}</span></p>
                <p v-if="!champion.intersection">{{ barSource }} {{ champion.role }}</p>
                <p v-if="champion.intersection">{{ champion.intersection.title }}</p>
            </div>
        </router-link>
    </div>
</template>

<script>

import { bus } from '@/main'
// import NotepadModal from '@/components/ActionBar/NotepadModal'

export default {
  name: 'CharacterBar',
  components: {
    // NotepadModal
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
      header: '',
      windowWidth: false
    }
  },
  computed: {
    currentRoute(){
      return this.$route.name
    },
    currentRoutePath(){
      return this.$route.path
    },
    currentName(){
      let name = "Yet to be named..."
      if (this.champion.name){
        this.champion.name.length > 0 ? name = this.champion.name : false
      }
      return name
    },
    barSource(){
        let sourceLabel = 
            this.champion.source === 'Divine' ? 'Div' :
            this.champion.source === 'Demonic' ? 'Dmn' :
            this.champion.source === 'Chakrah' ? 'Chak' :
            this.champion.source === 'Nature' ? 'Nat' : ''
        return sourceLabel
    }
  },
  mounted() {
    window.addEventListener('resize', () => {
        this.windowWidth = window.innerWidth
    })
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

#character-box {
    display: grid;
    grid-template-columns: 60% 40%;
    padding: .5em .7em;
    /* color: white; */
    /* height: 90px; */
    background-color: rgb(69, 69, 69);
    /* text-decoration: none; */
}
#champion-title-box {
    /* height: 50%; */
}

#champion-name-display {
    font-size: 2em;
    line-height: 1.25em;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2; /* number of lines to show */
            line-clamp: 2; 
    -webkit-box-orient: vertical;
}

#champion-name-display.longName {
    font-size: 1.25em;
    line-height: 1em;
}

#character-box a {
    text-decoration: none;
    color: white;
}
#level-number {
  font-size: 1.5em;
}

#level-box {
    /* max-width: 100px; */
}

#level-box * {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}


</style>