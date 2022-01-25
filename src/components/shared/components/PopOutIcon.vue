<template>
    <div id="popout-icon">
        <h2>?</h2>
    </div>
</template>

<script>
export default {
  name: 'PopOutIcon',
  props: {
      champion: {
          required: false
      }
  },
  data() {
      return {
      }
  },
  methods: {
      updateValue(){
          this.$emit('setNewValue', this.$el.value)
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

#popout-icon {
    /* float: right; */
    position: absolute;
    margin-top: 21px;
    right: 21px;
    /* top: 12px; */
    height: 50px;
    width: 48px;
    background-color: #9e8c3a;
    border-radius: 6px;
}

h2 {
    color: white;
    text-align: center;
    font-size: 2em;
    vertical-align: middle;
    line-height: 50px;
    padding-top: 4px;
    font-weight: 900;
}

</style>