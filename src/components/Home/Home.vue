<template>
  <div>
    <skill-list
      :champion="this.champion"
    />
  </div>
</template>

<script>

import SkillList from './SkillList.vue'
import sampleChampion from '@/assets/sampleStuff/championLucyfer.json'

export default {
  name: 'Home',
  components: { SkillList },
  data() {
    return {
      champion: sampleChampion
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
