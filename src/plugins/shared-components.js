import Spinner from '@/components/shared/components/Spinner'
import Modal from '@/components/shared/components/Modal'

export default {
    install(Vue){
        Vue.component('modal', Modal)
        Vue.component('spinner', Spinner)
    }
}