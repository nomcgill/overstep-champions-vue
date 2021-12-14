<template>
 <div
   class="toast"
   :title="`${title}\n${description}`"
 >
   <div class="toast--status" :class="status">
     <i class="esp-icons">{{ computedIcon }}</i>
   </div>
   <div class="toast--info">
     <div class="title">
       {{ title }}
     </div>
     <div class="description" v-html="description">
     </div>
     <div class="actions" v-if="actions">
       <div
         class="action"
         v-for="action of actions"
         :key="action.label"
         @click.stop="action.action()">
         {{ action.label }}
       </div>
     </div>
   </div>
   <div class="toast--close" @click.stop="$emit('close')">
     <i class="esp-icons">close</i>
   </div>
 </div>
</template>
<script>
export default {
 props: {
   status: {
     type: String,
     default: 'info'
   },
   icon: {
     type: String,
     required: false
   },
   title: {
     type: String,
     required: true
   },
   description: {
     type: String,
     required: true
   },
   actions: {
     type: Array,
     required: false
   }
 },
 computed: {
   computedIcon () {
     if (this.icon) {
       return this.icon
     } else {
       return {
         success: 'esp_success',
         error: 'esp_error',
         warning: 'esp_error'
       }[this.status] || 'esp_info'
     }
   }
 }
}
</script>
<style lang="scss" scoped>
 
.toast {
 pointer-events: auto;
 display: flex;
 flex-direction: row;
 align-items: center;
 box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
 border-radius: 2px;
 position: relative;
 background-color: white;
 margin-bottom: 12px;
 color: $gray-23;
 cursor: default;
 width: 340px;
 
 .description {
   max-height: 250px;
   overflow-y: auto;
 }
 
 &--status {
   background-color: $Redesign-Blue;
   color: white;
   display: flex;
   justify-content: center;
   align-items: center;
   font-size: 16px;
   padding: 0 7px;
   border-radius: 2px 0 0 2px;
   align-self: stretch;
 
   i {
     width: 16px;
   }
 
   &.warning { background-color: $warning-orange; }
   &.error { background-color: $error-red; }
   &.success { background-color: $success-green; }
 }
 
 &--info {
   padding: 7px 7px;
   font-size: 12px;
   flex: 1;
   min-width: 0;
 
   .title {
     font-size: 14px;
     font-weight: 600 !important;
     white-space: nowrap;
     overflow: hidden;
     text-overflow: ellipsis;
   }
 
   .actions {
     display: flex;
     margin-top: 4px;
 
     .action {
       & + .action {
         margin-left: 10px;
       }
       color: $Redesign-Blue;
       font-size: 13px;
       font-weight: 600;
       text-transform: uppercase;
       cursor: pointer;
     }
   }
 }
 
 &--close {
   position: relative;
   top: 2px;
   padding: 10px;
   color: $gray-48;
   font-size: 22px;
   cursor: pointer;
 }
}
</style>
 
 

