<template>
    <div class="box">
        <p class="subtext">Choose a Bounty Hunter specialty.</p>
        <div v-for="(skill, index) in shownSkills" :key="index">
            <p>{{ skill.name }}</p>
            <p>{{ skill.impact }}</p>
        </div>
    </div>
</template>

<script>

export default {
    name: 'BountyHunter',
    props: {
        roleSourceData: {
            required: true
        },
        champion: {
            required: true
        }
    },
    computed: {

    },
    data() {
        return {
            choices: ["Melee", "Ranged"],
            currentChoice: "Melee"
        }
    },
    methods: {
        meleeSkills(){
            return this.roleSourceData.decisionTraits.filter(each=>each.bountyCategory === "Melee")
        },
        rangedSkills(){
            return this.roleSourceData.decisionTraits.filter(each=>each.bountyCategory === "Ranged")
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.box {
    margin: 15px;
    text-align: center;
}

.subtext {
    margin: 10px;
    font-weight: 900;
}


</style>