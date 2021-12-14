<script>
export default {
 props: {
   do: {
     type: Function,
     required: true
   },
   capture: {
     type: Boolean,
     default: false
   },
   ignoredTargetIds: {
     type: Array,
     default: () => []
   },
   ignoredTargetClasses: {
     type: Array,
     default: () => []
   }
 },
 mounted() {
   const listener = event => {
     if (event.target === this.$el || this.$el.contains(event.target)) {
       return
     }
 
     if (this.ignoredTargetIds.length > 0 || this.ignoredTargetClasses.length > 0) {
       let targetFound = false
       event.path.forEach(entry => {
         let theId = entry.id
         let theClassList = entry.classList ? entry.classList.value ? entry.classList.value : undefined : undefined
         if (theId !== undefined && this.ignoredTargetIds.some(v => theId.includes(v))) {
           targetFound = true
           return false
           // Array required to ignore classes of external tools like Jodit editor
         } else if (theClassList !== undefined && this.ignoredTargetClasses.some(v => theClassList.includes(v))) {
           targetFound = true
           return false
         }
       })
 
       if (targetFound) {
         return
       }
     }
     this.do()
   }
 
   // Add the listener asynchronously. Sometimes it takes the last click performed
   // set useCapture to true to close open menus when another is clicked
   setTimeout(() => {
     document.addEventListener('click', listener, this.capture)
   }, 0)
 
   this.$once('hook:beforeDestroy', () => {
     document.removeEventListener('click', listener)
   })
 },
 render() {
   return this.$slots.default ? this.$slots.default[0] : null
 }
}
</script>
 
 

