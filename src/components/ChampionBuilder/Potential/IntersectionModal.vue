<template>
    <div class="intersection-modal">
      <modal
        @close="$emit('close')"
        v-model="modal"
        :modalType="modal"
        :modalData="`modal`"
        scrollable
      >
        <div slot="header">
          <h2>{{ champion.intersection.title }} Path ({{ intersectionLevel }})</h2>
          <p class="subtext">Choose one {{ intersectionLevel }} Intersection skill.</p>
        </div>


        <div class="modal-body">
            <div
                v-for="(skill, key) in skills"
                :key="key"
            >
                <skill 
                    :skill="skill"
                    :index="key"
                    :champion="champion"
                    :dropdown="skill.opened"
                    :location="'Intersection Path'"
                    static
                />           
            </div>

        </div>

        <div slot="footer">
            <button @click.prevent="$emit('close')" class="button-type-2">Close</button>
        </div>

      </modal>
    </div>
</template>



<script>
/* eslint-disable no-debugger */
/* eslint-disable vue/no-unused-components */


// import { bus } from '@/main'
import Skill from '@/components/shared/components/Skill'

export default {
    name: 'IntersectionModal',
    components: {
        Skill
    },
    props: {
        champion: {
            required: true
        },
        database: {
            required: true
        },
        intersectionLevel: {
            required: true
        }
    },
    created(){
    },
    computed: {
        skills(){
            return this.champion.intersection.traits.filter(skill=> skill.skillLevel === this.intersectionLevel)
        },
    },
    data(){
        return {
            modal: false
        }
    },
    methods: {

    }
}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.intersection-modal {
    text-align: left;
}

h2 {
    font-size: 1.4em;
}

.modal-body {
    text-align: left;
}

.modal-body .section {
}

.disabled {
    opacity: .2;
    pointer-events: none;
}

</style>