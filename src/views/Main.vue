<template>
  <div class="Main">
    <h1>HELLO</h1>
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <Main msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Main from '@/components/Main/Main.vue'

export default {
  name: 'Main',
  components: {
    Main
  }
}
</script>
