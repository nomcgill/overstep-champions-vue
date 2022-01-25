<template>
  <div id="missing-requirements-page">
    <h2>Missing Requirements!</h2>
    <p><span v-if="champion.name">{{ champion.name }}</span><span v-else>Your Champion</span> is 
    missing a few choices.
    </p>
    <ul>
        <li>But nothing comes to mind yet. No logic. None.</li>
    </ul>
  </div>
</template>

<script>

export default {
  name: 'MissingRequirements',
  components: {
  },
  props: {
    champion: {
      type: Object
    }
  },
  data () {
    return {
    }
  },
  methods: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>