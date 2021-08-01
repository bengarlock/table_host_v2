import { CHANGE_SLOT } from "./Types";

//CHANGE_SLOT
export const changeSlot = (selection) => {
    return (dispatch) => {
        dispatch({
            type: CHANGE_SLOT,
            payload: selection
        })
    }
}