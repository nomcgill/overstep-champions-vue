<template>
  <div>
    {{ header }}
    <skill-list
      :champion="this.champion"
      @allOpened="allOpened"
    />
  </div>
</template>

<script>
/* eslint-disable no-debugger */

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

    const skillOpenListener = skill => {this.editOpened(skill)}

    this.$bus.$on(this.$bus.SKILL_OPEN, skillOpenListener)

  },
  methods: {
    editOpened (payload){
      this.champion.currentSkills.forEach(championSkill => {
        if (championSkill === payload.skill){
          this.$set(championSkill,"opened",payload.opened)
        }
      })
    },
    allOpened(allOpened){
      this.champion.currentSkills.forEach(championSkill => {
        this.$set(championSkill,"opened",allOpened)
        // championSkill.opened = allOpened
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
