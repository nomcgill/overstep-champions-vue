export default {
    install (Vue){
        const EventBus = new Vue()
        EventBus.CREATE_TOAST = 'CREATE_TOAST'
        EventBus.CLEAR_TOASTS = 'CLEAR_TOASTS'

    }
}