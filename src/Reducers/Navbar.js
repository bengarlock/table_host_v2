import { CHANGE_NAVBAR, CHANGE_SETTINGS_NAVBAR } from "../Actions/Types";

const initialState = {
    currentNavbar: '',
    currentSettingNavbar: '',
}

export default function navbar(state = initialState, action) {
    switch(action.type) {
        case CHANGE_NAVBAR:
            return {
                ...state,
                currentNavbar: action.payload,
            }

        case CHANGE_SETTINGS_NAVBAR:
            return {
                ...state,
                currentSettingNavbar: action.payload,
            }

        default:
            return state
    }
}