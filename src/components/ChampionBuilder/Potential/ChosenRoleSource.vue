<template>
    <div id="chosen-role-source" class="section">
        <div id="icon-row">
            <div id="chosen-role">
                <h3>Role</h3>
                <h2>{{ champion.role }}</h2>
                <role-source-icon
                    :champion="champion"
                    :roleSource="champion.role"
                    :chosenPage="true"
                    :thumbnail="images[lowerCaseNoSpaces(champion.role)]"
                    :page="`roles`"
                    :possibleNarrow="false"
                />
                <button class="more-info">More Info</button>
                
            </div>
            <div id="chosen-source">
                <h3>Source</h3>
                <h2>{{ champion.source }}</h2>
                <role-source-icon
                    :champion="champion"
                    :roleSource="champion.source"
                    :chosenPage="true"
                    :thumbnail="images[lowerCaseNoSpaces(champion.source)]"
                    :page="`sources`"
                    :possibleNarrow="false"
                />
                <button class="more-info">More Info</button>
            </div>
        </div>
    <button @click="$emit('editingRoleSource', true)">Change Choices</button>
    </div>
</template>

<script>

import RoleSourceIcon from '@/components/ChampionBuilder/Potential/RoleSourceIcon'

export default {
    components: { 
        RoleSourceIcon
    },
    name: 'ChosenRoleSource',
    props: {
        champion: {
            required: false
        },
        images: {
            required: true
        }
    },
    data() {
        return {
        }
    },
    methods: {
        lowerCaseNoSpaces(string){
            return string.toLowerCase().replace(/\s/g, '')
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

#chosen-role-source {
    padding: 0px 0 10px;
    text-align: center;
}
#icon-row {
    align-items: stretch;
    display: flex;
    justify-content: space-around;
}

#icon-row > * {
    width: 50%;
    margin: 10px;
    border: solid 1px black;
    border-radius: 6px;
    padding: 5px 3px;
    /* display: flex;
    align-items: center; */
    white-space: nowrap;
}

#chosen-role-source .box {
    margin: 5px auto 0;
    /* border: solid 1px black; */
    border-radius: 6px;
    height: 4em;
    width: 5em;
    padding: 7px;
    display: flex;
    align-items: center;
    justify-content: center;
    
}

#chosen-role-source img {
    height: 5em;
}

.more-info {
    border: none;
    background-color: transparent;
    text-decoration: underline;
}

#icon-row h3 {
    text-decoration: underline;
}

</style>