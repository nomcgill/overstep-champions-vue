<template>
  <div>
    {{ header }}
    <skill-list
      :champion="this.champion"
    />
  </div>
</template>

<script>

import { bus } from '@/main'

import SkillList from './SkillList.vue'
import sampleChampion from '@/assets/sampleStuff/championLucyfer.json'

export default {
  name: 'Home',
  components: { SkillList },
  props: {
  },
  data() {
    return {
      champion: sampleChampion,
      header: ''
    }
  },
  created (){
    bus.$on('changeIt', (data) => {
      this.header = data;
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
