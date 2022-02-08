<template>
    <div class="box">
        <div
            v-for="(decision, index) in roleSourceData.decisionTraits"
            :key="index"
            class="decision-trait-box"
        >
            <h3>{{ decision.name }}</h3>
            
        </div>
    </div>
</template>

<script>

export default {
    name: 'DecisionTraits',
    props: {
        champion: {
            required: true
        },
        roleSourceData: {
            required: true
        }
    },
    computed: {
        currentRoute(){
            return this.$route.name
        }
    },
    data() {
        return {
        }
    },
    methods: {
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.box {
    border: solid 1px green;
}

</style>