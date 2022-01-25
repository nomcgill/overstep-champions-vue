<template>
  <nav>
      <router-link to="/"><h1>OVERSTEP</h1></router-link>
      <div id="nav-right">
        <router-link to="/" @click.native="callChampion(lucyfer)"><p>Lucyfer</p></router-link>
        <router-link to="/" @click.native="callChampion(false)"><p>Clear</p></router-link>
      </div>
  </nav>
</template>

<script>

// import sampleChampion from '@/assets/sampleData/sampleChampion.json'

export default {
  name: 'NavBar',
//   components: { SkillList },
  props: {
    champion: {
      required: false
    },
    lucyfer: {
      required: false,
    }
  },
  data() {
    return {
    }
  },
  methods: {
    callChampion(newChampion){
      this.$bus.$emit(this.$bus.REPLACE_CHAMPION, newChampion)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

    nav {
        height: 2.4em;
        background-color: black;
        color: white;
        align-items: center;
        display: flex;
        justify-content: space-between;
    }
    #nav-right {
      /* margin-right: 3%; */
      display: flex;
      /* justify-content: space-between; */
      /* justify-content: flex-end; */
    }
    #nav-right * {
      padding: 5px;
    }

    h1 {
        font-size: 2em;
        /* font-weight: 900; */
        margin: 0;
        padding: .2em;
        color: white;
    }

    a {
      text-decoration: none;
      color: white;
    }

</style>
