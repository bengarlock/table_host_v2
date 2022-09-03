import {CHANGE_NAVBAR, CHANGE_SETTINGS_NAVBAR} from "./Types";

//CHANGE_NAVBAR
export const changeNavbar = (selection) => {
    return (dispatch) => {
        dispatch({
            type: CHANGE_NAVBAR,
            payload: selection
        })
    }
}

//CHANGE SETTINGS NAVBAR
export const changeSettingsNavbar = (selection) => {
    return (dispatch) => {
        dispatch({
            type: CHANGE_SETTINGS_NAVBAR,
            payload: selection
        })
    }

}