export default {
    // install (Vue, options) {
    install (Vue) {
    
        // Event constants
        const EventBus = new Vue()
        EventBus.SKILL_OPEN = 'SKILL_OPEN'
        EventBus.CREATE_TOAST = 'CREATE_TOAST'
        EventBus.CLEAR_TOASTS = 'CLEAR_TOASTS'

        Vue.prototype.$bus = EventBus
    }
}