<template>
    <input 
        @change="updateValue" 
        type="range" 
        min="1" 
        max="100" 
        value="50" 
        class="slider" 
        id=""
    >
</template>

<script>
export default {
  name: 'Slider',
  props: {
      champion: {
          required: false
      },
      id: {
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

.slider {
    -webkit-appearance: none;
    width: 70%;
    height: 15px;
    border-radius: 5px;  
    background: #d3d3d3;
    outline: none;
    opacity: 0.7;
    -webkit-transition: .2s;
    transition: opacity .2s;
}

.slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 25px;
    height: 25px;
    border-radius: 50%; 
    background: #04AA6D;
    cursor: pointer;
}

.slider::-moz-range-thumb {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background: #04AA6D;
    cursor: pointer;
}

</style>