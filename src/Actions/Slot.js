import {CHANGE_SLOT, GET_BOOK} from "./Types";

//CHANGE_SLOT
export const changeSlot = (slot) => {
    return (dispatch) => {
        dispatch({
            type: CHANGE_SLOT,
            payload: slot
        })
    }
}

//PATCH_SLOT
export const patchSlot = (slot) => {
    return async (dispatch) => {

        const response = await fetch("https://bengarlock.com/api/v1/tablehost/books/?date=" + String(slot.id))
        let updatedSlot = await response.json()

        dispatch({
            type: GET_BOOK,
            payload: updatedSlot
        })
    };
}

