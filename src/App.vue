<template>
  <div id="app">
    <NavBar />
    <ActionBar />
    <Home />
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
