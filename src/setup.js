import Vue from 'vue'

// Vue plugins.
import EventBus from '@/plugins/event-bus'
import SharedComponents from '@/plugins/shared-components'
import ToastMaker from '@/plugins/toast-maker'

// Configure Vue plugins.
Vue.use(EventBus)
Vue.use(SharedComponents)
Vue.use(ToastMaker)


