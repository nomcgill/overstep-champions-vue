<template>
    <div>
        <div id="skill-list-header-row">
            <h1>Skills</h1>
            <router-link to="/build/skills">edit</router-link>
            <div class="section-tab-row">
                <div>Sort By:</div>
                <div class="section-tab" @click="changeTab('level')" v-bind:class="{ activeSorting: sortedBy === 'level' }">Level</div>
                <div class="section-tab" @click="changeTab('actionType')" v-bind:class="{ activeSorting: sortedBy === 'actionType' }">Action Type</div>
                <div class="section-tab" @click="changeTab('category')" v-bind:class="{ activeSorting: sortedBy === 'category' }">Category</div>
                <div class="section-tab" id="search-icon"> &#x1F50D;</div>
            </div>
        </div>

        <skill-list
            :champion="champion"
            :location="'Main'"
            :sortingBy="sortedBy"
        />
    </div>
</template>
 
<script>

import SkillList from '@/components/shared/components/SkillList'

export default {
    name: 'SkillsPage',
    components: {
        SkillList
    },
    props: {
        champion: {
            required: false
        }
    },
    data(){
        return {
            sortedBy: 'level'
        }
    },
    methods: {
        changeTab(input){
            this.sortedBy = input
        }
    }
}
</script>
 
<style lang="scss" scoped>

#skill-list-header-row {
  display: inline-block;
}
#skill-list-header-row h1, #skill-list-header-row a {
  display: unset;
}
.section-tab-row {
  display: inline-flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
}

.section-tab {
  margin: 5px;
  padding: 5px;
}

#search-icon {
    // padding-bottom: 10px;
}

.activeSorting {
    background-color: #65a779;
    color: white;
}

</style>