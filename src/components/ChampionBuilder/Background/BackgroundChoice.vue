<template>

    <div class="background-choice" v-bind:class="{activeBackground: activeBackground, pendingBackground: pendingBackground}">
        {{ choice.title }}
    </div>
  
</template>

<script>

// import { bus } from '@/main'

export default {
  name: 'BackgroundChoice',
  props: {
    choice: {
        required: true,
        type: Object
    },
    champion: {
        required: true
    },
    database: {
        required: true
    },
    pendingBackground: {
        type: Boolean
    }
  },
  computed: {
    activeBackground(){
        if (this.champion.currentBackground){
            return this.champion.currentBackground.title === this.choice.title ? true : false
        }
        else {
            return false
        }
    }
  },
  data(){
    return {
        active: false
    }
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.activeBackground {
    background: #c5c5c5;
    color: white;
}

.background-choice.pendingBackground {
    background: #65a779;
    color: white;
}

.background-choice {
    /* display: grid;
    grid-template-columns: auto auto auto; */
}

</style>