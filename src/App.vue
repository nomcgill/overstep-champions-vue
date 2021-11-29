<template>
  <div id="app">
    <ActionBar />
    <img alt="Vue logo" src="./assets/logo.png">
    <Home msg="Welcome to Overstep Champions"/>
    <!-- <router-link to="/">Home</router-link> | -->
    <!-- <router-link to="/about">About</router-link> -->
  </div>
</template>

<script>
import ActionBar from './components/ActionBar/ActionBar.vue'
import Home from './components/Home/Home.vue'



export default {
  name: 'App',
  components: {
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
