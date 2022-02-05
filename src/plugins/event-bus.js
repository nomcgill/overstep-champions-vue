export default {
    // install (Vue, options) {
    install (Vue) {
    
        // Event constants
        const EventBus = new Vue()
        EventBus.REPLACE_CHAMPION = 'REPLACE_CHAMPION'
        EventBus.SET_CHAMPION_LEVEL = 'SET_CHAMPION_LEVEL'
        EventBus.SET_CHAMPION_ROLE = 'SET_CHAMPION_ROLE'
        EventBus.SET_CHAMPION_SOURCE = 'SET_CHAMPION_SOURCE'
        EventBus.CLEANSE_CATEGORY_SKILLS = 'CLEANSE_CATEGORY_SKILLS'
        EventBus.SET_CHAMPION_SKILLS = 'SET_CHAMPION_SKILLS'
        EventBus.SET_CHAMPION_NAME = 'SET_CHAMPION_NAME'
        EventBus.SET_CHAMPION_TITLE = 'SET_CHAMPION_TITLE'
        EventBus.SET_CHAMPION_BACKGROUND = 'SET_CHAMPION_BACKGROUND'
        EventBus.SET_CHAMPION_EXPOSITION = 'SET_CHAMPION_EXPOSITION'
        EventBus.SKILL_OPEN = 'SKILL_OPEN'
        EventBus.ALL_SKILL_OPEN = 'ALL_SKILL_OPEN'
        EventBus.TOGGLE_SKILL_CHOICE = 'TOGGLE_SKILL_CHOICE'
        EventBus.UPDATE_PROFICIENCIES = 'UPDATE_PROFICIENCIES'


        EventBus.CREATE_TOAST = 'CREATE_TOAST'
        EventBus.CLEAR_TOASTS = 'CLEAR_TOASTS'

        Vue.prototype.$bus = EventBus
    }
}