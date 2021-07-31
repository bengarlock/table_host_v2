import {CHANGE_NAVBAR} from "./Types";

//CHANGE_NAVBAR
export const changeNavbar = (selection) => {
    return (dispatch) => {
        dispatch({
            type: CHANGE_NAVBAR,
            payload: selection
        })
    }
}