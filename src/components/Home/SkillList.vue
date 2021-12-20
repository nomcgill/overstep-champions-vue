<template>
  <div class="skill-list">
    <h1>Skillssss</h1>
    <Skill 
      v-for="(skill, index) in currentSkills"
      :skill="skill"
      :champion="champion"
      :key="index"
    />
  </div>
</template>

<script>

import Skill from '@/components/shared/components/Skill.vue'

export default {
  name: 'SkillList',
  components: {
    Skill
  },
  props: {
    champion: {
      type: Object
    }
  },
  data () {
    return {
      currentSkills: [...this.champion.currentSkills]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.skill-list {
  /* margin: 1em; */
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>