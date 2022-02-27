<template>
    <img class="info-icon" :src="infoIcon" alt="info icon"/>
</template>
 
<script>

import InfoIcon from '@/assets/foundation-icons/svgs/fi-info.svg'

export default {
    name: 'InfoIcon',
    props: {

    },
    data(){
        return {
            infoIcon: InfoIcon
        }
    }

}
</script>
 
<style lang="scss" scoped>

  .info-icon {
    height: 60px;
  }

  

</style>
 
 

