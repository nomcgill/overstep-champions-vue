// Global component registration.
import Arrow from '@/components/shared/components/Arrow'
import CharacterBar from '@/components/shared/components/CharacterBar'
import InfoIcon from '@/components/shared/components/InfoIcon'
import Modal from '@/components/shared/components/Modal'
import OnClickOutside from '@/components/shared/components/OnClickOutside'
import PopOutIcon from '@/components/shared/components/PopOutIcon'
import Skill from '@/components/shared/components/Skill'
import SkillList from '@/components/shared/components/SkillList'
import Slider from '@/components/shared/components/Slider'
import Spinner from '@/components/shared/components/Spinner'
import TimeAgo from '@/components/shared/components/TimeAgo'

export default {
    install(Vue){
        Vue.component('arrow', Arrow)
        Vue.component('character-bar', CharacterBar)
        Vue.component('info-icon', InfoIcon)
        Vue.component('modal', Modal)
        Vue.component('on-click-outside', OnClickOutside)
        Vue.component('popout-icon', PopOutIcon)
        Vue.component('skill', Skill)
        Vue.component('skill-list', SkillList)
        Vue.component('slider', Slider)
        Vue.component('spinner', Spinner)
        Vue.component('time-ago', TimeAgo)
    }
}