export default {
    // install (Vue, options) {
    install (Vue) {
    
        // Event constants
        const EventBus = new Vue()
        EventBus.CREATE_TOAST = 'CREATE_TOAST'
        EventBus.CLEAR_TOASTS = 'CLEAR_TOASTS'

        Vue.prototype.$bus = EventBus
    }
}