<template>
  <div 
    class="box" 
    v-bind:class="{ 
        noborder: chosenPage, 
        selected: selectedOnChoosingPage && !priorOnChoosingPage, 
        prior:priorOnChoosingPage 
        }">
      <!-- <div>{{ roleSource }}</div> -->
      <img :src="thumbnail" v-bind:class="{ narrow: isNarrow }" />
  </div>
</template>

<script>

export default {
  name: 'RoleSourceIcon',
  props: {
      page: {
          required: true
      },
      champion: {
          required: false
      },
      roleSource: {
          required: true
      },
      thumbnail: {
          required: true
      },
      possibleNarrow: {
          default: true
      },
      chosenPage: {
          required: false
      },
      priorChoices: {
          required: false,
        //   type: Object
      }
  },
  computed: {
    isNarrow(){
        let keepNarrow = false
        if (this.roleSource === 'Shade' || this.roleSource === 'Demonic' || this.roleSource === 'Divine'){
            if (this.possibleNarrow){
                keepNarrow = true
            }
        }
        return keepNarrow
    },
    selectedOnChoosingPage(){
        let selected = false
        if (!this.chosenPage){
            if (this.roleSource === this.champion.role || this.roleSource === this.champion.source){
                selected = true
            }
        }
        return selected

    },
    priorOnChoosingPage(){
        let prior = false
        if (!this.chosenPage && this.priorChoices){
            if (this.priorChoices.includes(this.roleSource)){
                prior = true
            }
        }
        return prior
    }
  },
  data() {
    //   console.log(this.option)
      return {
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.box {
    border: solid 1px black;
    border-radius: 6px;
    height: 3.5em;
    width: 3.5em;
    padding: 5px;
    margin: 7px;
    background-color: rgb(240, 240, 240);
}

.box.selected {
    background-color: #65a779 !important;
}

.box.prior {
    background-color: gray;
}

.box.noborder {
    border: none;
    background-color: transparent;
}

img {
    height: 3.5em;

    /* Make it gray */
    -webkit-filter: grayscale(100%); /* Safari 6.0 - 9.0 */
    filter: brightness(0%);

}

.narrow {
    width: 3.5em;
}

</style>