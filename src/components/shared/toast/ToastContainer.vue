<template>
 <div class="toast-container">
   <transition-group name="toast-list" tag="span">
     <toast
       v-for="toast of toasts"
       :key="toast.id"
       :status="toast.status"
       :icon="toast.icon"
       :title="toast.title"
       :actions="toast.actions"
       :description="toast.description"
       @close="removeToast(toast)"
     />
   </transition-group>
 </div>
</template>
 
<script>
import Toast from '@/components/shared/toast/ToastContainerItem'
 
const MAX_ITEMS = 8
const DEFAULT_DURATION = 3000
 
export default {
 data () {
   return {
     nextToastId: 1,
     toasts: []
   }
 },
 watch: {
   '$route' () {
//    '$route' (to, from) {
     // Remove toasts on route change:
     //   - Only the ones that have no timeout
     //   - Not immediatly, just after DEFAULT_DURATION millisecons
     //
     const toastToBeDeleted = this.toasts
       .filter(toast => {
         const duration = toast.duration !== undefined
           ? toast.duration
           : (toast.status !== 'success' ? 0 : DEFAULT_DURATION)
         return duration === 0
       })
       .map(toast => toast.id)
 
     setTimeout(() => {
       this.toasts = this.toasts.filter(toast => !toastToBeDeleted.includes(toast.id))
     }, DEFAULT_DURATION)
   }
 },
 methods: {
   removeToast (toast) {
     const toastIndex = this.toasts.findIndex(t => t.id === toast.id)
     // Check if we found it, maybe the user closed it manually
     if (toastIndex !== -1) {
       this.toasts.splice(toastIndex, 1)
     }
   }
 },
 created () {
   const createToastListener = (toast) => {
     let toastWithId = { id: this.nextToastId++, ...toast }
 
     // Unshift + Pop => This is a queue of MAX_ITEMS elements
     this.toasts.unshift(toastWithId)
     while (this.toasts.length > MAX_ITEMS) {
       this.toasts.pop()
     }
 
     // Remove toast if duration unless duration is 0 or status in (error, warning)
     const duration = toast.duration !== undefined
       ? toast.duration
       : (toast.status !== 'success' ? 0 : DEFAULT_DURATION)
 
     if (duration > 0) {
       setTimeout(() => this.removeToast(toastWithId), duration)
     }
   }
 
   const clearToastsListener = () => {
     this.toasts = []
   }
 
   this.$bus.$on(this.$bus.CREATE_TOAST, createToastListener)
   this.$bus.$on(this.$bus.CLEAR_TOASTS, clearToastsListener)
 
   this.$once('hook:beforeDestroy', () => {
     this.$bus.$off(this.$bus.CREATE_TOAST, createToastListener)
     this.$bus.$off(this.$bus.CLEAR_TOASTS, clearToastsListener)
   })
 },
 components: {
   Toast
 }
}
</script>
 
<style lang="scss" scoped>
.toast-container {
 pointer-events: none;
 position: absolute;
 display: flex;
 direction: column;
 justify-content: flex-end;
 align-items: flex-end;
 right: 9px;
 top: 0;
 bottom: 0;
 padding: 10px;
 width: 350px;
 overflow: hidden;
 z-index: 9999;
 flex-wrap: wrap;
}
 
// List Transitions
.toast {
 transition: all .2s ease-out;
}
.toast-list-enter, .toast-list-leave-to {
 opacity: 0;
 transform: translateX(20px);
}
.toast-list-leave-active {
 position: absolute !important;
 right: 10px;
}
</style>