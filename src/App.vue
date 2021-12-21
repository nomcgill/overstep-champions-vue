<template>
  <div id="app">
    <NavBar />
    <ActionBar v-bind:header="header" />
    <Home v-bind:header="header" />
    <!-- <router-link to="/">Home</router-link> | -->
    <!-- <router-link to="/about">About</router-link> -->
  </div>
</template>

<script>

import ActionBar from './components/ActionBar/ActionBar.vue'
import Home from './components/Home/Home.vue'
import NavBar from './components/NavBar/NavBar.vue'

export default {
  name: 'App',
  components: {
    NavBar,
    ActionBar,
    Home
  },
  props: {
    header: {
      required: false
    }
  },
  created() {
    this.$bus.$on('close-drawer', () => { this.$emit('close') })
    this.$bus.$on('champion-skill-opened', () => { this.$emit('champion-skill-opened') })
  },
  beforeDestroy() {
    this.$bus.$off('close-drawer')
    this.$bus.$off('champion-skill-opened')
  }
}
</script>

<style>

@import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@200&display=swap');


#app {
  height: 100%;
  color: #2c3e50;
  font-family: 'Josefin Sans', sans-serif;  /* margin-top: 60px; */
}

.slide-fade-enter-active {
  transition: all .3s ease;
}
/* .slide-fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
} */
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}

</style>
