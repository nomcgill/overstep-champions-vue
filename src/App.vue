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
  },
  beforeDestroy() {
    this.$bus.$off('close-drawer')
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
</style>
