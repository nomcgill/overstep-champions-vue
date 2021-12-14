<template>
  <div>
      <p>
          {{ modalData }}
      </p>
  </div>
</template>

<script>
export default {
 name: 'Modal',
 props: {
   fullscreen: {
     type: Boolean,
     default: undefined
   },
   dropDown: {
     type: Boolean,
     default: false
   },
   scrollable: {
     type: Boolean,
     default: false
   },
   closeOnClickOutside: {
     type: Boolean,
     default: false
   },
   closeOnEscapeKey: {
     type: Boolean,
     default: false
   }
 },
 data () {
   return {
     showDropDown: false
   }
 },
 computed: {
   fullscreenIcon () {
     return this.fullscreen ? 'fullscreen_exit' : 'fullscreen'
   },
   fullscreenButtonVisible () {
     return this.$listeners.fullscreen && this.fullscreen !== undefined
   }
 },
 methods: {
   onKeyup (e) {
     if (this.closeOnEscapeKey && (e.key === 'Escape' || e.keyCode === 27)) {
       if (this.level === this.$globalModalData.level) {
         this.closeModal()
       }
     }
   },
   onOverlayClick (event) {
     if (this.closeOnClickOutside && event.target === this.$refs.overlay) {
       this.closeModal()
     }
   },
   closeModal () {
     this.$nextTick(() => {
       this.$emit('close')
     })
   },
   toggleDropDown () {
     this.showDropDown = !this.showDropDown
   },
   disableTabNavigationOutside () {
     // Save all input elements and it's current tabindex before setting to -1
     this.elementWithFocusDisabled = Array.from(document.querySelectorAll('input, button, textarea, a'))
       .map(element => {
         const tabindex = element.getAttribute('tabindex')
         element.setAttribute('tabindex', '-1')
         return { element, tabindex }
       })
   },
   restoreTabNavigationOutside () {
     // Restore all inputs elements' tabindex
     this.elementWithFocusDisabled.forEach(({ element, tabindex }) => {
       element.setAttribute('tabindex', tabindex)
     })
   }
 },
 created () {
   this.level = ++this.$globalModalData.level
   window.addEventListener('keyup', this.onKeyup)
   this.disableTabNavigationOutside()
   this.$bus.$emit('close-drawer')
 },
 beforeDestroy () {
   this.$globalModalData.level--
   window.removeEventListener('keyup', this.onKeyup)
   this.restoreTabNavigationOutside()
 }
}
</script>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

@media only screen and (min-width: 768px) {

}

</style>